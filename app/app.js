import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'

Vue.use(BootstrapVue)

export function createApp (ssrContext) {
  const store = createStore()
  const router = createRouter()

  // Sync the router with the vuex store
  // this registers `store.state.route`
  sync(store, router)

  const app = new Vue({
    router,
    store,
    ssrContext,
    render: h => h(App)
  })

  return { app, router, store }
}
