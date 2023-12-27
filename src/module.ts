//@ts-ignore
import {version} from '../package.json'

import {initialize} from "unleash-client";
import {
    addImports,
    addPlugin,
    addTemplate,
    createResolver,
    defineNuxtModule,
    extendPages
} from '@nuxt/kit'
import logger from './logger'
import type {FeatureInterface} from "./types";
import {validateOptions} from "./validator";
import {printableFeatures} from "./printable";
import {defaultOptions, OptionsModuleFlags} from "./options";
import defu from "defu";
import {NuxtPage} from "@nuxt/schema";

export default defineNuxtModule<OptionsModuleFlags>({
    meta: {
        name: 'nuxt-flags',
        configKey: 'flags'
    },
    async setup(options, nuxt) {
        // @ts-ignore
        const resolver = createResolver(import.meta.url)
        let features: FeatureInterface[] = [];
        const configFlags = defu({appName: options.environment}, options, defaultOptions) as OptionsModuleFlags;
        validateOptions(configFlags);
        // @ts-ignore
        const unleash = initialize(configFlags);
        try {
            await unleash.start();
            features = unleash.getFeatureToggleDefinitions();
        } catch (e) {
            features = []
            await unleash.destroyWithFlush()
        }
        addTemplate({
            filename: './runtime/featureFlags.mjs',
            getContents: () => 'export default ' + JSON.stringify(features)
        })
        addImports({
            name: 'useNuxtFlags',
            as: 'useNuxtFlags',
            from: resolver.resolve('runtime/composables/useNuxtFlags')
        })
        addPlugin(resolver.resolve('./runtime/plugin'))
        nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || {}
        nuxt.options.runtimeConfig.private = nuxt.options.runtimeConfig.private || {}
        // @ts-ignore
        nuxt.options.runtimeConfig.private.flags = {ipHeader: configFlags.ipHeader}

        nuxt.hook('ready', () => {
            logger.box({
                title: ` \`Nuxt Flags v${version}\` `,
                message: printableFeatures(features, configFlags),
                style: {
                    padding: 2,
                    borderColor: "green",
                    borderStyle: "rounded",
                },
            });
        })

        // @ts-ignore
        nuxt.hook('devtools:customTabs', async (tabs) => {
            extendPages((pages: NuxtPage[]) => {
                pages.push({
                    name: `devtoolsFeatureFlags`,
                    path: '/_feature_flags',
                    file: resolver.resolve(__dirname, './runtime/DevToolsViewer.vue')
                })
            })

            tabs.push({
                title: `Nuxt Flags`,
                name: 'feature-flags',
                icon: 'material-symbols:flag',
                category: 'modules',
                view: {
                    type: 'iframe',
                    src: `../../../_feature_flags`
                }
            })

        });
    }

});

