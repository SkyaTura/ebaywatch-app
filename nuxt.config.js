const pkg = require('./package')

module.exports = {
  mode: 'spa',
  env: {
    isDemo: process.env.DEMO,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'eBaywatch',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/style/app.styl'],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', 'vuetify-dialog/nuxt'],
  manifest: {
    name: 'eBaywatch',
    short_name: 'eBaywatch',
    background_color: '#FFF',
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_URL || 'http://localhost:4000/api/',
    browserBaseURL:
      process.env.BROWSER_API_URL ||
      process.env.API_URL ||
      'http://localhost:4000/api/',
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/vuetify', { src: '~/plugins/vuex-persist', ssr: false }],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
