<script setup>

defineProps({
    productList: {
        type: Array,
        required: true
    },
    addToCart: {
        type: Function,
        required: true
    }
})
</script>

<template>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 mx-8 gap-4">
      <div v-for="product in productList" class=" card bg-base-100 w-full max-w-80 shadow-sm" :key="product.id">
        <figure>
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{product.name}}</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" @click="addToCart(product)">Buy Now</button>
          </div>
        </div>
      </div>
</div>
</template>