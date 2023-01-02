#!/usr/bin/env node

import chokidar from 'chokidar'
import { build } from './build.mjs'

chokidar.watch('src').on('change', async () => {
  await build()
})

build()
