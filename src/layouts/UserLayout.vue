<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'


const isLoggedIn = ref(false)
const router = useRouter()
const route = useRoute()
const searchQuery = ref('')
const cartStore = useCartStore()

const handleSearch = () => {
    if (searchQuery.value) {
        router.push({ name: 'search', query: { q: searchQuery.value } })
    } else {
        router.push({ name: 'home' })
    }
}

const logIn = () => {
    isLoggedIn.value = true
    localStorage.setItem('logInStatus', 'true')

}
const logOut = () => {
    isLoggedIn.value = false
    localStorage.removeItem('logInStatus')
}

let lastScrollY = ref(window.scrollY)
const scrollDirection = ref('')

const handleScroll = () => {
    
    console.log('lastScrollY', lastScrollY.value)
    console.log('window.scrollY', window.scrollY)
    
    window.scrollY < lastScrollY.value ? scrollDirection.value = 'up' : scrollDirection.value = 'down'
    lastScrollY.value = window.scrollY
}


onMounted(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('logInStatus')
    if (token) {
        isLoggedIn.value = true
    } else {
        isLoggedIn.value = false
    }
   
    window.addEventListener('scroll', handleScroll)
    
})
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <div class="w-full max-w-screen-xl mx-auto">
        <div class="flex flex-row" :class="{ 'sticky top-0 z-10': scrollDirection === 'up' }">
            <div class="navbar bg-base-100 shadow-sm">
                <div class="flex-1">
                    <RouterLink to="/">
                        <a class="btn btn-ghost text-xl">
                            <h1 class="text-l font-bold text-secondary ">Ecommy</h1>
                        </a>
                    </RouterLink>
                </div>
                <div class="flex gap-2">
                    <input type="text" v-model="searchQuery" @keyup.enter="handleSearch" placeholder="Search" class="input input-bordered w-24 md:w-auto" />

                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                            <div class="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span class="badge badge-sm indicator-item">{{ cartStore.totalQuantity }}</span>
                            </div>
                        </div>
                    
                        <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                            <div class="card-body">
                                <span class="text-lg font-bold">{{ cartStore.totalQuantity }} Items</span>
                                <span class="text-info">Subtotal: {{ cartStore.totalPrice }}</span>
                                <div class="card-actions">
                                    <RouterLink to="/cart">
                                        <button class="btn btn-primary btn-block">View cart</button>
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>

                        <div v-if="isLoggedIn" class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                                <div class="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component"
                                        src="https://www.svgrepo.com/show/530461/loss.svg" />
                                </div>

                            </div>
                            <ul tabindex="0"
                                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <RouterLink to="/profile">
                                    
                                    <a class="justify-between">
                                        Profile
                                        <span class="badge">New</span>
                                    </a>
                                    </RouterLink>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a @click="logOut">Logout</a></li>
                            </ul>
                        </div>
                        <div v-else class="btn btn-ghost" @click="logIn">
                            Log In
                        </div>
                    </div>
                </div>

            </div>
            <slot></slot>
            <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
                <nav>
                    <h6 class="footer-title">Services</h6>
                    <a class="link link-hover">Branding</a>
                    <a class="link link-hover">Design</a>
                    <a class="link link-hover">Marketing</a>
                    <a class="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 class="footer-title">Company</h6>
                    <a class="link link-hover">About us</a>
                    <a class="link link-hover">Contact</a>
                    <a class="link link-hover">Jobs</a>
                    <a class="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 class="footer-title">Legal</h6>
                    <a class="link link-hover">Terms of use</a>
                    <a class="link link-hover">Privacy policy</a>
                    <a class="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>

</template>