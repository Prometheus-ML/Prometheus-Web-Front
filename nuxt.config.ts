export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1.0',
      title: '대학생 인공지능 동아리 프로메테우스',
      meta: [
        { hid: 'og:image', property: 'og:image', content: "https://prometheus-ai.net/_nuxt/prometheus.f62993c9.jpg" },
      ],
      link: [
        {
          rel: 'stylesheet',
          type: 'text/css',
          href:
            'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap'
        },
        {
          rel: 'stylesheet',
          type: 'text/css',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css'
        }
      ]
    },
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/css/main.css',
    'vue-slick-carousel/dist/vue-slick-carousel.css'
  ],

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome'
    ]
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    // Public keys (exposed to client-side)
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api/v1',
      googleClientId: process.env.GOOGLE_CLIENT_ID || '',
      frontUrl: process.env.FRONT_URL || 'http://localhost:3000',
    }
  },

  compatibilityDate: '2025-01-16',
});