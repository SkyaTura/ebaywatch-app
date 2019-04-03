import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.base, // a color that is not in the material colors palette
    accent: colors.blue.accent4,
    secondary: colors.amber.lighten1,
    error: colors.red.darken3,
    // info: colors.teal.lighten1,
    // warning: colors.amber.base,
    // success: colors.green.base,
  },
})
