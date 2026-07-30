/**
 * Stub for #internal/nuxt/paths so Node can resolve it when the Nitro server
 * bundle still references this internal alias at runtime.
 */
import { join } from 'node:path'

const _rootDir = process.cwd()

export const rootDir = _rootDir
export const srcDir = join(_rootDir, 'src')
export const buildDir = join(_rootDir, '.nuxt')
export const nuxtDir = join(_rootDir, '.nuxt')
export const cwd = _rootDir

export default { rootDir, srcDir, buildDir, nuxtDir, cwd }
