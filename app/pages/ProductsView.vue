<template>
  <v-layout column wrap>
    <v-flex v-for="(product, i) in products"
            :key="i"
            xs12
            sm6
            md4
            lg3>
      <v-card>
        <v-card-media :src="product.image" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          {{ product.name }}
        </v-card-title>
        <v-card-text>
          {{ product.price }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  asyncData ({ store }) {
    return store.dispatch('fetchProducts')
  },

  computed: {
    ...mapGetters(['products'])
  }
}
</script>
