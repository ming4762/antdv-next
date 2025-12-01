<script setup lang="ts">
defineOptions({
  name: 'DemoGroup',
})
defineProps<{
  cols?: number
}>()
</script>

<template>
  <div>
    group
    <slot />
  </div>
</template>
