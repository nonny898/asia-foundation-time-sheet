/* eslint-disable import/no-mutable-exports */
import { NuxtFireInstance } from '@nuxtjs/firebase'

let $fire: NuxtFireInstance

export function initializeFire(fireInstance: NuxtFireInstance) {
  $fire = fireInstance
}

export { $fire }
