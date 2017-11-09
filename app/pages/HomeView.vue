<template>
  <v-layout column
            justify-center
            align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title primary-title>
          <h5>Vue.js SSR with Hapi.js server</h5>
        </v-card-title>
        <Features></Features>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Features from '../components/Features'

export default {
  components: {
    Features
  }
}
</script>
