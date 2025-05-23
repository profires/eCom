<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import UserLayout from '@/layouts/UserLayout.vue'

const cartStore = useCartStore()
const updateQuantity = (product, quantity) => {
    
    cartStore.updateQuantity(product, quantity)
}
</script>

<template>
  <UserLayout>
    <div class="flex flex-col md:flex-row gap-6 mx-8 my-10">
  <div class="flex-1 bg-base-100 p-6 rounded-box shadow">
    <h1 class="text-2xl font-bold mb-6">Cart</h1>
    <p v-if="cartStore.cart.length === 0" class="text-center text-lg py-8">Your cart is empty</p>
    <div v-else class="space-y-4">
      <div v-for="item in cartStore.cart" :key="item.id" class="flex flex-row flex-wrap items-center gap-4 bg-base-200 rounded-lg p-4 ">
        <div class="flex-auto min-w-24 max-w-60 rounded-box overflow-hidden bg-base-300 flex items-center justify-center">
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" class="h-full w-full object-cover" />
        </div>
        <div class="flex-1">
          <p class="font-bold text-lg">{{ item.name }}</p>
          <p class="text-sm opacity-70">Price: {{ item.price }}</p>
        </div>
        <div>
          <input type="number" class="input input-bordered w-20" :value="item.quantity" min="1" @change="updateQuantity(item,$event.target.value)" />
        </div>
        <div>
          <button class="btn btn-sm" @click="cartStore.removeFromCart(item)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="md:w-96 w-full bg-base-200 p-6 ml-6 rounded-box shadow w-32">
    <h2 class="text-xl font-bold mb-4">Order Summary</h2>
    <div class="space-y-2 flex flex-col justify-between">
      <div class="flex-auto border-b pb-2">
        <span>Subtotal:</span>
        <span>{{ cartStore.totalPrice }}</span>
      </div>
      <div class="flex-auto border-b pb-2">
        <span>Shipping:</span>
        <span>{{ cartStore.shippingPrice }}</span>
      </div>
      <div class="flex-auto">
        <span>Total:</span>
        <span>{{ cartStore.totalPrice + cartStore.shippingPrice }}</span>
      </div>
      
    </div>
  </div>
</div>
    
  </UserLayout>
</template>
