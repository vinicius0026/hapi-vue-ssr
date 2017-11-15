import Vue from 'vue'
import Router from 'vue-router'

// The meta data for routes
const meta = require('./meta.json')

// Function to create routes
// Is lazy by default but can be changed
function route (path, view) {
  return {
    path: path,
    meta: meta[path],
    component: () => import(`pages/${view}View.vue`)
  }
}

Vue.use(Router)

export function createRouter () {
    const router = new Router({
      base: __dirname,
      mode: 'history',
      scrollBehavior: () => ({ y: 0 }),
      routes: [
        route('/', 'Home'),
        route('/about', 'About'),
        route('/products', 'Products'),
        // Global redirect for 404
        { path: '*', redirect: '/' }
      ]
    })

    // Send a pageview to Google Analytics
    router.beforeEach((to, from, next) => {
        if (typeof ga !== 'undefined') {
            ga('set', 'page', to.path)
            ga('send', 'pageview')
        }
        next()
    })

    return router
}
