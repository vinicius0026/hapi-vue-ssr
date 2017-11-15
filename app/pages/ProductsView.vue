<template>
  <div>
    <h5>Products</h5>
    <Product v-for="(product, i) in products"
             :key="i"
             :name="product.name"
             :price="product.price"
             :image="product.image">
    </Product>
  </div>
  <!-- <v-layout column wrap>
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
  </v-layout> -->
</template>

<script>
import Product from '../components/Product'
import { mapGetters } from 'vuex'

export default {
  asyncData ({ store }) {
    return store.dispatch('fetchProducts')
  },
  computed: {
    ...mapGetters(['products'])
  },
  components: {
    Product
  }
}
</script>
