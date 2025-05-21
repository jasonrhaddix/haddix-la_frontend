// const CustomerLexer = require('./src/plugins/i18nextParser/lexers/customer-lexer')
import CustomerLexer from './src/plugins/i18nextParser/lexers/customer-lexer.js'

export default {
  // contextSeparator: '.',
  defaultNamespace: 'common',

  indentation: 4,
  keepRemoved: false,

  lexers: {
    js: ['JavascriptLexer'],
    vue: [
      {
        lexer: CustomerLexer,
        functions: ['i18next', 'i18next.t', '$i18next.t', '$t']
      }
    ],

    default: [CustomerLexer]
  },

  locales: ['en-US', 'de-DE', 'es-ES', 'fr-FR', 'it-IT', 'pl-PL', 'pt-BR'],

  output: 'public/localization/locales/$LOCALE/$NAMESPACE.json',

  sort: true
}
