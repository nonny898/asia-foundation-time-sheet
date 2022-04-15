import { getModule, Module, VuexModule } from 'vuex-module-decorators'
import { store } from '@/store'

const name: string = 'userModule'
if (store.state[name]) {
  store.unregisterModule(name)
}

@Module({
  dynamic: true,
  name,
  store,
  stateFactory: true,
  namespaced: true,
})
class UserModule extends VuexModule {}

export default getModule(UserModule)
