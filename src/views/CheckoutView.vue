<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
<UserLayout>
    <div class="flex flex-col md:flex-row gap-6 mx-8 my-10">
        <div class="flex-1">
            <h1>Checkout</h1>
        </div>
        <div class="md:w-96 w-full bg-base-200 p-6 ml-6 rounded-box shadow">
            <h2>Order Summary</h2>
            <div class="space-y-2 flex flex-col gap-2">
                <div v-for="item in cartStore.cart" :key="item.id" class="flex-auto pb-2">
                    <div class="flex flex-row items-center gap-4">
                        <img class="rounded-lg w-1/2" :src="item.imgUrl" />
                        <div class="flex flex-col gap-2 w-1/4">
                            <div>{{ item.name }}</div>
                            <div>{{ item.price }}</div>
                            <div>Quantity: {{ item.quantity }}</div>
                        </div>
                    </div>
                </div>
                <div class="flex-auto">
                    <div class="flex flex-col items-center gap-4 ">
                        <div class="flex flex-col gap-2 w-full ">
                            <div class="flex flex-row gap-2 justify-between">
                            <div>Subtotal:</div>
                            <div>{{ cartStore.totalPrice }}</div>
                            </div>
                            <div class="flex flex-row gap-2 justify-between">
                            <div>Shipping:</div>
                            <div>{{ cartStore.shippingPrice }}</div>
                            </div>
                        </div>
                        <div class="divider divider-neutral"></div>
                        <div class="flex flex-col gap-2 w-full">
                            <div class="flex flex-row gap-2 justify-between">
                            <div>Total:</div>
                            <div>{{ cartStore.totalPrice + cartStore.shippingPrice }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</UserLayout>
</template>