import { resolve } from 'node:path'
import process from 'node:process'
import { build } from 'tsup'
import type { Options } from 'tsup'
import { dependencies } from '../package.json'

const ExternalModules = Object.keys(dependencies)
const argv = process.argv.slice(2)
const enableWatch = argv.includes('--watch')

const baseOptions = {
  dts: true,
  format: ['cjs', 'esm'],
  esbuildOptions(options) {
    if (options.format === 'esm')
      options.outExtension = { '.js': '.mjs' }
    else if (options.format === 'iife')
      options.outExtension = { '.js': '.js' }
  },
  watch: enableWatch,
  splitting: false,
  clean: false,
  minify: true,
  external: ExternalModules,
} satisfies Options

async function buildBundle() {
  build({
    entry: [resolve('./electron/server/user-app.ts')],
    ...baseOptions,
    format: ['cjs', 'esm', 'iife'],
    clean: false,
  })
}

buildBundle()
