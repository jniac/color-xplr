#!/usr/bin/env node

import os from 'os'
import fs from 'fs-extra'
import path from 'path'
import * as esbuild from 'esbuild'
import { task, asyncExec, changeMainEntryPointFilePath, restoreMainEntryPointFilePath } from './utils.mjs'

export const build = async () => {
  // Compute tmp dir
  const tmp = os.tmpdir()
  const now = Date.now()
  const tmpTscDir = path.join(tmp, `tmp-${now}`)
  const tmpLibDir = path.join(tmp, `lib-${now}`)

  await task.run('esbuild', async () => {
    await esbuild.build({
      entryPoints: ['src/index.ts'],
      outdir: tmpLibDir,
      bundle: true,
      sourcemap: true,
      minify: true,
      splitting: true,
      format: 'esm',
      target: ['ES2022'],
    })
  })

  await task.run('tsc', async () => {
    try {
      const { stderr } = await asyncExec(`npx tsc --declaration  --emitDeclarationOnly --outDir ${tmpTscDir}`)
      if (stderr) {
        console.error(stderr)
      }
    } catch (error) {
      console.error(error)
    }
  })

  // Change the main entry point with the path above (tmp).
  await changeMainEntryPointFilePath(tmpTscDir)

  await task.run('api-extractor', async () => {
    try {
      const { stderr } = await asyncExec('npx api-extractor run --local')
      if (stderr) {
        console.error(stderr)
      }
    } catch (error) {
      console.error(error)
    }
  })

  // Restore the previous value.
  await restoreMainEntryPointFilePath()

  // Replace lib
  if (await fs.pathExists('lib')) {
    await fs.rm('lib', { recursive: true })
  }
  await fs.move(tmpLibDir, 'lib')

  await fs.move('dist/color-xplr.d.ts', 'lib/index.d.ts')
  await fs.rm(tmpTscDir, { recursive: true })
  await fs.rm('dist', { recursive: true })
}

const isMainModule = import.meta.url.endsWith(process.argv[1])
if (isMainModule) {
  build()
}
