# Nuxt Flags Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[Nuxt module](nuxt-href) to use Feature Flags (as [Unleash](https://github.com/Unleash/unleash) used by [Gitlab](https://docs.gitlab.com/ee/operations/feature_flags.html)) toggle feature services. Compatible with **Nuxt3**

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/edit/nuxt-flags?file=nuxt.config.ts)


_If you want to use Nuxt2, please visit [nuxt-unleash](https://github.com/conejerock/nuxt-unleash)_

## Quick Setup

1. Add `nuxt-flags` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-flags

# Using yarn
yarn add --dev nuxt-flags

# Using npm
npm install --save-dev nuxt-flags
```

2. Add `nuxt-flags` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-flags'
  ]
})
```

That's it! You can now use Nuxt Flags Module in your Nuxt app ✨

## Module options

To configure Nuxt Flags, you can pass the flags options.
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
    flags: {
        url: 'https://example.com/api/v4/feature_flags/unleash/42',
        instanceId: '29QmjsW6KngPR5JNPMWx',
        appName: 'production'
    }
})
```
For all options available, please refer to TSDocs in your IDE, or the [type definition file](https://github.com/conejerock/nuxt-flags/blob/main/src/options.ts).
## Usage

### useNuxtFlags
To use `nuxt-flags` in your NuxtApp, call composable `useNuxtFlags()` 
```vue
<template>
  <div v-if="myFeatureFlag.enabled">
    Show feature for {{myFeatureFlag.description}}
  </div>
  <div v-else>
    No show feature
  </div>
</template>

<script setup lang="ts">
const {get} = useNuxtFlags()
const myFeatureFlag = get('my-feature-flag') 
</script>
```

Its recommended use `useNuxtFlag` to acquire feature flags. However, you can also access the flags using the plugin syntax `$flags`. 
```typescript
const { get } = useNuxtApp().$flags
```

## API

The module provides four methods:

### exists
Returns whether a feature flag exists

```typescript
// exists(name: string)
const { exists } = useNuxtFlags()
exists('new-feature')
```

### isEnabled
If the feature flag exists, return its status value.

```typescript
// isEnabled(name: string)
const { isEnabled } = useNuxtFlags()
isEnabled('new-feature')
```

### isAllowUser
If feature flag has the strategy `userWithId` as user list (comma separated), returns whether *myUsername* is in the user list of `userIds`.
```typescript
// isAllowUser(name: string, username: string)
const { isAllowUser } = useNuxtFlags()
isAllowUser('new-feature', 'myUsername')
```

### isAllowIP
If feature flag has the strategy `userWithId` as IP list (comma separated), returns whether the current request IP is in the IP list of `userIds`.
```typescript
// isAllowIP(name: string)
const { isAllowIP } = useNuxtFlags()
isAllowIP('new-feature')
```

### get
Returns feature flag data (can be undefined)

```typescript
// get(name: string)
const { get } = useNuxtFlags()
get('new-feature')
```

### getAll
Returns all feature flags data

```typescript
// getAll()
const { getAll } = useNuxtFlags()
getAll()
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)


Copyright (c) Conejerock

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-flags/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-flags

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-flags.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-flags

[license-src]: https://img.shields.io/npm/l/nuxt-flags.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-flags

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
