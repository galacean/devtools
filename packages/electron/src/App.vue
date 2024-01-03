<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getIpAddress } from '@/electron/ipc/renderer'

const port = window.process.env.PORT || 8098

const ipAddress = ref('')
const network = computed(() => `http://${ipAddress.value}:${port}`)

onMounted(async () => {
  ipAddress.value = await getIpAddress()
})
</script>

<template>
  <WaitForConnection
    :local="`http://localhost:${port}`"
    :network="network"
  >
    <GalaceanLogo />
  </WaitForConnection>
</template>
