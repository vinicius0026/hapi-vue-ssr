<template>
  <b-card :title="name"
          :img-src="image"
          :img-alt="name"
          class="mb-2">
    <p class="card-text">{{ price }}</p>
  </b-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>
