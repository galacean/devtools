import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useSceneStore = defineStore('scene', () => {
  const inspectUrl = useStorage('galacean:devtools:inspectUrl', '')

  return {
    inspectUrl,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSceneStore as any, import.meta.hot))
