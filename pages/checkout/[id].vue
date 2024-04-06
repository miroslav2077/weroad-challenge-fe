<template>
<section id="payment_timer" class="flex flex-col justify-center items-center mt-10">
  <span class="text-xs text-black block uppercase font-bold">cart will expire in</span>
  <Timer v-if="cart" :expires-at="new Date(cart.expiresAt)"></Timer>
</section>

<section id="payment_form" class="container mx-auto p-8">
  <form @submit="onSubmitCompletePayment">
    <h3 class="text-lg font-medium text-gray-900">Totally legit payment service v0.1 💸💸💸</h3>

    <div class="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 mb-5">
      <div class="col-span-3 sm:col-span-4">
        <label for="card-number" class="text-xs text-black block uppercase font-bold">Card number</label>
        <div class="mt-1">
          <input type="text" id="card-number" name="card-number" autocomplete="cc-number" class="block p-2 w-full rounded-md border-gray-300 border shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required />
        </div>
      </div>
      <div class="col-span-2 sm:col-span-3">
        <label for="expiration-date" class="text-xs text-black block uppercase font-bold">Expiration date (MM/YY)</label>
        <div class="mt-1">
          <input type="text" name="expiration-date" id="expiration-date" autocomplete="cc-exp" class="block p-2 w-full rounded-md border-gray-300 border shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required />
        </div>
      </div>

      <div>
        <label for="cvc" class="text-xs text-black block uppercase font-bold">CVC</label>
        <div class="mt-1">
          <input type="text" name="cvc" id="cvc" autocomplete="csc" class="block p-2 w-full rounded-md border-gray-300 border shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required />
        </div>
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
import { useRoute } from 'vue-router';

const route = useRoute();
const cartId: string = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const { cart } = await GqlCart({ id: cartId });

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