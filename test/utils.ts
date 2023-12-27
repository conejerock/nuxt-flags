import {fileURLToPath} from 'node:url'
import {setup, type TestOptions} from '@nuxt/test-utils'
import type {NuxtConfig} from '@nuxt/schema'
import type {OptionsModuleFlags} from '../src/options'

export const r = (s = '', fixture = 'basic') => fileURLToPath(new URL(`./fixtures/app/${fixture}/` + s, import.meta.url))

export const setupNuxtFlags = (
    flags: Partial<OptionsModuleFlags> = {},
    nuxtConfig: NuxtConfig = {},
    testOptions: Partial<TestOptions> = {},
    fixture = ''
) => {
    return setup({
        rootDir: fixture || r(),
        server: true,
        browser: false,
        nuxtConfig: {
            ...nuxtConfig,
            flags
        },
        ...testOptions,
    })
}
