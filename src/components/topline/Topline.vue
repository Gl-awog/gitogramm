<template>
    <div class="topline">
        <!-- <div class="g-container"> -->
            <Logo />
            <div class="topline-navbar">
                <span class="icon topline-navbar-icon" href="">
                    <Icon name="Home" />
                </span>
                <span class="topline-navbar-icon"><img src="/avatar/avatar1.png" /></span>
                <span class="icon topline-navbar-icon" href="">
                    <Icon name="Logout" />
                </span>
            <!-- </div> -->
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
  }
}
</script>

<style lang="scss" scoped>
.topline  {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.topline {
    margin: 10px 0;
}

.topline-navbar {
    margin-left: auto;
    display: flex;
    gap: 24px;
    &-icon {
        width: 32px;
        img, svg {
            max-width: 100%;
        }
    }
}
</style>
