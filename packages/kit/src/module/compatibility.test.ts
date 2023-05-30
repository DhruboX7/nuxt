import { describe, expect, it } from 'vitest'
import { loadNuxt } from '../loader/nuxt'
import { hasNuxtModule, hasNuxtModuleCompatibility } from './compatibility'
import { defineNuxtModule } from './define'

describe('nuxt module compatibility', () => {
  it('check module installed', async () => {
    const nuxt = await loadNuxt({
      overrides: {
        modules: [
          defineNuxtModule({
            meta: {
              name: 'nuxt-module-foo'
            }
          }),
        ]
      }
    })
    expect(hasNuxtModule('nuxt-module-foo', nuxt)).toStrictEqual(true)
    await nuxt.close()
  })
  it('detects module instance versions', async () => {
    const nuxt = await loadNuxt({})
    const module = defineNuxtModule({
      meta: {
        name: 'nuxt-module-foo',
        version: '1.0.0'
      }
    })
    expect(await hasNuxtModuleCompatibility(module, '^1.0.0', nuxt)).toStrictEqual(true)
    expect(await hasNuxtModuleCompatibility(module, '^2.0.0', nuxt)).toStrictEqual(false)
    await nuxt.close()
  })
})
