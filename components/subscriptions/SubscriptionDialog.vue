<template lang="pug">
v-dialog(max-width="600px" :value="!!value" @input="close")
  v-card(v-if="!!value")
    v-card-title.title Track prices for "{{ value.terms }}"
    v-card-text
      p Users subscription list:
      v-list(two-line)
        v-list-tile(v-for="person in value.people" :key="person.email")
          v-list-tile-content
            v-list-tile-title {{ person.name }}
            v-list-tile-sub-title.grey--text.text--darken-1 {{ person.email }}
          v-list-tile-action
            v-layout(align-center)
              v-spacer
              v-select.frequencySelect(
                label="Frequency"
                v-if="person.active"
                :value="person.frequency"
                :items="frequencies"
                @input="update(person, 'frequency', $event)"
              )
              v-btn.ml-2(
                icon
                flat
                :color="`grey darken-${person.active ? 4 : 1}`"
                @click="update(person, 'active', !person.active)"
              )
                v-icon {{ person.active ? 'notifications' : 'notifications_off' }}
    v-card-actions
      v-spacer
      v-btn(flat @click="close") Close
</template>

<script>
export default {
  name: 'SubscriptionDialog',
  props: {
    value: { type: [Object, Boolean], required: true },
  },
  data: () => ({
    frequencies: [
      { value: 2, text: '2 minutes' },
      { value: 10, text: '10 minutes' },
      { value: 30, text: '30 minutes' },
    ],
  }),
  methods: {
    close() {
      this.$emit('input', false)
    },
    async update(person, key, value) {
      const { terms } = this.value
      const payload = {
        terms,
        email: person.email,
        data: { [key]: value },
      }
      try {
        this.$store.dispatch('subscriptions/update', payload)
        this.$dialog.message.info('Option saved sucessfully')
      } catch (e) {
        console.error(e)
        this.$dialog.message.error('Something went wrong, please try again')
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.frequencySelect
  width: 120px
</style>
