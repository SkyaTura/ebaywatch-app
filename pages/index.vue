<template lang="pug">
v-container.pt-2(fill-height)
  v-layout(justify-center fill-height)
    v-flex(xs12 sm10 md8)
      v-layout(row wrap pb-2 align-start justify-center fill-height)
        v-flex(xs12)
          v-card.transparent(flat)
            SearchField.pb-0(v-model="searchString")
              template(slot="append")
                v-btn(icon flat color="grey darken-1")
                  v-icon settings
          v-layout.py-2(v-if="searchResult.related.length" row wrap align-center justify-center)
            span Related:&nbsp;
            v-chip.suggestionChip(
              small
              v-for="suggestion in searchResult.related"
              :key="suggestion"
              @click="(searchString = suggestion) & search()"
            ) {{ suggestion }}
        ResultMessage(v-if="loading")
          v-progress-circular(indeterminate :size="150" :width="8" color="grey")
            v-icon.messageIcon.loadingIcon search
        SearchResults.pt-2(v-else-if="searchResult.products.length" v-bind="searchResult" @track="trackDialog = true")
        ResultMessage(v-else-if="searchString === ''")
          v-icon.messageIcon.grey--text.darken-3 info_outline
          .headline.font-weight-bold.grey--text.darken-2 Search for anything you want to buy
        ResultMessage(v-else)
          v-icon.messageIcon.grey--text.darken-3 sentiment_dissatisfied
          .headline.font-weight-bold.grey--text.darken-2 No results was found
          .title.grey--text.darken-2 Try a different term
  SubscribeDialog(v-model="trackDialog" :searchString="searchString")

</template>

<script>
import ResultMessage from '~/components/search/ResultMessage.vue'
import SearchResults from '~/components/search/SearchResults.vue'
import SearchField from '~/components/search/SearchField.vue'
import SubscribeDialog from '~/components/search/SubscribeDialog.vue'

const resultModel = () => ({
  resultCount: '',
  products: [],
  related: [],
})
export default {
  components: { ResultMessage, SearchResults, SearchField, SubscribeDialog },
  data: () => ({
    searchString: '',
    searchResult: resultModel(),
    loading: false,
    trackDialog: false,
  }),
  watch: {
    searchString: 'search',
  },
  created() {
    this.search()
  },
  methods: {
    async search() {
      const { searchString } = this
      this.loading = true
      this.searchResult = resultModel()

      try {
        if (searchString !== '') {
          const response = await this.$axios.get('/ebay/search', {
            params: { q: searchString },
          })
          this.searchResult = response.data
        }
      } catch (e) {
        console.error(e)
      }

      this.loading = false
    },
  },
}
</script>

<style lang="sass" scoped>
.suggestionChip
  margin: 2px 1px
.messageIcon
  font-size: 80px
.loadingIcon
  animation: blink 1s alternate infinite
  color: black
  font-size: 64px
@keyframes blink
  from
    opacity: .1
  to
    opacity: .6
</style>
