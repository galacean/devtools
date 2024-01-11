<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { TreeNode } from '@advjs/gui'
import { useDevToolsState } from '../../core/src/vue-plugin'
import { treeData } from './stores'
import { socket } from './devtools'
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

function onNodeHide(nodes: TreeNode[]) {
  nodes.forEach((node) => {
    socket.emit('galacean-devtools:hide', node.name || '')
  })
}

function onNodeShow(nodes: TreeNode[]) {
  nodes.forEach((node) => {
    socket.emit('galacean-devtools:show', node.name || '')
  })
}
</script>

<template>
  <WaitForConnection
    v-if="!devtoolsReady"
    :local="`http://localhost:${port}`"
    :network="network"
  >
    <GalaceanLogo />
  </WaitForConnection>
  <div class="h-screen w-screen text-left">
    <AGUITree class="w-full" :data="treeData" @node-hide="onNodeHide" @node-show="onNodeShow" />
    <slot />
  </div>
</template>
