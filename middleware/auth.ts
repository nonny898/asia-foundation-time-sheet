import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = (context: any) => {
  if (context.route.fullPath !== '/login' && !context.$supabase.auth.user()) {
    return context.redirect('/login')
  }
  if (context.route.fullPath === '/login' && context.$supabase.auth.user()) {
    return context.redirect('/')
  }
}

export default authMiddleware
