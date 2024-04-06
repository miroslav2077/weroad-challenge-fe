<template>
<div class="container py-8 px-4">
  <section>
    <h1 class="text-3xl font-bold mb-4"><span class="text-red-500">We</span>Road</h1>
  </section>
  <section class="flex flex-col bg-white space-y-4 items-center overflow-hidden">
    <a :href="'/trips/'+product.slug" class="relative flex flex-col grow-0 justify-between overflow-hidden min-w-72 w-full h-72 rounded-xl shadow-md cursor-pointer group shrink-0" v-for="product in products">
      <div class="absolute bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform z-0" :style="{ backgroundImage: `url(${product.imageUrl})` }">
      </div>
      <div class="z-10 relative flex justify-between py-2 px-4 bg-gradient-to-b from-slate-950/20 to-transparent">
        <span class="z-10 text-white text-sm uppercase font-medium text-left mt-1 [text-shadow:_1px_1px_0_var(--tw-shadow-color)] shadow-gray-950/60">
            {{ formatDateWithOptions(product.startingDate, { day: '2-digit' }) }}
            <span class="font-bold text-md">{{ formatDateWithOptions(product.startingDate, { month: 'short' }) }}</span>
            -
            {{ formatDateWithOptions(product.endingDate, { day: '2-digit' }) }}
            <span class="font-bold text-md">{{ formatDateWithOptions(product.endingDate, { month: 'short' }) }}</span>
        </span>
        <span class="z-10 text-white font-bold text-xl [text-shadow:_0_2px_0_var(--tw-shadow-color)] shadow-gray-950/20 rounded-xl leading-none"><span class="text-xs block text-right uppercase font-medium mr-0">from</span>{{ formatPrice(product.price) }}</span>
      </div>
      <div class="flex flex-col relative z-10 px-3 pb-5 pt-10 w-full bg-gradient-to-t from-slate-950/70 to-transparent">
        <h2 class="text-white font-medium text-xl">{{ product.name }}</h2>
      </div>
    </a>
  </section>
</div>
</template>

<script lang="ts" setup>
const { products } = await GqlProducts();
</script>