<template lang="pug">
  .brandLogo
    span.brandLogo-red e
    span.brandLogo-blue B
    span.brandLogo-yellow a
    span.brandLogo-green y
    span.brandLogo-grey watch
</template>

<script>
export default {
  name: 'BrandLogo',
}
</script>

<style lang="sass" scoped>
.brandLogo
  font:
    weight: bold
  text-shadow: 0 1px 1px rgba(0,0,0,.1)
  &-red
    color: #e43237
  &-blue
    color: #0363d1
  &-yellow
    color: #f4ae01
  &-green
    color: #85b816
  &-grey
    color: #767676
    font:
      weight: 400
</style>
