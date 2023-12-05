<template>
  <div class="stories-slider">
    <ul class="stories-slider__list" ref="slider">
      <li class="stories-slider__item" ref="sliderItem" :class="{ 'active': slideActiveIdx === idx }" v-for="(item, idx) in trendings"
        :key="item.id">
        <SlideItem :isActive="slideActiveIdx === idx"
        :data="getStoryData(item)"
        :btnsShown="activeBtns"
        :isLoading="slideActiveIdx === idx && loading"
        @onNextSlide="handleSlideClick(slideActiveIdx + 1)"
        @onPrevSlide="handleSlideClick(slideActiveIdx - 1)"
        @onProgressFinish="handleSlideClick(slideActiveIdx + 1)"
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
    }
    // initialSlide: {
    //   type: Number,
    //   default:0
    // }
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
      fetchReadme: 'trendings/fetchReadme'
    }),
    getStoryData (obj) {
      return {
        id: obj.id,
        avatar: obj.owner?.avatar_url,
        username: obj.owner?.login,
        readme: obj.readme
      }
    },
    async fetchActiveSlideReadme () {
      const { id, owner, name } = this.trendings[this.slideActiveIdx]
      await this.fetchReadme({ id, owner: owner.login, repo: name })
    },
    moveSlider (slideIdx) {
      const { slider, sliderItem } = this.$refs
      const slideWidth = parseInt(
        getComputedStyle(sliderItem[this.slideActiveIdx]).getPropertyValue('width'), 10
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
        throw e
      } finally {
        this.loading = false
        this.btnsShown = true
      }
    },
    async handleSlideClick (slideIdx) {
      if (slideIdx > 0 && slideIdx <= this.$refs.sliderItem.length) {
        this.moveSlider(slideIdx)
        await this.loadReadme()
      }
    }
  },
  async mounted () {
    // if (this.initialSlide) {
    //   const idx = this.trendings.findIndex(item => item.id === this.initialSlide)
    //   await this.handleSlideClick(idx)
    // }

    await this.fetchTrendings()
    await this.loadReadme()
  }
}
</script>

<style lang="scss">
.stories-slider {
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
    margin-left: -188px;
    transition: all 0.3s;
  }

  &__item {
    background: #ffffff;
    border-radius: 6px;
    width: 375px;
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
}
</style>
