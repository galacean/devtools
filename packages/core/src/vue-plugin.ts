import { inject, ref } from 'vue'
import type { App, InjectionKey, Plugin } from 'vue'

function initDevToolsState() {
  const connected = ref(false)
  const clientConnected = ref(false)
  const componentCount = ref(0)
  const vueVersion = ref('')
  const vitePluginDetected = ref(false)
  const activeAppRecordId = ref('')

  function init() {

  }

  return {
    init,
    restore: init,
    vueVersion,
    connected,
    clientConnected,
    componentCount,
    vitePluginDetected,
    activeAppRecordId,
  }
}

export const GalaceanDevToolsStateSymbol: InjectionKey<ReturnType<typeof initDevToolsState>> = Symbol('GalaceanDevToolsStateSymbol')
export const devtoolsState = initDevToolsState()

export function createDevToolsVuePlugin(): Plugin {
  return {
    install(app: App) {
      devtoolsState.init()
      app.provide(GalaceanDevToolsStateSymbol, devtoolsState)
    },
  }
}

export function useDevToolsState() {
  return inject(GalaceanDevToolsStateSymbol)
}
