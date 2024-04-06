<template>
  <div class="flex flex-col relative">
    <a href="/" class="absolute left-4 top-4 rounded-full bg-white flex items-center justify-center text-lg w-10 h-10 font-bold">←</a>
    <img :src="tripData?.productBySlug.imageUrl" class="w-full h-72 object-cover sm:rounded-t-xl" />
  </div>
  <div class="container px-8 py-4">
    <h1 class="text-2xl font-bold mb-0">{{ tripData?.productBySlug.name }}</h1>
    <div class="text-gray-600 flex justify-between items-center space-x-4 w-full mb-4">
      <div>
        {{ formatDateWithOptions(tripData?.productBySlug.startingDate, { weekday: 'short' }) }}
        <span class="font-bold">
          {{ formatDateWithOptions(tripData?.productBySlug.startingDate, { day: '2-digit' }) }}
          {{ formatDateWithOptions(tripData?.productBySlug.startingDate, { month: 'short' }) }}
        </span>
      </div>
      <div class="grow h-px bg-gray-300 text-center">
      </div>
      <div>
        {{ formatDateWithOptions(tripData?.productBySlug.endingDate, { weekday: 'short' }) }}
        <span class="font-bold">
          {{ formatDateWithOptions(tripData?.productBySlug.endingDate, { day: '2-digit' }) }}
          {{ formatDateWithOptions(tripData?.productBySlug.endingDate, { month: 'short' }) }}
        </span>
      </div>
    </div>
    <h4 class="font-bold bg-gradient-to-r from-fuchsia-500  via-cyan-500 to-green-500 inline-block bg-clip-text text-transparent text-md mb-2">Explore these moods:</h4>
    <div class="flex justify-between mb-6">
      <div class="text-center">
        <EmojiProgress :percentage="tripData?.productBySlug.nature">🏞️</EmojiProgress>
        <h4 class="font-bold text-green-400 text-xs uppercase">nature</h4>
      </div>
      <div class="text-center">
        <EmojiProgress :percentage="tripData?.productBySlug.relax">💆</EmojiProgress>
        <h4 class="font-bold text-yellow-400 text-xs uppercase">relax</h4>
      </div>
      <div class="text-center">
        <EmojiProgress :percentage="tripData?.productBySlug.history">🏺</EmojiProgress>
        <h4 class="font-bold text-amber-600 text-xs uppercase">history</h4>
      </div>
      <div class="text-center">
        <EmojiProgress :percentage="tripData?.productBySlug.culture">🌎</EmojiProgress>
        <h4 class="font-bold text-blue-400 text-xs uppercase">culture</h4>
      </div>
      <div class="text-center">
        <EmojiProgress :percentage="tripData?.productBySlug.party">🥳</EmojiProgress>
        <h4 class="font-bold text-pink-400 text-xs uppercase">party</h4>
      </div>
    </div>
    <p class="text-md leading-1 text-gray-400 mb-2">{{ tripData?.productBySlug.description }}</p>
  </div>
  <div class="container flex flex-col space-y-4 mx-auto px-8 border-t py-8">
    <div class="flex justify-between space-x-3">
      <div class="self-end mb-px">
        <div class="text-xs font-bold">WHEN</div>
        {{ formatDateWithOptions(tripData?.productBySlug.startingDate, { day: '2-digit' }) }}
        <span class="font-bold text-red-500 text-md uppercase">{{ formatDateWithOptions(tripData?.productBySlug.startingDate, {
      month: 'short'
    }) }}</span>
        -
        {{ formatDateWithOptions(tripData?.productBySlug.endingDate, { day: '2-digit' }) }}
        <span class="font-bold text-red-500 text-md uppercase">{{ formatDateWithOptions(tripData?.productBySlug.endingDate, {
      month:
        'short'
    }) }}</span>
      </div>
      <span class="font-bold text-red-500 ml-auto flex flex-col">
        <span class="text-xs text-gray-900">AVAILABILITY </span>
        <span v-if="availableSeatsData?.availableSeats > 0">{{ availableSeatsData?.availableSeats }} <span class="text-gray-900 font-normal">seat<span v-if="availableSeatsData?.availableSeats != 1">s</span></span></span>
        <span v-else class="uppercase">sold out</span>
      </span>
      <span class="font-bold text-red-500 flex flex-col"><span class="text-xs text-gray-900">PRICE </span>{{
      formatPrice(tripData?.productBySlug.price) }}</span>

    </div>
    <div>
      <form @submit="onSubmitProceedToPayment" class="overflow-hidden flex flex-col h-full space-y-4" v-if="availableSeatsData?.availableSeats > 0">
        <div>
          <label for="travelerEmail" class="block text-sm font-bold leading-6 text-gray-900 uppercase">Email</label>
          <div class="mt-2">
            <input type="email" name="travelerEmail" id="travelerEmail" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-red-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="you@example.com" aria-describedby="email-description" required />
          </div>
          <p class="mt-2 text-sm text-gray-500" id="email-description">We'll send you a recap of the trip to this address.</p>
        </div>

        <div class="flex space-x-16">
        <div>
          <h3 class="text-sm font-bold mb-2 uppercase">How many travelers?</h3>
          <div class="flex">
            <button type="button" @click="() => travelerAmount--" :disabled="travelerAmount < 2"
              class="rounded-full disabled:opacity-30 shadow-2xl bg-white border-gray-300 font-bold text-xl leading-none pb-1 border h-12 w-12 shrink-0 block text-center">-</button>
            <span class="text-3xl mx-5 mt-1 font-bold text-red-500 font-mono">{{ travelerAmount }}</span>
            <button type="button" @click="() => travelerAmount++" :disabled="travelerAmount == availableSeatsData?.availableSeats"
              class="rounded-full disabled:opacity-30 shadow-2xl bg-white border-gray-300 font-bold text-xl leading-none pb-1 border h-12 w-12 shrink-0 block text-center">+</button>
          </div>
          <input type="hidden" name="travelerAmount" :value="travelerAmount">
        </div>
        <div class="text-sm font-bold mb-2 uppercase">
          <span class="font-bold flex flex-col">TOTAL <span class="text-red-500 text-3xl mt-2">{{ formatPrice(tripData?.productBySlug.price * travelerAmount) }}</span></span>
        </div>
      </div>

      <div>
        <button type="submit" class="bg-red-500 font-bold uppercase rounded text-white p-2 w-full">book now</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

let travelerAmount = ref(1);

const route = useRoute();

const GET_PRODUCT_BY_SLUG = gql`
  query getProductBySlug {
    productBySlug(slug: "${route.params.slug}") {
      id
      name
      slug
      description
      startingDate
      endingDate
      price
      nature
      relax
      history
      culture
      party
      imageUrl
    }
  }
`;
const { data: tripData } = await useAsyncQuery(GET_PRODUCT_BY_SLUG);

const GET_SEATS_AVAILABLE = gql`
  query getAvailableSeats {
    availableSeats(id: "${tripData?.value?.productBySlug.id}")
  }
`;

const { data: availableSeatsData } = await useAsyncQuery(GET_SEATS_AVAILABLE);

const CREATE_CART = gql`
  mutation CreateCart($cart: NewCartInput!) {
    addCart(newCartData: $cart) {
      id
    }
  }
`;

const onSubmitProceedToPayment = async (e: Event) => {
  e.preventDefault();
  console.log(e);
  const { mutate } = useMutation(CREATE_CART, {
    variables: {
      cart: {
        "productId": tripData?.value?.productBySlug.id,
        "travelerEmail": e.target.elements.travelerEmail.value,
        "travelerAmount": parseInt(e.target.elements.travelerAmount.value),
      },
    }
  });

  try {
    const result = await mutate();
    if (result) {
      navigateTo(`/checkout/${result.data.addCart.id}`);
    }
  } catch (e: any) {
    alert(e.message);
  }

}
</script>
