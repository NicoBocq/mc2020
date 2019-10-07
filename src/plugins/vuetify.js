// import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    light: {
      primary: 'red darken-4',
    },
  },
  icons: {
    iconfont: 'mdi',
  }
})