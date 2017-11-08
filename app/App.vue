<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Meta from './mixins/meta'

export default {
  mixins: [Meta]
}
</script>

<style lang="stylus">
@import './stylus/main'
</style>
