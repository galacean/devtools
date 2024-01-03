<script lang="ts" setup>
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
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
</script>

<template>
  <div class="flex-center m-auto" gap="2">
    <button @click="onCopy">
      <div i-ri-file-copy-line />
    </button>

    <div class="bg-dark-700 px-3 py-1.5 rounded-lg">
      {{ content }}
    </div>
    <slot />
  </div>
</template>
