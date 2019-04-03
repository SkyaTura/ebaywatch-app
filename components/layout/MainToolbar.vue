<template lang="pug">
  v-toolbar(app, :flat="offsetTop < 10" v-bind="toolbar" v-scroll="onScroll")
    template(v-if="hasDrawer && toolbar.icons.drawer")
      v-toolbar-side-icon(@click="toggleSetting('drawer.value')")
    v-toolbar-title
      BrandLogo
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import BrandLogo from './BrandLogo'

export default {
  name: 'MainToolbar',
  components: { BrandLogo },
  props: {
    hasDrawer: { type: Boolean, default: false },
  },
  data: () => ({
    offsetTop: 0,
  }),
  computed: mapState({
    drawer: state => state.vuetify.drawer,
    toolbar: state => state.vuetify.toolbar,
  }),
  methods: {
    ...mapMutations({ toggleSetting: 'vuetify/toggle' }),
    onScroll() {
      this.offsetTop = window.scrollY
    },
  },
}
</script>
