#!/usr/bin/env node

import os from 'os'
import fs from 'fs-extra'
import path from 'path'
import * as esbuild from 'esbuild'
import {
  task,
  asyncExec,
  changeMainEntryPointFilePath,
  restoreMainEntryPointFilePath,
} from './utils.mjs'

export const build = async () => {
  // Compute tmp dir
  const tmp = os.tmpdir()
  const now = Date.now()
  const tmpRootDir = path.join(tmp, `color-xplr-${now}`)
  const tmpTscDir = path.join(tmpRootDir, 'tsc')
  const tmpLibDir = path.join(tmpRootDir, 'lib')

  try {

    // module
    await task.run('esbuild (module)', () => {
      esbuild.build({
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

    // commonjs
    await task.run('esbuild (node)', () => {
      esbuild.build({
        entryPoints: ['src/index.ts'],
        outdir: path.join(tmpLibDir, 'node'),
        bundle: true,
        sourcemap: true,
        minify: true,
        format: 'cjs',
        target: ['es6'],
      })
    })

    // typescript declaration
    const tscOK = await task.run('tsc', async () => {
      const { stderr } = await asyncExec(
        `npx tsc --declaration  --emitDeclarationOnly --outDir ${tmpTscDir}`
      )
      if (stderr) {
        console.error(stderr)
        return false
      } else {
        return true
      }
    })
    if (tscOK === false) {
      return
    }

    // Change the main entry point with the path above (tmp).
    await changeMainEntryPointFilePath(tmpTscDir)

    // bundle declaration
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
    await fs.rm('dist', { recursive: true })
    
  } catch (error) {

    console.log('Oops...')
    // Let's throw the error...
    throw error

  } finally {

    // ...What's matter here is to remove the temporary files:
    await fs.rm(tmpRootDir, { recursive: true })
  }
}

const isMainModule = import.meta.url.endsWith(process.argv[1])
if (isMainModule) {
  build()
}
