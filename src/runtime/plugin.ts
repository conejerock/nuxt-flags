// @ts-ignore
import {defineNuxtPlugin} from '#app'
// @ts-ignore
import {useNuxtFlags} from '#imports'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            flags: useNuxtFlags()
        }
    }

})
