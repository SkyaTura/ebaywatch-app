<template>
  <v-text-field
    v-model="searchString"
    solo
    hide-details
    label="Search products..."
    prepend-inner-icon="search"
  >
    <slot/>
    <slot 
      slot="append" 
      name="append"/>
  </v-text-field>
</template>

<script>
import debounce from 'debounce'

export default {
  name: 'SearchField',
  props: {
    value: { type: String, required: true },
    debounce: { type: Number, default: 500 },
  },
  data: () => ({
    searchString: '',
  }),
  watch: {
    value: 'syncValue',
    searchString() {
      this.debouncedEmit()
    },
  },
  created() {
    this.syncValue()
    this.debouncedEmit = debounce(this.emitValue, this.debounce)
  },
  methods: {
    emitValue() {
      const { searchString, value } = this
      if (searchString === value) return
      this.$emit('input', searchString)
    },
    syncValue() {
      const { searchString, value } = this
      if (searchString === value) return
      this.searchString = value
    },
  },
}
</script>
