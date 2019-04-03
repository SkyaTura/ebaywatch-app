<template lang="pug">
v-container
  SubscriptionDialog(:value="subscriptions[active] || false" @input="openDialog")
  v-layout(justify-center)
    v-flex(xs12 sm10 md6)
      v-card.mb-2(v-for="(subscription, i) in subscriptions" :key="subscription.terms")
        v-card-title.subheading
          span.font-weight-bold Search terms:&nbsp;
          span  {{ subscription.terms }}
        v-layout(row wrap align-center)
          v-flex(xs12 md7)
            v-card-text
              .body-2 {{ subscription.countActive }} active subscriptions
              v-layout(row wrap v-if="subscription.last")
                span.text-no-wrap Last subscription:&nbsp;
                span.text-no-wrap {{ subscription.last.email }}
          v-spacer
          .shrink
            v-card-actions
              v-btn(flat color="primary" @click="openDialog(i)") Manage subscriptions
</template>

<script>
import { mapGetters } from 'vuex'
import SubscriptionDialog from '~/components/subscriptions/SubscriptionDialog.vue'

export default {
  components: { SubscriptionDialog },
  fetch: async ({ store }) => {
    await store.dispatch('subscriptions/fetch')
  },
  data: () => ({
    active: false,
  }),
  computed: {
    ...mapGetters({
      subscriptions: 'subscriptions/list',
    }),
  },
  methods: {
    openDialog(index) {
      this.active = index
    },
  },
}
</script>

<style lang="sass" scoped>

</style>
