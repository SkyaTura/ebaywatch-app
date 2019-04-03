<template lang="pug">
  v-navigation-drawer(app, :dark="$vuetify.dark", v-bind="drawer", @input="toggleSetting({ path: 'drawer.value', value: $event })")
    v-toolbar.transparent(flat)
      v-toolbar-title
        BrandLogo
    v-list
      v-list-tile(v-for="(item, i) in drawer.items" :to="item.to" :key="i" router exact)
        v-list-tile-action
          v-icon(v-html="item.icon")
        v-list-tile-content
          v-list-tile-title(v-text="item.title")
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import BrandLogo from './BrandLogo'

export default {
  name: 'MainDrawer',
  components: { BrandLogo },
  computed: mapState({
    drawer: state => state.vuetify.drawer,
  }),
  methods: {
    ...mapMutations({ toggleSetting: 'vuetify/toggle' }),
  },
}
</script>
