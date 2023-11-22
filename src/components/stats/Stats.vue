<template>
    <ul class="stats">
        <li>
            <Icon name="Star" /><span>Star</span>
        </li>
        <li>
            {{ like }}
        </li>
        <li>
            <Icon name="Fork" /><span>Fork</span>
        </li>
        <li>
            {{ fork }}
        </li>
    </ul>
</template>

<script>
import { Icon } from '../../icons'

export default {
  name: 'Stats',
  components: {
    Icon
  },
  props: {
    like: {
      type: Number,
      required: false
    },
    fork: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss">
.stats {
    display: inline-flex;
    border: 1px solid #cccccc;
    height: 28px;
    padding: 0 2px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;

    li {
        display: flex;
        align-items: center;
        padding: 0 12px;
    }

    li:not(:first-child) {
        border-left: 1px solid #cccccc;
    }

    li:nth-child(even) {
        min-width: 24px;
        text-align: center;
        padding: 0 3px;
        justify-content: center;
    }

    svg {
        margin-right: 4px;
    }
}
</style>
