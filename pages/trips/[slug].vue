<template>
  <section id="trip_image" class="flex flex-col relative">
    <a href="/" class="absolute left-4 top-4 rounded-full bg-white flex items-center justify-center text-lg w-10 h-10 font-bold">←</a>
    <img :src="productBySlug.imageUrl" class="w-full h-72 object-cover sm:rounded-t-xl" />
  </section>
  <section id="trip_description" class="container px-8 py-4">
    <h1 class="text-2xl font-bold mb-0">{{ productBySlug.name }}</h1>
    <div class="text-gray-600 flex justify-between items-center space-x-4 w-full mb-4">
      <div>
        {{ formatDateWithOptions(productBySlug.startingDate, { weekday: 'short' }) }}
        <span class="font-bold">
          {{ formatDateWithOptions(productBySlug.startingDate, { day: '2-digit' }) }}
          {{ formatDateWithOptions(productBySlug.startingDate, { month: 'short' }) }}
        </span>
      </div>
      <div class="grow h-px bg-gray-300 text-center">
      </div>
      <div>
        {{ formatDateWithOptions(productBySlug.endingDate, { weekday: 'short' }) }}
        <span class="font-bold">
          {{ formatDateWithOptions(productBySlug.endingDate, { day: '2-digit' }) }}
          {{ formatDateWithOptions(productBySlug.endingDate, { month: 'short' }) }}
        </span>
      </div>
    </div>
    <h4 class="font-bold bg-gradient-to-r from-fuchsia-500  via-cyan-500 to-green-500 inline-block bg-clip-text text-transparent text-md mb-2">Explore these moods:</h4>
    <div class="flex justify-between mb-6">
      <div class="text-center">
        <EmojiProgress :percentage="productBySlug.nature">🏞️</EmojiProgress>
        <h4 class="font-bold text-green-400 text-xs uppercase">nature</h4>
      </div>
      <div class="text-center">
        <EmojiProgress :percentage="productBySlug.relax">💆</EmojiProgress>
        <h4 class="font-bold text-yellow-400 text-xs uppercase">relax</h4>
      </div>
      <div class="text-center">
        <EmojiProgress :percentage="productBySlug.history">🏺</EmojiProgress>
        <h4 class="font-bold text-amber-600 text-xs uppercase">history</h4>
      </div>
      <div class="text-center">
        <EmojiProgress :percentage="productBySlug.culture">🌎</EmojiProgress>
        <h4 class="font-bold text-blue-400 text-xs uppercase">culture</h4>
      </div>
      <div class="text-center">
        <EmojiProgress :percentage="productBySlug.party">🥳</EmojiProgress>
        <h4 class="font-bold text-pink-400 text-xs uppercase">party</h4>
      </div>
    </div>
    <p class="text-md leading-1 text-gray-400 mb-2">{{ productBySlug.description }}</p>
  </section>
  <section id="trip_purchase" class="container flex flex-col space-y-4 mx-auto px-8 border-t py-8">
    <div class="flex justify-between space-x-3">
      <div class="self-end mb-px">
        <div class="text-xs font-bold">WHEN</div>
        {{ formatDateWithOptions(productBySlug.startingDate, { day: '2-digit' }) }}
        <span class="font-bold text-red-500 text-md uppercase">{{ formatDateWithOptions(productBySlug.startingDate, {
      month: 'short'
    }) }}</span>
        -
        {{ formatDateWithOptions(productBySlug.endingDate, { day: '2-digit' }) }}
        <span class="font-bold text-red-500 text-md uppercase">{{ formatDateWithOptions(productBySlug.endingDate, {
      month:
        'short'
    }) }}</span>
      </div>
      <span class="font-bold text-red-500 ml-auto flex flex-col">
        <span class="text-xs text-gray-900">AVAILABILITY </span>
        <span data-testid="availability" v-if="availableSeats > 0">{{ availableSeats }} <span class="text-gray-900 font-normal">seat<span v-if="availableSeats != 1">s</span></span></span>
        <span data-testid="sold-out" v-else class="uppercase">sold out</span>
      </span>
      <span class="font-bold text-red-500 flex flex-col"><span class="text-xs text-gray-900">PRICE </span>{{
      formatPrice(productBySlug.price) }}</span>

    </div>
    <div>
      <form @submit="onSubmitProceedToPayment" class="overflow-hidden flex flex-col h-full space-y-4" v-if="availableSeats > 0">

        <InputWithLabel name="travelerEmail" type="email" label="Email" placeholder="you@example.com" description="We'll send you a recap of the trip to this address." :required="true"/>

        <div class="flex space-x-16">
        <div>
          <h3 class="text-sm font-bold mb-2 uppercase">How many travelers?</h3>
          <div class="flex">
            <button type="button" @click="() => travelerAmount--" :disabled="travelerAmount < 2"
              class="rounded-full disabled:opacity-30 shadow-2xl bg-white border-gray-300 font-bold text-xl leading-none pb-1 border h-12 w-12 shrink-0 block text-center" data-testid="remove-traveler">-</button>
            <span class="text-3xl mx-5 mt-1 font-bold text-red-500 font-mono" data-testid="traveler-amount">{{ travelerAmount }}</span>
            <button type="button" @click="() => travelerAmount++" :disabled="travelerAmount == availableSeats"
              class="rounded-full disabled:opacity-30 shadow-2xl bg-white border-gray-300 font-bold text-xl leading-none pb-1 border h-12 w-12 shrink-0 block text-center" data-testid="add-traveler">+</button>
          </div>
          <input type="hidden" name="travelerAmount" :value="travelerAmount">
        </div>
        <div class="text-sm font-bold mb-2 uppercase">
          <span class="font-bold flex flex-col">TOTAL <span class="text-red-500 text-3xl mt-2">{{ formatPrice(productBySlug.price * travelerAmount) }}</span></span>
        </div>
      </div>

      <div>
        <button type="submit" class="bg-red-500 font-bold uppercase rounded text-white p-2 w-full" data-testid="book-now">book now</button>
      </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProductBySlugQuery } from '#gql';
import { useRoute } from 'vue-router';

let travelerAmount = ref(1);

const route = useRoute();

const slug: string = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;

let productBySlug: ProductBySlugQuery["productBySlug"];

try {
  productBySlug = (await GqlProductBySlug({ slug: slug })).productBySlug;
} catch {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  });
}

const { availableSeats } = await GqlAvailableSeats({ id: productBySlug.id });


const onSubmitProceedToPayment = async (e: Event) => {
  e.preventDefault();

  try {
    const result = await GqlAddCart({ cart: { productId: productBySlug.id, travelerEmail: e.target.elements.travelerEmail.value, travelerAmount: parseInt(e.target.elements.travelerAmount.value) }})

    if (result.addCart) {
      navigateTo(`/checkout/${result.addCart.id}`);
    }
  } catch (e: any) {
    alert(e.message);
  }

}
</script>
