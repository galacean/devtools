<script lang="ts" setup>
import { ref } from 'vue'
import { computedAsync, useClipboard } from '@vueuse/core'
import { codeToHtml } from 'shikiji'
import { showNotification } from '../../composables'

const props = defineProps<{
  content: string
}>()

const source = ref(props.content)

const { copy, copied } = useClipboard({ source })

async function onCopy() {
  await copy()

  if (copied.value) {
    showNotification({
      message: 'Copied Successfully!',
      type: 'success',
      placement: 'bottom-right',
    })
  }
}

const highlightedHtml = computedAsync(async () => {
  return await codeToHtml(props.content, {
    lang: 'html',
    theme: 'github-dark',
  })
})
</script>

<template>
  <div class="flex-center m-auto" gap="2">
    <button p-2 @click="onCopy">
      <div i-ri-file-copy-line />
    </button>

    <div v-html="highlightedHtml" />
    <slot />
  </div>
</template>
