<template lang="pug">
  v-bottom-nav(
    app,
    fixed,
    :active="active",
    :value="isRootPage",
    v-bind="bottombar"
  )
    v-btn(
      v-for="item in bottombar.items",
      v-bind="bottombar.buttonProps",
      :to="item.to",
      :key="item.to",
      :value="item.to"
    )
      span {{ item.text }}
      v-icon {{ item.icon }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainBottombar',
  computed: {
    active() {
      return this.$route.path
    },
    isRootPage() {
      return this.$route.path.split('/').length <= 2
    },
    ...mapState({
      bottombar: state => state.vuetify.bottombar,
    }),
  },
}
</script>
