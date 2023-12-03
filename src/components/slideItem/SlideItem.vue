<template>
    <article class="slide-item" :class="{ 'active': isActive }">
        <div class="slide-item__progress">
            <SlideProgress :active="isActive" />
        </div>
        <div class="slide-item__user">
            <!-- <User :username="username" :avatar="avatar" /> -->
            <User :username="data.username" :avatar="data.avatar" />
        </div>
        <div class="slide-item__body">
            <div class="slide-item__loading" v-if="isLoading">
                <Spinner />
            </div>
            <div class="slide-item__content" v-else>
                <div class="slide-item__content-loaded" v-if="data.content?.length">
                    {{ data.content }}
                </div>
                <Placeholder v-else :paragraphs="2" />
            </div>
        </div>
        <div class="slide-item__btn">
            <SlideButton>Follow</SlideButton>
        </div>
        <nav class="slide-item__nav" v-if="isActive">
            <div class="slide-item__nav-prev">&lt;</div>
            <div class="slide-item__nav-next">&gt;</div>
        </nav>
    </article>
</template>

<script>
import { User } from '../user'
import { SlideProgress } from '../slideProgress'
import { SlideButton } from '../slideButton'
import { Spinner } from '../spinner'
import { Placeholder } from '../placeholder'

export default {
  name: 'SlideItem',
  components: { SlideProgress, SlideButton, User, Spinner, Placeholder },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean
    },
    data: {
      type: Object,
      required: true,
      default: () => ({})
    },
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
    padding: 8px 0;
    position: relative;

    &__body {
        border-top: 1px solid #CACACA;
        border-bottom: 1px solid #CACACA;
        min-height: 100px;
        padding: 18px 18px;
        box-sizing: border-box;
    }

    &__progress {
        padding: 0 8px;
    }

    &__loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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
        min-height: 100px;
        box-sizing: border-box;

        .btn {
            max-width: 270px;
            width: 100%;
        }
    }

    &__nav {
        position: absolute;
        top: 50%;
        width: calc(100% + 56px * 2);
        left: 50%;
        transform: translate(-50%, -50%);
        height: 36px;

        &-next,
        &-prev {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #ffffff;
            border: 2px solid #000000;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            user-select: none;
            cursor: pointer
        }

        &-prev {
            left: 0;
            top: 0;
        }

        &-next {
            right: 0;
            top: 0;
        }
    }
}
</style>
