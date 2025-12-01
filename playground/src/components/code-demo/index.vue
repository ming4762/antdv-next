<script setup lang="ts">
import demos from 'virtual:demos'

defineOptions({
  name: 'Demo',
})
const { src } = defineProps<{
  src: string
}>()
const demo = demos[src]
console.log(demo)
</script>

<template>
  <div>
    <component :is="demo.component" v-if="demo.component" />
    <slot />
    <div v-html="demo.html" />
  </div>
</template>
