import * as esbuild from 'esbuild'
import chokidar from 'chokidar'
import fs from 'fs-extra'
import { promisify } from 'util'
import { exec } from 'child_process'

const asyncExec = promisify(exec)

const log = {
  tokens: new Map(),
  start: token => {
    log.tokens.set(token, Date.now())
  },
  end: token => {
    const startTime = log.tokens.get(token)
    log.tokens.delete(token)
    const duration = Date.now() - startTime
    console.log(`${token}: ${duration}ms`)
  },
  watch: async (token, callback) => {
    log.start(token)
    await callback()
    log.end(token)
  },
}

const build = async () => {
  if (await fs.pathExists('lib')) {
    await fs.rm('lib', { recursive: true })
  }

  await log.watch('esbuild', async () => {
    const rslt = await esbuild.build({
      entryPoints: ['src/index.ts'],
      outdir: 'lib',
      bundle: true,
      sourcemap: true,
      minify: true,
      splitting: true,
      format: 'esm',
      target: ['esnext'],
    })
  })

  await log.watch('tsc', async () => {
    try {
      const { stderr } = await asyncExec('npx tsc --declaration  --emitDeclarationOnly --outDir lib-types')
      if (stderr) {
        console.error(stderr)
      }
    } catch (error) {
      console.error(error)
    }
  })
}

chokidar.watch('src').on('change', async () => {
  await build()
})

build()