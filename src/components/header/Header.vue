<template>
  <header class="g-header">
    <div class="g-container">
      <div class="topline">
        <slot name="topline"></slot>
      </div>
      <div class="bottomline" v-if="$slots.headerContent">
        <slot name="headerContent"></slot>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
.g-header {
  padding: 34px 0;
}
</style>
