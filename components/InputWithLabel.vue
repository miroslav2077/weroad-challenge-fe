<template>
  <div>
    <label :for="props.name" class="block text-sm font-bold leading-6 text-gray-900 uppercase">{{ label }}</label>
    <div class="mt-1">
      <input :type="props.type" :name="props.name" :data-testid="props.name" :id="props.name" class="p-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-red-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" :placeholder="props.placeholder" :aria-describedby="props.name + '-description'" :required="props.required" />
    </div>
    <p v-if="props.description" class="mt-2 text-sm text-gray-500" :id="name + '-description'">{{ props.description }}</p>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  name: string,
  required: boolean,
  type: string,
  label: string,
  placeholder?: string,
  description?: string,
}>();
</script>