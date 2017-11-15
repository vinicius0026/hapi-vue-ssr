<template>
  <div>
    <h6>Features</h6>
    <ul>
      <li v-for="(feature, i) in features" :key="i">{{ feature }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      features: [
        'Hot Reloading',
        'Single File Components',
        'Data pre-fetch',
        'Configurable meta attributes (title, description and keywords)',
        'Material design via Vuetify lib'
      ]
    }
  }
}
</script>
