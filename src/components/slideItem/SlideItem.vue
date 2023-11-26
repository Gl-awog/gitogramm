<template>
    <article class="slide-item">
        <div class="slide-item__progress">
            <SlideProgress></SlideProgress>
        </div>
        <div class="slide-item__user">
            <User :username="username" :avatar="avatar" />
        </div>
        <div class="slide-item__body">
            <slot></slot>
        </div>
        <div class="slide-item__btn">
            <SlideButton>Follow</SlideButton>
        </div>
    </article>
</template>

<script>
import { User } from '../user'
import { SlideProgress } from '../slideProgress'
import { SlideButton } from '../slideButton'

export default {
  name: 'SlideItem',
  components: { SlideProgress, SlideButton, User },
  props: {
    avatar: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.slide-item {
    &__body {
        border-top: 1px solid #CACACA;
        border-bottom: 1px solid #CACACA;
        min-height: 100px;
    }

    &__user {
        padding: 12px 12px;

        .user {
            display: flex;
            align-items: center;

        }

        .user__avatar {
            width: 32px;
            height: 32px;
        }

        .user__name {
            font-weight: 700;
            font-size: 14px;
            margin-left: 8px;
        }
    }

    &__btn {
        padding: 24px 16px;
        display: flex;
        justify-content: center;

        .btn {
            max-width: 270px;
            width: 100%;
        }
    }
}
</style>
