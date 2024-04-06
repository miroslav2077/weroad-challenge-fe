<template>
<section id="payment_timer" class="flex flex-col justify-center items-center mt-10">
  <span class="text-xs text-black block uppercase font-bold">cart will expire in</span>
  <Timer v-if="cart" :expires-at="new Date(cart.expiresAt)"></Timer>
</section>

<section id="payment_form" class="container mx-auto p-8">
  <form @submit="onSubmitCompletePayment">
    <h3 class="text-2xl font-medium text-gray-900">Totally legit payment service v0.1 💸</h3>

    <div class="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 mb-5">
      <div class="col-span-3 sm:col-span-4">
        <InputWithLabel name="card-number" type="text" label="Card Number" placeholder="2222 9909 0525 7051" :required="true"/>
      </div>
      <div class="col-span-2 sm:col-span-3">
        <InputWithLabel name="expiration-date" type="text" label="Expiration date (MM/YY)" placeholder="10/28" :required="true"/>
      </div>

      <div>
        <InputWithLabel name="cvc" type="text" label="CVC" placeholder="028" :required="true"/>
      </div>
    </div>
    <div class="text-sm font-bold">
      <span class="font-bold text-sm flex justify-between mb-1">DESTINATION<span class="text-red-500 text-md">{{ cart.product.slug }}</span></span>
      <span class="font-bold text-sm flex justify-between mb-1">TRAVELERS <span class="text-red-500 text-md">{{ cart.travelerAmount }} * {{ formatPrice(cart.product.price) }}</span></span>
      <span class="font-bold text-sm flex justify-between mb-5">EMAIL <span class="text-red-500 text-md">{{ cart.travelerEmail }}</span></span>
      <span class="font-bold text-sm flex justify-between items-end">TOTAL <span class="text-red-500 text-2xl">{{ formatPrice(cart.totalAmount) }}</span></span>
    </div>
    <div class="mt-2">
        <button type="submit" class="bg-red-500 font-bold uppercase rounded text-white p-2 w-full">pay</button>
      </div>
  </form>
</section>
</template>

<script lang="ts" setup>
import type { CartQuery } from '#gql';
import { useRoute } from 'vue-router';

const route = useRoute();
const cartId: string = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
let cart: CartQuery["cart"];
try {
  cart = (await GqlCart({ id: cartId })).cart;
} catch {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  });
}


const onSubmitCompletePayment = async (e: Event) => {
  e.preventDefault();

  try {
    const result = await GqlSetAsPaid({ id: cart.id })

    if (result.setAsPaid) {
      navigateTo('/get-ready');
    }
  } catch (e: any) {
    alert(e.message);
  }
}
</script>