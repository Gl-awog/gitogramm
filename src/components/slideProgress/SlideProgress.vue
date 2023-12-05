<template>
    <div :class="['progress', { 'active': isActive }]">
        <div class="progress__inner" ref="indicator"></div>
    </div>
</template>

<script>
export default {
  name: 'SlideProgress',
  data () {
    return {
      active: this.isActive
    }
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onFinish'],
  methods: {
    emitOnFinish () {
      this.$emit('onFinish')
    }
  },
  async mounted () {
    await this.$nextTick().then(() => {
      setTimeout(() => { this.active = true }, 0)
    })

    this.$refs.indicator.addEventListener('transitionend', this.emitOnFinish)
  },
  beforeUnmount () {
    this.$refs.indicator.removeEventListener('transitionend', this.emitOnFinish)
  }
}
</script>

<style lang="scss">
.progress {
    height: 2px;
    background: rgba(#31AE54, 0.3);
    border-radius: 2px;
    overflow: hidden;
    position: relative;

    &__inner {
        height: 100%;
        background: #31AE54;
        width: 0%;
        position: absolute;
        left: 0;
        top: 0;
    }

    &.active &__inner {
        width: 100%;
        transition: width 5s linear;
    }
}
</style>
