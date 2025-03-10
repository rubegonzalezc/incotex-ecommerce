import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          accent: '#4CAF50',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          background: '#FFFFFF',
          surface: '#FFFFFF',
        }
      }
    }
  },
  defaults: {
    VRadio: {
      color: 'primary',
      density: 'comfortable',
      ripple: true,
      baseColor: 'rgba(0, 0, 0, 0.87)',
    },
    VRadioGroup: {
      color: 'primary',
      density: 'comfortable',
      baseColor: 'rgba(0, 0, 0, 0.87)',
    },
    VCheckbox: {
      color: 'primary',
      baseColor: 'rgba(0, 0, 0, 0.87)',
    },
    VTextField: {
      color: 'primary',
      variant: 'outlined',
    },
    VSelect: {
      color: 'primary',
      variant: 'outlined',
    },
    VBtn: {
      color: undefined,
    },
    VCard: {
      color: 'white',
    },
    VLabel: {
      color: 'rgba(0, 0, 0, 0.87)',
    }
  }
})
