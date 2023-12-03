<template>
    <div class="spinner">
        <Icon name="Spinner" />
    </div>
</template>

<script>
import { Icon } from '../../icons'

export default {
  name: 'Spinner',
  components: {
    Icon
  }
}
</script>

<style lang="scss">
    .spinner {
        width:40px;
        height: 40px;
        position:relative;
        color:#31AE54;
        animation:spinner-rotate 2s infinite linear;

        svg {
            width:100%;
            height:100%;
        }
    }

    @keyframes spinner-rotate {
        0% {
            transform:rotate(0deg)
        }
        100% {
            transform:rotate(360deg)
        }
    }
</style>
