<template>
  <div>
    <h1>Home</h1>
    <router-link to="/about">go to about</router-link>
    <Hello></Hello>
  </div>
</template>

<script>
import Hello from '../components/Hello'

export default {
  components: {
    Hello
  }
}
</script>
