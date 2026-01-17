// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/test-utils', '@nuxt/ui'],
  $production: {
    // Variables de entorno
    runtimeConfig: {
      apiSecret: process.env.API_SECRET || '',
      public: {
        apiBase: process.env.API_BASE_URL || 'https://www.nuxt-test-docker.com',
        environment: process.env.NODE_ENV || 'production',
      },
    },
  },
  $development: {
    // Variables de entorno
    runtimeConfig: {
      apiSecret: process.env.API_SECRET || '',
      public: {
        apiBase: process.env.API_BASE_URL || 'http://localhost:3000',
        environment: process.env.NODE_ENV || 'development',
        apiKey: process.env.API_KEY || '',
      },
    },
  },
});
