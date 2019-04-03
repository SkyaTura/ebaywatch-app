import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    // Stores that should be persisted in the front-end
    modules: [],
  }).plugin(store)
}
