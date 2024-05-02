// import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'
// import colors from 'vuetify/lib/util/colors'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
// import * as components from 'vuetify/lib/components'
// import * as directives from 'vuetify/lib/directives'
import { aliases, md } from 'vuetify/iconsets/md'

import { VTreeview } from 'vuetify/labs/VTreeview'

// import { VDataTable } from 'vuetify/labs/VDataTable'
// import { VDatePicker } from 'vuetify/labs/VDatePicker'

export default createVuetify({
  components: {
    ...components,
    VTreeview
    // VDatePicker
    // VDataTable // TODO: Pre-prod feature!!!
  },
  // directives,

  icons: {
    defaultSet: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    aliases,
    sets: {
      md
    }
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: '#3100BD',
          accent: '#FF6400'
          /* primary: colors.blue.darken3,
          secondary: '#1B283B',
          secondaryVariant: '#2A3951',
          secondaryVariantLight: '#445C7A',
          accent: '#0B141F',
          error: colors.red.darken4,
          red: colors.red.darken4,
          success: colors.green.darken4,
          green: colors.green.darken4,
          grey: colors.grey.base,
          greyDark2: colors.grey.darken2,
          greyDark3: colors.grey.darken3,
          greyDark4: colors.grey.darken4,
          slate: '#b7c7de' */
        }
      },
      dark: {
        colors: {
          primary: '#3100BD',
          accent: '#FF6400'
          /* primary: colors.blue.darken3,
          secondary: '#1B283B',
          secondaryVariant: '#2A3951',
          secondaryVariantLight: '#445C7A',
          accent: '#0B141F',
          error: colors.red.darken4,
          red: colors.red.darken4,
          success: colors.green.darken4,
          green: colors.green.darken4,
          grey: colors.grey.base,
          greyDark2: colors.grey.darken2,
          greyDark3: colors.grey.darken3,
          greyDark4: colors.grey.darken4,
          slate: '#b7c7de' */
        }
      }
    }
  }
})
