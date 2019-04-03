<template lang="pug">
v-flex(xs12 align-self-stretch v-else)
  v-layout(fill-height align-center justify-center)
    div.text-xs-center
      slot
</template>

<script>
export default {
  name: 'ResultMessage',
}
</script>
