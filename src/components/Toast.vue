<script setup>
import { ref } from 'vue'

defineProps({
    message: {
        type: String,
        default: 'This is a toast message'
    },
    status: {
        type: String,
        default: 'success'
    }
})

</script>

<template>
    <transition enter-active-class="transition-opacity duration-500" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-500"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div class="toast">
        <div :class="`alert alert-${status}`">
            <span>{{ message }} </span>
        </div>
    </div>
    </transition>
</template>