<template>
    <div class="topline">
        <Logo />
        <div class="topline__navbar">
            <span class="icon topline__navbar-icon" @click="$router.push('/')">
                <Icon name="Home" />
            </span>
            <span class="topline__navbar-icon"><img :src="avatar" /></span>
            <span class="icon topline__navbar-icon" @click="$emit('onLogout')">
                <Icon name="Logout" />
            </span>
        </div>
    </div>
</template>

<script>
import { Logo } from '../logo'
import { Icon } from '../../icons'

export default {
  name: 'Topline',
  components: {
    Logo,
    Icon
  },
  emits: ['onLogout'],
  props: {
    avatar: {
      type: String,
      default: '/avatar/avatar1.png',
      required: false
    }
  },
  data () {
    return {
      imgHost: location.origin
    }
  }
}
</script>

<style lang="scss">
.topline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;

    &__navbar {
        margin-left: auto;
        display: flex;
        gap: 24px;

        &-icon {
            width: 32px;

            img,
            svg {
                max-width: 100%;
            }

            &.icon {
              cursor: pointer;
            }
        }
    }

    @media (max-width:425px) {

        .logo {
            width: 100px;
        }

        &__navbar {
            gap: 8px;
        }
    }
}
</style>
