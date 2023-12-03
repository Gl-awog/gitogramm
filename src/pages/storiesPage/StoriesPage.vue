<template>
    <div class="st-page">
        <Header>
            <template #s-topline>
                <div class="toprow">
                    <Logo />
                    <button class="toprow__close" @click="$router.push('/')">
                        <Icon name="Close" />
                    </button>
                </div>
            </template>
        </Header>
        <main class="g-main">
            <StoriesSlider />
        </main>
    </div>
</template>

<script>
import { Header } from '@/components/header'
import { Logo } from '@/components/logo'
import { Icon } from '../../icons'
import { StoriesSlider } from '@/components/storiesSlider'

export default {
  name: 'StoriesPage',
  components: {
    Header,
    Logo,
    Icon,
    StoriesSlider
  }
}
</script>

<style lang="scss">
.st-page {
    min-height: 100vh;
    background: #101010;

    .g-header {
        background-color: transparent;

        svg {
            color: #ffffff;
        }
    }

    .toprow {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__close {
            background-color: transparent;
            border: none;
        }
    }
}
</style>
