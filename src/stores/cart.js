import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: []
    }),
    getters: {

        totalQuantity: (state) => state.cart.reduce((total, item) => total + Number(item.quantity), 0),
        totalPrice: (state) => state.cart.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0),
        shippingPrice: (state) => state.cart.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0) * 0.1,
    },
    actions: {
        addToCart(product) {
            const existingProduct = this.cart.find((item) => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                this.cart.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        removeFromCart(product) {
            this.cart.splice(this.cart.indexOf(product), 1);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        updateCart(product) {
            this.cart.splice(this.cart.indexOf(product), 1, product);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        updateQuantity(product, quantity) {
            const existingProduct = this.cart.find((item) => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        clearCart() {
            this.cart = [];
            localStorage.removeItem('cart');
        }
    },
});