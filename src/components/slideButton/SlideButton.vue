<template>
  <button
    class="btn"
    :class="{ loading: isLoading, disable:isDisabled }"
    @mouseover="onMouseover"
    @mouseleave="onMouseleave"
  >
    <Spinner v-if="isLoading" />
    <template v-else>
      <span class="btn__txt">
        <slot v-if="!isHover"></slot>
        <span v-if="isHover">{{ hoverText }}</span>
      </span>
      <span v-if="isIcon" class="btn__icon">
        <slot name="btn-icon"></slot>
      </span>
    </template>
  </button>
</template>

<script>
import { Spinner } from '../spinner'

export default {
  name: 'SlideButton',
  components: { Spinner },
  emits: ['onMouseover', 'onMouseleave'],
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
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isDisabled: {
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
  background: #31ae54;
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
    background: #9e9e9e;
  }

  &__icon {
    margin-left: 10px;
  }

  &.disable,
  &[disabled] {
    opacity: 0.8;
    pointer-events: none;
  }

  &.loading {
    .spinner {
      width: 18px;
      height: 18px;
    }
    svg {
      color: #ffffff;
    }
  }
}
</style>
