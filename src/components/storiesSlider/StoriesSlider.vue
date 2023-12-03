<template>
  <div class="stories-slider">
    <ul class="stories-slider__list">
      <li class="stories-slider__item" :class="{ 'active': isActive }">
        <!-- <pre>{{ trendings }}</pre> -->
        <SlideItem isActive />
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
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      trendings: state => state.trendings.data
    })
  },
  methods: {
    ...mapActions({
      fetchTrendings: 'trendings/fetchTrendings'
    }),
    getStoryData (obj) {
      return {
        id: obj.id,
        avatar: obj.owner?.avatar_url,
        username: obj.owner?.login,
        content: obj.readme
      }
    }
  }
  // async created () {
  //   await this.fetchTrendings()
  // }
}
</script>

<style lang="scss">
.stories-slider {
  &__list {
    font-size: inherit;
  }

  &__item {
    background: #ffffff;
    border-radius: 6px;
    width:375px;
    min-height: 667px;
    display: flex;
    transition:all 0.3s;
    transform:scale(0.87);

    .slide-item {
      width: 100%;
      display: flex;
      flex-direction: column;

      &__body {
        flex-grow: 1;
      }
    }

    &.active {
      // min-height: 667px;
      // max-width: 375px;
      transform: scale(1);
    }
  }
}
</style>
