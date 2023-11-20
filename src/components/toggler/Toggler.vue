<template>
    <button :class="['button', { 'active': isOpened }]" @click="toggleBtn">
        <span class="text" v-if="!isOpened">View issues</span>
        <span class="text" v-if="isOpened">Hide issues</span>
        <span class="icon">
            <Icon name="Arrow" />
        </span>
    </button>
</template>

<script>
import { Icon } from '../../icons'

export default {
  name: 'Toggler',
  components: {
    Icon
  },
  data () {
    return {
      isOpened: false
    }
  },
  methods: {
    toggleBtn () {
      this.isOpened = !this.isOpened
      this.$emit('onToggle', this.isOpened)
    }
  }
}
</script>

<style lang="scss">
.button {
    display: flex;
    align-items: center;
    padding: 0;
    background:none;
    border:none;
    width:100px;
    font-size:14px;

    .icon {
        width: 10px;
        transform: rotate(180deg);
        margin-left: 4px;
        transform-origin: 50% 50%;
        transition:transform 0.3s;
        height: 6px;
        display: flex;
    }

    &.active .icon {
        transform: rotate(0deg);
    }
}
</style>
