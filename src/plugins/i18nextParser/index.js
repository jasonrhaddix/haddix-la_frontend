import i18next from 'i18next'
import i18nextVue from 'i18next-vue'
import i18nextBackend from 'i18next-http-backend'

export default function (app) {
  i18next
    .use(i18nextBackend)
    .init({
      debug: true,
      lng: 'en-US',
      fallbackLng: 'en-US',
      // returnEmptyString: false,
      load: 'currentOnly',
      backend: {
        loadPath: '/localization/locales/{{lng}}/{{ns}}.json' + '?cb=' + new Date().getTime()
      },
      ns: [
        'common',
        'views',
        'components',
      ]
    })
    .catch(() => {
      console.error('Cannot load internationalization data')
    })

  app.use(i18nextVue, {
    i18next,
    rerenderOn: [
      'initialized',
      'languagedChanged',
      'loaded'
    ]
  })

  return app
}
