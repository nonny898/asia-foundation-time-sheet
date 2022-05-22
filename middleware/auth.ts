import { Middleware } from '@nuxt/types'
import userModule from '~/store/user-module'

const unauthorizedPage = ['/login', '/signup']

const authMiddleware: Middleware = (context: any) => {
  const user = userModule.user
  if (!unauthorizedPage.includes(context.route.fullPath) && !user) {
    return context.redirect('/login')
  }
  if (unauthorizedPage.includes(context.route.fullPath) && user) {
    return context.redirect('/')
  }
}

export default authMiddleware
