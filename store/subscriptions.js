/* eslint no-param-reassign: "off" */

export const state = () => ({
  list: [],
})

export const getters = {
  list: vState =>
    vState.list.map(subscription => {
      const { people } = subscription
      const countTotal = people.length
      const countActive = people.filter(v => v.active).length
      return {
        ...subscription,
        countTotal,
        countActive,
        last: people[countTotal - 1],
      }
    }),
}

export const mutations = {
  updateList(vState, payload) {
    vState.list = JSON.parse(JSON.stringify(payload))
  },
}

export const actions = {
  async fetch({ commit }) {
    const response = await this.$axios.get('/subscriptions')
    commit('updateList', response.data)
  },
  async update({ dispatch }, payload) {
    await this.$axios.put('/subscriptions', payload)
    await dispatch('fetch')
  },
}
