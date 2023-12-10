<template>
  <div class="stories-slider">
    <ul class="stories-slider__list" ref="slider">
      <li
        class="stories-slider__item"
        ref="sliderItem"
        :class="{ active: slideActiveIdx === idx }"
        v-for="(item, idx) in trendings"
        :key="item.id"
      >
        <SlideItem
          :isActive="slideActiveIdx === idx"
          :data="getStoryData(item)"
          :btnsShown="activeBtns"
          :isLoading="slideActiveIdx === idx && loading"
          @onNextSlide="handleSlideClick(slideActiveIdx + 1)"
          @onPrevSlide="handleSlideClick(slideActiveIdx - 1)"
          @onProgressFinish="handleSlideClick(slideActiveIdx + 1)"
          @onFollow="starRepo"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { SlideItem } from '../slideItem'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'StoriesSlider',
  components: { SlideItem },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    initialSlide: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      slideActiveIdx: 0,
      sliderPosition: 0,
      loading: false,
      btnsShown: true
    }
  },
  computed: {
    ...mapState({
      trendings: (state) => state.trendings.posts.data
    }),
    activeBtns () {
      if (!this.btnsShown) return []
      if (this.slideActiveIdx === 0) return ['next']
      if (this.slideActiveIdx === this.trendings.length - 1) return ['prev']
      return ['prev', 'next']
    }
  },
  methods: {
    ...mapActions({
      fetchTrendings: 'trendings/fetchTrendings',
      fetchReadme: 'trendings/fetchReadme',
      starRepo: 'trendings/starRepo'
    }),
    getStoryData (obj) {
      return {
        id: obj.id,
        avatar: obj.owner?.avatar_url,
        username: obj.owner?.login,
        readme: obj.readme,
        following: obj.following
      }
    },
    async fetchActiveSlideReadme () {
      const { id, owner, name } = this.trendings[this.slideActiveIdx]
      await this.fetchReadme({ id, owner: owner.login, repo: name })
    },
    moveSlider (slideIdx) {
      const { slider, sliderItem } = this.$refs
      const slideWidth = parseInt(
        getComputedStyle(sliderItem[this.slideActiveIdx]).getPropertyValue(
          'width'
        ),
        10
      )
      this.slideActiveIdx = slideIdx
      this.sliderPosition = -(slideWidth * slideIdx)
      slider.style.transform = `translateX(${this.sliderPosition}px)`
    },
    async loadReadme () {
      this.loading = true
      this.btnsShown = false
      try {
        await this.fetchActiveSlideReadme()
      } catch (e) {
        console.log(e)
        // throw e
      } finally {
        this.loading = false
        this.btnsShown = true
      }
    },
    handleInitialSlide () {
      if (this.initialSlide) {
        const ndx = this.trendings.findIndex(
          (item) => item.id === this.initialSlide
        )

        this.handleSlideClick(ndx)
      }
    },
    async handleSlideClick (slideIdx) {
      if (slideIdx >= 0 && slideIdx < this.$refs.sliderItem.length) {
        this.moveSlider(slideIdx)
        await this.loadReadme()
      }
    }
  },
  async mounted () {
    if (this.trendings.length) {
      this.handleInitialSlide()
    } else {
      await this.fetchTrendings().then(() => {
        this.handleInitialSlide()
      })
    }
    await this.loadReadme()
  }
}
</script>

<style lang="scss">
.stories-slider {
  --slideW: 375px;
  overflow: hidden;
  position: relative;
  height: 667px;

  &__list {
    font-size: inherit;
    display: flex;
    align-items: center;
    width: auto;
    position: absolute;
    left: 50%;
    margin-left: calc(-1 * var(--slideW) / 2);
    transition: all 0.3s;
  }

  &__item {
    background: #ffffff;
    border-radius: 6px;
    width: var(--slideW);
    min-height: 667px;
    flex-shrink: 0;
    display: flex;
    transition: all 0.3s;
    transform: scale(0.87);
    position: relative;

    .slide-item {
      width: 100%;
      display: flex;
      flex-direction: column;

      &__body {
        flex-grow: 1;
      }
    }

    &.active {
      transform: scale(1);
      z-index: 100;
    }
  }

  @media (max-width: 768px) {
    &__list {
      padding: 0 24px;
    }

    &__item {
      width: calc(var(--slideW) - 24px * 2);
    }

    @media (max-width: 360px) {
      --slideW: 360px;
      &__list {
        padding: 0 16px;
      }

      &__item {
        width: calc(var(--slideW) - 16px * 2);
      }
    }

    @media (max-width: 320px) {
      --slideW: 320px;
    }
  }
}
</style>
