import Vue from 'vue'
import Vuex from 'vuex'
import { fetch as fetchProducts } from '../services/products'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      products: []
    },
    actions: {
      fetchProducts ({ commit }) {
        return fetchProducts()
          .then(products => {
            commit('setProducts', products)
          })
      }
    },
    mutations: {
      setProducts (state, products) {
        state.products = products
      }
    },
    getters: {
      products: state => state.products
    }
  })
}
