// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Catch | Panel Admin",
    }
  },
  runtimeConfig: {
    public: {
      apiURL: process.env.BASE_URL
    },
  },
  plugins: ['~/plugins/api.ts'],
  devtools: { enabled: false },
  css: [
    "~/assets/css/root.css",
    "~/assets/css/fonts.css",
    "~/assets/css/style-global.css",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css"
  ],
  build: {
    transpile: ["vuetify", "vue-toastification", '@vuepic/vue-datepicker'],
  },
  modules: [
    '@pinia/nuxt',
    ['@nuxtjs/google-fonts', {
      families: {
        Poppins: {
          wght: [200, 400, 600, 700, 800, 900] // Specify the weight(s) you want to import, e.g., 700 for bold
        },
        Roboto: {
          wght: [200, 400, 600, 700, 800, 900] // Specify the weight(s) you want to import, e.g., 700 for bold
        }
      },
      download: true,
      inject: true
    }],
    ["nuxt-lodash", {
      prefix: "lodash",
      prefixSkip: ["string"],
      upperAfterPrefix: false,
      exclude: ["map"],
      alias: [
        ["camelCase", "stringToCamelCase"], // => stringToCamelCase
        ["kebabCase", "stringToKebab"], // => stringToKebab
        ["isDate", "isLodashDate"], // => _isLodashDate
      ],
    }]
  ],
  ssr: false,
})
