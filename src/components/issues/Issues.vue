<template>
  <Toggler @onToggle="toggleIssues"></Toggler>
  <div v-if="isShown" class="issues">
    <Placeholder v-if="isLoading" :paragraphs="1" />
    <!-- <pre>{{ comments }}</pre> -->
    <div else v-for="comment in comments" :key="comment">
      <Comment :username="comment.user.login" :text="comment.title" />
    </div>
  </div>
</template>

<script>
import { Toggler } from '../toggler'
import { Comment } from '../comment'
import { Placeholder } from '../placeholder'

export default {
  name: 'Issues',
  components: {
    Toggler,
    Comment,
    Placeholder
  },
  emits: ['onToggleIssues'],
  data () {
    return {
      isShown: false
    }
  },
  props: {
    comments: {
      type: Array,
      required: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleIssues (isOpened) {
      this.isShown = isOpened
      if (!this.comments) this.$emit('onToggleIssues', this.shown)
    }
  }
}
</script>
