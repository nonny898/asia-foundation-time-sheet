import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators'
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
class UserModule extends VuexModule {
  user: any = null

  @Mutation
  SET_USER(payload: any) {
    this.user = payload
  }

  @Action({ rawError: true })
  setUser(payload: any) {
    this.SET_USER(payload)
  }
}

export default getModule(UserModule)
