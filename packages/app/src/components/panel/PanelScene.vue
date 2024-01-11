<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useDevToolsState } from '../../../../core/src/vue-plugin'
import { getIpAddress } from '../../../electron/ipc/renderer'
import { useSceneStore } from '~/stores/scene'

const ipAddress = ref('')
onMounted(async () => {
  ipAddress.value = await getIpAddress()
})

const port = window.process.env.PORT || 8848
const network = computed(() => `http://${ipAddress.value}:${port}`)

const tabList = ref([
  { title: 'Scene', key: 'scene', icon: 'i-ri-grid-line' },
])

const state = useDevToolsState()!

const scene = useSceneStore()
const devtoolsReady = computed(() => {
  return state.connected.value || scene.inspectUrl
})
</script>

<template>
  <AGUIPanel class="panel-scene flex-1" h="full" w="full">
    <AGUITabs :list="tabList" :default-index="2">
      <AGUITabPanel h="full" :unmount="false" relative>
        <WaitForConnection
          v-if="!devtoolsReady"
          :local="`http://localhost:${port}`"
          :network="network"
        />

        <AppConnecting v-else>
          <slot />
          <PageFrame />
        </AppConnecting>
      </AGUITabPanel>
      <slot />
    </AGUITabs>
  </AGUIPanel>
</template>
