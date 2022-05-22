export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - asia-foundation-time-sheet',
    title: 'asia-foundation-time-sheet',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/TAF-tab-logo.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~/assets/scss/main.scss', lang: 'scss' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/firebase-accessor.ts' },
    { src: '~plugins/firebase-auth.ts' },
  ],

  render: {
    resourceHints: false,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/firebase',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  firebase: {
    config: {
      apiKey: 'AIzaSyAFkft4kTHf9NuFPdV0JjXZwNvaKwsoBnE',
      authDomain: 'taf-timesheet.firebaseapp.com',
      projectId: 'taf-timesheet',
      storageBucket: 'taf-timesheet.appspot.com',
      messagingSenderId: '1075900207765',
      appId: '1:1075900207765:web:8af8ad8fbfb2d44c19419c',
      measurementId: 'G-WNVV0RLPFG',
    },
    services: {
      auth: true,
      firestore: true,
    },
  },

  router: {
    middleware: 'auth',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#7C95FF',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
