<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  local?: string
  network?: string
}>()

const local = computed(() => scriptWrapper(props.local!))
const network = computed(() => scriptWrapper(props.network!))

function scriptWrapper(str: string) {
  return `\<script src="${str}"\>\</script\>`
}
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center">
    <GalaceanLogo class="inner" />

    <p class="pt-5 font-bold text-base">
      Waiting for connection...
    </p>

    <div v-if="props.local && props.network" class="mt-5">
      <p class="text-center text-sm op80 text-base">
        Add one of the following to the top of your page 👇:
      </p>
      <hr op="20" my-4>
      <div class="mt-4 $ui-fcc flex flex-row">
        <InputWithCopy :content="local" />
      </div>
      <div class="mt-3 $ui-fcc flex-row">
        <InputWithCopy :content="network" />
      </div>
    </div>
  </div>
</template>
