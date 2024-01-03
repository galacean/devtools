import { createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import './styles/index.css'
import './styles/main.css'

// `nodeIntegration` needs to be enabled in the Main process.

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
