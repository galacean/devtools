<script lang="ts" setup>
import { ref } from 'vue'
import { useSceneStore } from '~/stores/scene'

const iframeRef = ref<HTMLIFrameElement>()
const scene = useSceneStore()
</script>

<template>
  <div w-full h-full>
    <iframe
      v-if="scene.inspectUrl"
      id="iframe"
      ref="iframeRef"
      :src="scene.inspectUrl"
      frameborder="0"
      class="h-full w-full overflow-hidden bg-white dark:bg-gray-800"
    />
  </div>
</template>
