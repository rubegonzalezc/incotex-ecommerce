/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import '@fortawesome/fontawesome-free/css/all.css'

// Plugins
import { registerPlugins } from '@/plugins'
import router from './router'
import vuetify from './plugins/vuetify'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)
app.use(router)
app.use(vuetify)

app.mount('#app')
