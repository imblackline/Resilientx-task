import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n';

import FontAwesomeIcon from './plugins/fontawesome.js';

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
