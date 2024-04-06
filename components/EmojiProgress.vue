<template>
  <span class="relative text-5xl">
    <span class="leading-none"><slot/></span>
    <span class="absolute left-0 top-[7.8%] leading-none filter grayscale overflow-hidden" :style="{ height: `${(100-props.percentage)*0.8}%`}"><slot/></span>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  percentage: number
}>();
</script>

<style scoped>
</style>