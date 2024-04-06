<template>

<div class="container py-8 px-4">
  <section>
    <h1 class="text-3xl font-bold mb-4"><span class="text-red-500">We</span>Road</h1>
  </section>
  <section class="flex flex-col bg-white space-y-4 items-center overflow-hidden">
    <a :href="'/trips/'+product.slug" class="relative flex flex-col grow-0 justify-between overflow-hidden min-w-72 w-full h-72 rounded-xl shadow-md cursor-pointer group shrink-0" v-for="product in data?.products">
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


  <!-- <div class="mb-[500px]"></div>
  <h2 class="text-xl font-bold">WeRoad</h2>

  <div class="max-w-screen-xs mx-auto flex-col space-y-4">
    <div class="overflow-hidden bg-white border-b-4" v-for="product in data?.products">
      <div class="flex flex-col px-4 py-5 sm:p-6 items-start justify-between">
        <div class="flex w-full justify-between items-center">
          <h1 class="text-2xl font-medium mb-2">{{ product.name }}</h1>
          <div class="font-medium text-red-600 text-xl">{{ formatPrice(product.price) }}</div>
        </div>
        <div class="text-gray-600 flex justify-between items-center space-x-4 w-full mb-8 text-sm">
          <div>
            {{ formatDateWithOptions(product.startingDate, { weekday: 'short' }) }}
            <span class="font-bold">
              {{ formatDateWithOptions(product.startingDate, { day: '2-digit' }) }}
              {{ formatDateWithOptions(product.startingDate, { month: 'long' }) }}
            </span>
          </div>
          <div class="grow h-px bg-gray-300 text-center">
          </div>
          <div>
            {{ formatDateWithOptions(product.endingDate, { weekday: 'short' }) }}
            <span class="font-bold">
              {{ formatDateWithOptions(product.endingDate, { day: '2-digit' }) }}
              {{ formatDateWithOptions(product.endingDate, { month: 'long' }) }}
            </span>
          </div>
        </div>
        <div class="w-full">
          <a class="w-full block text-center px-8 py-2 bg-red-500 hover:bg-red-400 rounded font-bold text-white" v-bind:href="'/trips/'+product.slug">See details</a>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts" setup>
const formatDateWithOptions = (stringDate: string, options: Intl.DateTimeFormatOptions) => {
  return new Date(stringDate).toLocaleString('en-UK', options);
}

const query = gql`
  query getProducts {
    products {
      id
      name
      slug
      description
      startingDate
      endingDate
      price
      imageUrl
    }
  }
`;
const { data } = await useAsyncQuery(query);
</script>