#!/usr/bin/env node

import * as esbuild from 'esbuild'
import fs from 'fs-extra'
import { task, asyncExec, changeMainEntryPointFilePath } from './utils.mjs'

export const build = async () => {
  // Compute tmp dir
  const now = Date.now()
  const tmp = `tmp-${now}`
  const lib = `lib-${now}`

  await task.run('esbuild', async () => {
    await esbuild.build({
      entryPoints: ['src/index.ts'],
      outdir: lib,
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
      const { stderr } = await asyncExec(`npx tsc --declaration  --emitDeclarationOnly --outDir ${tmp}`)
      if (stderr) {
        console.error(stderr)
      }
    } catch (error) {
      console.error(error)
    }
  })

  // Change the main entry point with the path above (tmp).
  await changeMainEntryPointFilePath(tmp)

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
  await changeMainEntryPointFilePath('tmp')

  // Replace lib
  if (await fs.pathExists('lib')) {
    await fs.rm('lib', { recursive: true })
  }
  await fs.move(lib, 'lib')

  await fs.move('dist/color-xplr.d.ts', 'lib/index.d.ts')
  await fs.rm(tmp, { recursive: true })
  await fs.rm('dist', { recursive: true })
}

const isMainModule = import.meta.url.endsWith(process.argv[1])
if (isMainModule) {
  build()
}
