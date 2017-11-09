<template>
  <v-card>
    <v-card-title><h6>Features</h6></v-card-title>
    <v-list>
      <v-list-tile v-for="(feature, i) in features" :key="i">
        <v-list-tile-content>
          <v-list-tile-title>
            {{ feature }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
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
