<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { ref,computed } from 'vue'

import UserLayout from '@/layouts/UserLayout.vue'
import ProductCard from '@/components/ProductCard.vue'

import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

const productStore = useProductStore()
const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const searchQuery = ref('')
const filterProducts = computed( () => {
  if (route.query.q) {
    console.log('searchQuery', route.query.q)
    const result = productStore.filterProducts(route.query.q)
    console.log('search result', result)
    return result
  } else {
    return productStore.list
  }
})

const addToCart = (product) => {
  const productInfo = productStore.list.find((item) => item.id === product.id)
  productInfo.quantity = 1
  cartStore.addToCart(productInfo)
}

</script>

<template>
  <UserLayout>
    <ProductCard :productList="filterProducts" :addToCart="addToCart" />
  </UserLayout>
</template>

<style>

</style>
