<script setup lang="ts">
import BaseConfig from './layouts/base/index.vue'
</script>

<template>
  <BaseConfig>
    <router-view />
  </BaseConfig>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
