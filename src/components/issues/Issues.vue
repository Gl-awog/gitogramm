<template>
  <Toggler @onToggle="toggleIssues"></Toggler>
  <div v-if="isShown">
    <Placeholder v-if="isIssuesLoading" :paragraphs="1" />
    <div else v-for="comment in comments" :key="comment">
      <Comment :username="comment.user.login" :text="comment.title" />
    </div>
  </div>
</template>

<script>
import { Toggler } from '../toggler'
import { Comment } from '../comment'
import { Placeholder } from '../placeholder'
import { mapState } from 'vuex'

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
    }
  },
  computed: {
    ...mapState({
      isIssuesLoading: (state) => state.starred.issues.isLoading
    })
  },
  methods: {
    toggleIssues (isOpened) {
      this.isShown = isOpened
      this.$emit('onToggleIssues', this.shown)
    }
  }
}
</script>
