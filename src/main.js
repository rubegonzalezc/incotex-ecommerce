/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import '@fortawesome/fontawesome-free/css/all.css'

// Plugins
import { registerPlugins } from '@/plugins'
import router from './router'
// Eliminamos la importación individual de vuetify ya que registerPlugins probablemente lo maneja
// import vuetify from './plugins/vuetify'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

// Registramos todos los plugins (incluido Vuetify)
registerPlugins(app)
// Registramos el router
app.use(router)
// Eliminamos esta línea para evitar registrar Vuetify dos veces
// app.use(vuetify)

app.mount('#app')