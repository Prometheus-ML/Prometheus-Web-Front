export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1.0',
      title: '대학생 인공지능 동아리 프로메테우스',
      meta: [],
      link: [
        {
          rel: 'stylesheet',
          type: 'text/css',
          href:
            'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap'
        }
      ]
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
});
