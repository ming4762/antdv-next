<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="ant-doc-header fixed top-0 z-1 shadow w-full" v-bind="$attrs">
    header
  </div>
  <div class="ant-doc-header-placeholder" />
</template>

<style scoped>
.ant-doc-header {
  height: var(--ant-doc-header-height);
}
.ant-doc-header-placeholder {
  height: var(--ant-doc-header-height);
}
</style>
