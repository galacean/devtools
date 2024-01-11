import { createApp } from 'vue'
import { createDevToolsVuePlugin } from '@galacean/devtools-core'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import './styles/index.css'
import './styles/main.css'

import './styles/index.scss'

import { init as initDevTools } from './devtools'

import '@advjs/gui/client/styles/index.scss'
import '@advjs/gui/dist/icons.css'

// `nodeIntegration` needs to be enabled in the Main process.

const app = createApp(App)

app.use(createDevToolsVuePlugin())

const ctx = {
  app,
  isClient: true,
  initialState: {},
}
// install all modules under `modules/`
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.(ctx))

app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })

initDevTools(app)
