<script lang="ts" setup>
import type { TreeNode } from '@advjs/gui'
import { socket } from '../../devtools'
import { treeData } from '../../stores'

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
  <AGUITree
    class="w-full h-full text-left"
    :data="treeData"
    @node-hide="onNodeHide"
    @node-show="onNodeShow"
  />
</template>
