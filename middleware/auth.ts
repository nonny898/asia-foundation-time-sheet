import { Middleware } from '@nuxt/types'

const unauthorizedPage = ['/login', '/signup']

const authMiddleware: Middleware = (context: any) => {
  if (
    !unauthorizedPage.includes(context.route.fullPath) &&
    !context.$fire.auth.currentUser
  ) {
    return context.redirect('/login')
  }
  if (
    unauthorizedPage.includes(context.route.fullPath) &&
    context.$fire.auth.currentUser
  ) {
    return context.redirect('/')
  }
}

export default authMiddleware
