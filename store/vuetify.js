export const state = () => ({
  ui: {
    darkTheme: true,
    navigationDrawer: true,
    navigationDrawerMini: false,
  },
  drawer: {
    value: null,
    temporary: true,
    miniVariant: false,
    items: [
      { icon: 'search', title: 'Search products', to: '/' },
      { icon: 'trending_up', title: 'Tracked prices', to: '/tracking' },
      // { icon: 'info_outline', title: 'About eMiolo.com', to: '/about' },
    ],
  },
  toolbar: {
    dark: false,
    fixed: true,
    clippedLeft: true,
    color: 'white',
    icons: {
      drawer: true,
      drawerMiniVariant: true,
    },
  },
})

export const mutations = {
  // eslint-disable-next-line
  toggle(state, payload) {
    if (!['string', 'object'].includes(typeof payload))
      throw new Error('Invalid payload type')
    const path = typeof payload === 'string' ? payload : payload.path
    const newValue = typeof payload === 'string' ? undefined : payload.value
    if (!path) throw new Error('Invalid path parameter')
    const pathElements = path.split('.')
    const pathCount = pathElements.length
    // eslint-disable-next-line
    pathElements.reduce((acc, key, index) => {
      if (index < pathCount - 1) return acc[key]
      acc[key] = typeof newValue !== 'undefined' ? !!newValue : !acc[key]
    }, state)
  },
}
