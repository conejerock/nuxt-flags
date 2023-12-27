// @ts-ignore
import {useRequestHeaders, useRuntimeConfig, useState} from '#app'
import {FeatureInterface} from "unleash-client/lib/feature";
import {StrategyTransportInterface} from "unleash-client/lib/strategy";
// @ts-ignore
import featureFlagsData from '#build/runtime/featureFlags.mjs'
import {computed, ComputedRef, Ref} from 'vue'

const useNuxtFlags = () => {
    const features: Ref<FeatureInterface[]> = useState<FeatureInterface[]>('nuxt-flags:features', () => featureFlagsData);
    const userIp = useState<string>('nuxt-flags:ip', () => null);

    if (process.server) {
        const runtimeConfig = useRuntimeConfig().private.flags
        const ipHeader = useRequestHeaders();
        userIp.value = ipHeader[runtimeConfig.ipHeader]
    }

    const get = (featureFlagName: string): ComputedRef<FeatureInterface | undefined> => {
        return computed(() => features.value.find(f => f.name === featureFlagName))
    }

    const getAll = (): Ref<FeatureInterface[]> => {
        return features;
    }

    const isEnabled = (featureFlagName: string): boolean => {
        return features.value.some((f: FeatureInterface) => f.name === featureFlagName && f.enabled)
    }

    const exists = (featureFlagName: string): boolean => {
        return features.value.some((f: FeatureInterface) => f.name === featureFlagName)
    }

    const isAllowUser = (featureFlagName: string, userId: string): boolean => {
        if (!_isFeatureFlagEnabled(featureFlagName)) {
            return false;
        }

        const {value: {strategies}} = get(featureFlagName) as Ref<FeatureInterface>;
        return strategies.some((strategy: StrategyTransportInterface) => _isUserAllowed(strategy, userId));
    }

    const isAllowIP = (featureFlagName: string): boolean => {
        if (!_isFeatureFlagEnabled(featureFlagName) || !userIp.value) {
            return false;
        }

        const {value: {strategies}} = get(featureFlagName) as Ref<FeatureInterface>;
        return strategies.some((strategy: StrategyTransportInterface) => _isUserAllowed(strategy, userIp.value));
    }


    const _isFeatureFlagEnabled = (featureFlagName: string): boolean => {
        if (!exists(featureFlagName)) {
            return false;
        }
        const {value: {enabled}} = get(featureFlagName) as Ref<FeatureInterface>;
        return enabled;
    }

    const _isUserAllowed = (strategy: any, userIdOrIp: string): boolean => {
        const users: string[] | undefined = strategy.parameters.userIds?.split(',').map((s: string) => s.trim());
        return !!users && userIdOrIp.length > 0 && users.includes(userIdOrIp);
    }

    return {
        get,
        getAll,
        isEnabled,
        exists,
        isAllowUser,
        isAllowIP
    }
}

export {useNuxtFlags};
