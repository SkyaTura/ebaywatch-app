<template lang="pug">
v-dialog(persistent max-width="600px" :value="value")
  v-card
    v-card-title.title Track prices
    v-form(ref="form")
      v-container.py-0(grid-list-md)
        v-layout(row wrap)
          v-flex(xs12 md6)
            v-text-field(
              required
              label='Name'
              :rules="[v => !!v || 'Name is required']"
              v-model="name"
            )
          v-flex(xs12 md6)
            v-text-field(
              required
              label='Email'
              type="email"
              :rules="[ v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid' ]"
              v-model="email"
            )
          v-flex(xs12)
            v-radio-group(
              required
              label="How often you want to check for updates?"
              :rules="[v => !!v || 'Frequency is required']"
              v-model="frequency"
            )
              v-radio(
                v-for='n in [2, 10, 30]'
                :key='n'
                :label='`${n} minutes`'
                :value='n'
              )
    v-card-actions
      v-spacer
      v-btn(flat @click="$emit('input', false)") Cancel
      v-btn(flat color="primary" @click="submit") Start tracking
</template>

<script>
export default {
  name: 'SubscribeDialog',
  props: {
    value: { type: Boolean, required: true },
    searchString: { type: String, required: true },
  },
  data: () => ({
    name: '',
    email: '',
    frequency: null,
  }),
  watch: {
    value() {
      this.$refs.form.reset()
    },
  },
  methods: {
    async submit() {
      const validation = this.$refs.form.validate()
      if (!validation) return
      try {
        await this.$axios.post('/subscriptions', {
          terms: this.searchString,
          person: this.$data,
        })
        this.$emit('subscribe', this.$data)
        this.$emit('input', false)
        this.$dialog.message.info('Email subscribed succssfully!')
      } catch (e) {
        console.error(e)
        this.$dialog.message.error('Something went wrong, please try again')
      }
    },
  },
}
</script>
