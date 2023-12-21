<template>
  <article class="feed">
    <div class="feed__user">
      <User :username="username" :avatar="avatar" />
    </div>
    <div class="feed__hero">
      <slot name="s-story"></slot>
    </div>
    <div class="feed__comments">
      <Issues :comments="comments" :isLoading="isIssuesLoading" @onToggleIssues="this.$emit('loadIssues')" />
    </div>
    <time class="feed__date">{{ date }} </time>
  </article>
</template>

<script>
import { Issues } from '../issues'
import { User } from '../user'
import { mapState } from 'vuex'

export default {
  name: 'feed',
  components: {
    User,
    Issues
  },
  emits: ['loadIssues'],
  props: {
    avatar: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    comments: {
      type: Array,
      required: false
    }
  },
  computed: {
    ...mapState({
      isIssuesLoading: (state) => state.starred.issues.isLoading
    })
  }
}
</script>

<style lang="scss" scoped>
.feed {
  margin: 0 0 24px;
  text-align: left;

  &__user {
    margin-bottom: 6px;

    .user {
      display: flex;
      align-items: center;
    }

    :deep(.user__name) {
      font-size: 18px;
      font-weight: 700;
      margin-left: 16px;
    }

    :deep(.user__avatar) {
      width: 44px;
      height: 44px;
    }
  }

  &__hero {
    box-shadow: 0px 4px 40px 0px #00000012;
    border: 1px solid #f1f1f1;
    padding: 24px 20px 24px 20px;
    margin-bottom: 18px;
  }

  &__date {
    text-transform: uppercase;
    opacity: 0.4;
    letter-spacing: 0.1em;
    margin: 10px 0;
    display: block;
  }

  &__comments {
    .button {
      margin: 0 0 10px;
    }
  }

  @media (max-width:425px) {
    :deep(.user__avatar) {
      width: 35px;
      height: 35px;
    }
  }
}
</style>
