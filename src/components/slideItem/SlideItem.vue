<template>
  <article class="slide-item" :class="{ active: isActive }">
    <div class="slide-item__progress">
      <SlideProgress
        :isActive="isActive && !isLoading"
        @onFinish="$emit('onProgressFinish')"
      />
    </div>
    <div class="slide-item__user">
      <User :username="data.username" :avatar="data.avatar" />
    </div>
    <div class="slide-item__body">
      <div class="slide-item__loading" v-if="isLoading">
        <Spinner />
      </div>
      <div class="slide-item__content" v-else>
        <div
          class="slide-item__content-loaded"
          v-if="data.readme"
          v-html="data.readme"
        ></div>
        <Placeholder v-else :paragraphs="2" :isImg="true" />
      </div>
    </div>
    <div class="slide-item__btn">
      <SlideButton
        :hoverText="data.following.status ? 'Unfollow':'Follow'"
        :isLoading="data.following.loading"
        :isDisabled="data.following.loading"
        @click="$emit(data.following.status ? 'onUnFollow':'onFollow', data.id)"
        >{{data.following.status ? 'Unfollow':'Follow'}}
      </SlideButton>
    </div>
    <nav class="slide-item__nav" v-if="isActive">
      <div
        class="slide-item__nav-prev"
        v-if="btnsShown.includes('prev')"
        @click="$emit('onPrevSlide')"
      >
        <Icon name="SlideArrow" />
      </div>
      <div
        class="slide-item__nav-next"
        v-if="btnsShown.includes('next')"
        @click="$emit('onNextSlide')"
      >
        <Icon name="SlideArrow" />
      </div>
    </nav>
  </article>
</template>

<script>
import { User } from '../user'
import { SlideProgress } from '../slideProgress'
import { SlideButton } from '../slideButton'
import { Spinner } from '../spinner'
import { Placeholder } from '../placeholder'
import { Icon } from '../../icons'

export default {
  name: 'SlideItem',
  components: { SlideProgress, SlideButton, User, Spinner, Placeholder, Icon },
  emits: ['onPrevSlide', 'onNextSlide', 'onProgressFinish', 'onFollow'],
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean
    },
    btnsShown: {
      type: Array,
      default: () => ['prev', 'next'],
      validator (value) {
        return value.every((item) => item === 'next' || item === 'prev')
      }
    },
    data: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss">
.slide-item {
  padding: 8px 0;

  &.active {
    position: relative;
  }

  &__body {
    border-top: 1px solid #cacaca;
    border-bottom: 1px solid #cacaca;
    min-height: 100px;
    padding: 18px 18px;
    box-sizing: border-box;
    max-height: 500px;
    overflow: hidden;
    overflow-y: auto;
    text-align: left;
  }

  &__content {
    h1 {
      font-size: 24px;
      text-align: center;
    }
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
    z-index: 1;

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
      cursor: pointer;

      svg:hover {
        color: #31ae54;
      }
    }

    &-prev {
      left: 0;
      top: 0;
    }

    &-next {
      right: 0;
      top: 0;

      svg {
        transform: rotate(-180deg);
      }
    }
  }

  @media (max-width: 768px) {
    &__nav {
      width: calc(100% + 18px * 2);
    }
  }
}
</style>
