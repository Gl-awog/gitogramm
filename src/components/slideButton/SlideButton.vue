<template>
  <button class="btn" @mouseover="onMouseover" @mouseleave="onMouseleave">
    <span class="btn__txt">
      <slot v-if="!isHover"></slot>
      <span v-if="isHover">{{ hoverText }}</span>
    </span>
    <span v-if="isIcon" class="btn__icon">
      <slot name="btn-icon"></slot>
    </span>
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
    },
    isIcon: {
      type: Boolean,
      default: false
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

  &__icon {
    margin-left: 10px;
  }

  &:disabled,
  &[disabled] {
    opacity: 0.8;
  }
}
</style>
