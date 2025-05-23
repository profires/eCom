import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [ 
      { id: 1, name: "Apple", price: 1.99 },
      { id: 2, name: "Banana", price: 0.99 },
      { id: 3, name: "Cherry", price: 2.49 },
      { id: 4, name: "Date", price: 3.99 },
      { id: 5, name: "Elderberry", price: 4.99 },
      { id: 6, name: "Fig", price: 2.99 },
      { id: 7, name: "Grape", price: 2.19 },
      { id: 8, name: "Honeydew", price: 3.59 },
      { id: 9, name: "Kiwi", price: 1.79 },
      { id: 10, name: "Lemon", price: 0.79 }
    ]
  }),
  actions: {
    filterProducts(searchName) {
      // Filter the list of products based on the search name
      return this.list.filter((product) => {
        return product.name.toLowerCase().includes(searchName.toLowerCase())
      })
    }
    
  }

  
}
) 
