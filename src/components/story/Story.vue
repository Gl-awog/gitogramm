<template>
  <div class="story">
    <h2>
      {{ title }}
    </h2>
    <p>
      {{ text }}
    </p>
    <Stats :like="like" :fork="fork" />
  </div>
</template>

<script>
import { Stats } from '../stats'

export default {
  name: 'Story',
  components: {
    Stats
  },
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    like: {
      type: Number,
      required: true
    },
    fork: {
      fork: Number,
      required: true
    }
  }
}
</script>

<style lang="scss">
.story {
  p {
    margin-bottom: 16px;
  }

  h2 {
    font-weight: 700;
    font-size: 26px;
    margin-bottom: 16px;
  }
}
</style>
