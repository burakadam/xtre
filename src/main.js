import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './library/plugins/i18n.js'
import messageplugin from './library/plugins/messageplugin'
import 'select2-vue-component'
import 'select2-vue-component/dist/select2-vue-component.min.js'
import 'select2-component/dist/select2.css'
import VueMask from 'v-mask'

/* ---------- ui implementation --------- */

import './assets/styles/fonts.css'
import './assets/styles/colors.css'
import './assets/styles/spacing.css'
import './assets/fonts/webfonts/all.css'
import './assets/styles/form.css'
import './assets/styles/button.css'
import './assets/styles/table.css'
import './assets/styles/pagination.css'
import './assets/styles/datepicker.css'
import './assets/styles/checkbox.css'
import './assets/styles/select.css'
import './assets/styles/timesheet.css'
import './assets/styles/styles.css'

/* ---------- ui implementation --------- */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  messageplugin,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
