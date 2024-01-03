<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useDevToolsState } from '../../core/src/vue-plugin'
import { getIpAddress } from '@/electron/ipc/renderer'

const port = window.process.env.PORT || 8848

const ipAddress = ref('')
const network = computed(() => `http://${ipAddress.value}:${port}`)

onMounted(async () => {
  ipAddress.value = await getIpAddress()
})

const state = useDevToolsState()!

const devtoolsReady = computed(() => {
  return state.connected.value
})
</script>

<template>
  <WaitForConnection
    v-if="!devtoolsReady"
    :local="`http://localhost:${port}`"
    :network="network"
  >
    <GalaceanLogo />
  </WaitForConnection>
  <div>
    Connected
    <slot />
  </div>
</template>
