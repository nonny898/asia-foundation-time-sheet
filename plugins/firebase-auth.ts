import userModule from '~/store/user-module'
import { $fire } from '~/utils/api'

export default () => {
  return new Promise((resolve) => {
    $fire.auth.onAuthStateChanged((user) => {
      if (user) {
        return resolve(userModule.setUser(user))
      }
      return resolve(null)
    })
  })
}
