import { Middleware } from '@nuxt/types'

const unauthorizedPage = ['/login', '/signup']

const authMiddleware: Middleware = (context: any) => {
  if (
    !unauthorizedPage.includes(context.route.fullPath) &&
    !context.$supabase.auth.user()
  ) {
    return context.redirect('/login')
  }
  if (
    unauthorizedPage.includes(context.route.fullPath) &&
    context.$supabase.auth.user()
  ) {
    return context.redirect('/')
  }
}

export default authMiddleware
