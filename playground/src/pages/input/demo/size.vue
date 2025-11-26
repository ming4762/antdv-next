<script setup lang="ts">
import { UserOutlined } from '@antdv-next/icons'
import { ref } from 'vue'

const value = ref()
</script>

<template>
  <a-flex vertical gap="middle">
    <a-input v-model:value="value" size="large" placeholder="large size">
      <template #prefix>
        <UserOutlined />
      </template>
    </a-input>
    <a-input v-model:value="value" placeholder="default size">
      <template #prefix>
        <UserOutlined />
      </template>
    </a-input>
    <a-input v-model:value="value" size="small" placeholder="small size">
      <template #prefix>
        <UserOutlined />
      </template>
    </a-input>
  </a-flex>
</template>
