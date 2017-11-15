<template>
  <b-container>
    <b-row>
      <b-col>
        <h5>Products</h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for="(product, i) in products"
             :key="i"
             cols="12"
             sm="6"
             md="4"
             lg="3">
        <Product :name="product.name"
                 :price="product.price"
                 :image="product.image">
        </Product>
      </b-col>
    </b-row>
  </b-container>
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
