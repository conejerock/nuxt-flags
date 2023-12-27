import {describe, expect, it, vi} from 'vitest'
import {$fetch} from '@nuxt/test-utils'
import {setupNuxtFlags} from "./utils";
import features from "./fixtures/request/features";
import UnleashClient from "unleash-client"

const TEST_UNLEASH_URL: string = "https://example.com/api/v4/feature_flags/unleash/123456789";

vi.spyOn(UnleashClient, 'initialize')
  // @ts-ignore
  .mockImplementationOnce(() => {
    return {
      start: vi.fn().mockImplementation(() => Promise.resolve()),
      getFeatureToggleDefinitions: vi.fn().mockReturnValue(features)
    }
  })

describe('contain feature enabled', async () => {

    await setupNuxtFlags(
        {
            appName: 'testing',
            url: TEST_UNLEASH_URL
        }
    )

    it('renders the index page', async () => {
        const html = await $fetch('/')
        expect(html).toContain('<div>This is Feature Name 1 description</div>')
    })
})
