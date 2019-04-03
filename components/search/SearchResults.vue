<template lang="pug">
v-flex.searchResults(xs12)
  .px-1.body-1.grey--text.darken-3 Showing {{ shownProducts.length }} products of {{ count }} found in eBay.com
  v-divider
  v-layout
    v-tooltip(top color="white")
      v-btn(flat color="primary" slot="activator" @click="$emit('track')")
        v-icon trending_up
        span.mx-2 Track Prices
        v-icon.grey--text.darken-2 info_outline
      span.black--text Monitor the lowest price for this search, and receive price alerts by email
  v-card.my-3(v-for="product in shownProducts" :key="product.href")
    v-layout(row wrap)
      v-flex.py-0(xs12 sm3)
        v-img.ma-2(contain :src="product.thumbnail" :aspect-ratio="1")
      v-flex.pa-2(xs12 sm9)
        v-layout(column fill-height)
          v-flex
            a.primary--text.title.productName(target="_blank" :href="product.href") {{ product.title }}
            .body-1 {{ product.subtitle }}
          v-spacer
          v-flex
            v-layout(row wrap)
              v-flex(xs12 sm6)
                .title.font-weight-bold {{ product.price }}
                div {{ product.purchaseOptions }}
                div(v-if="product.bids") {{ product.bids }} lances
                div {{ product.shipping }}
                div.font-weight-bold(v-for="hotness in product.hotness") {{ hotness }}
              v-flex(xs12 sm6)
          v-spacer
</template>

<script>
export default {
  name: 'SearchResults',
  props: {
    resultCount: { type: String, required: true },
    products: { type: Array, required: true },
  },
  computed: {
    shownProducts() {
      return this.products.filter((_, i) => i < 6)
    },
    count() {
      return this.resultCount.split(' ')[0]
    },
  },
}
</script>

<style lang="sass" scoped>
.productName
  text-decoration: none
</style>
