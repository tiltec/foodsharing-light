// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import moment from 'moment'

import router from './router'
import auth from 'services/auth'
import socket from 'services/socket'
import chat from 'services/chat'
import FromNow from 'components/FromNow'
import Loading from 'components/Loading'

Vue.use(Quasar) // Install Quasar Framework

Vue.component('from-now', FromNow)
Vue.component('loading', Loading)

moment.locale('de')

// wireup socket to chats
// TODO: make it unsubscribe
socket.subscribe(message => {
  chat.receiveMessage(message)
})

auth.check().then(() => {
  Quasar.start(() => {
    /* eslint-disable no-new */
    new Vue({
      el: '#q-app',
      router,
      render: h => h(require('./App'))
    })
  })
})
