import { createApp } from 'vue'
import { createDevToolsVuePlugin } from '../../core/src/vue-plugin'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import './styles/index.css'
import './styles/main.css'

import { init as initDevTools } from './devtools'

import '@advjs/gui/client/styles/index.scss'
import '@advjs/gui/dist/icons.css'

// `nodeIntegration` needs to be enabled in the Main process.

const app = createApp(App)

app.use(createDevToolsVuePlugin())

app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })

initDevTools(app)
