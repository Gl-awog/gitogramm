<template>
    <button class="btn" @mouseover="onMouseover" @mouseleave="onMouseleave">
        <slot v-if="!isHover"></slot>
        <span v-if="isHover">{{ hoverText }}</span>
    </button>
</template>

<script>
export default {
  name: 'SlideButton',
  emits: [
    'onMouseover', 'onMouseleave'
  ],
  data () {
    return {
      isHover: false
    }
  },
  props: {
    hoverText: {
      type: String,
      default: 'hoverText'
    }
  },
  methods: {
    onMouseover () {
      this.isHover = true
      this.$emit('onMouseover', this.isHover)
    },
    onMouseleave () {
      this.isHover = false
      this.$emit('onMouseleave', this.isHover)
    }
  }
}
</script>

<style lang="scss">
.btn {
    height: 44px;
    background: #31AE54;
    border-radius: 6px;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #ffffff;
    min-width: 100px;
    padding: 0 16px;
    cursor: pointer;

    &:hover {
        background: #9E9E9E;
    }
}
</style>
