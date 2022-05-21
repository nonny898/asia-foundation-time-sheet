import { Plugin } from '@nuxt/types'
import { initializeFire } from '~/utils/api'

const accessor: Plugin = ({ $fire }) => {
  initializeFire($fire)
}

export default accessor
