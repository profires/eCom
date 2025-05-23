<script setup>
import { onMounted, onUnmounted  } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { useCartStore } from '@/stores/cart'
import Toast from '@/components/Toast.vue'

const eventStore = useEventStore()
const cartStore = useCartStore()

onMounted(() => {

    cartStore.cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
})

onUnmounted(() => {
    localStorage.setItem('cart', JSON.stringify(cartStore.cart))
})    

</script>

<template>
<Toast v-if="eventStore.alert" :message="eventStore.data.message" :status="eventStore.data.status" />

  <RouterView />
</template>

<style scoped>

</style>
