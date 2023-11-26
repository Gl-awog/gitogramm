<template>
  <header class="g-header">
    <div class="g-container">
      <slot name="s-topline"></slot>
      <div class="bottomline" v-if="$slots['s-bottomline']">
        <slot name="s-bottomline"></slot>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped></style>
