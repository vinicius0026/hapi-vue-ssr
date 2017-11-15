<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Navbar</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-for="(link, i) in links"
                      :key="i"
                      :to="link.to">
            {{ link.title }}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Meta from './mixins/meta'

export default {
  mixins: [Meta],

  data () {
    return {
      links: [
        { icon: 'apps', title: 'Home', to: '/' },
        { icon: 'shopping_basket', title: 'Products', to: '/products' },
        { icon: 'bubble_chart', title: 'About', to: '/about' }
      ]
    }
  }
}
</script>

<style lang="stylus">
@import './stylus/main'
</style>
