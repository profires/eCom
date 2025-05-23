<script setup>
import {ref} from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

import UserLayout from '@/layouts/UserLayout.vue'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()
const route = useRoute()
const productList = productStore.list
const searchQuery = ref('')
const cartStore = useCartStore()

const addToCart = (product) => {
  const productInfo = productStore.list.find((item) => item.id === product.id)
  productInfo.quantity = 1
    cartStore.addToCart(productInfo)
}

</script>

<template>
  <UserLayout>
    <div class="hero min-h-screen"
      style="background-image: url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp);">
      <div class="hero-overlay"></div>
      <div class="hero-content text-neutral-content text-center">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
          <p class="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
    <ProductCard :productList="productList" :addToCart="addToCart" />
    
  </UserLayout>
  </template>
