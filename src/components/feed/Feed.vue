<template>
  <article class="feed">
    <div class="feed__user">
      <User :username="username" :avatar="avatar" />
    </div>
    <div class="feed__hero">
      <slot name="s-story"></slot>
    </div>
    <div class="feed__comments" v-if="comments">
      <Toggler @onToggle="toggle"></Toggler>
      <div v-if="shown">
        <div v-for="comment in comments" :key="comment">
          <Comment :username="comment.username" :text="comment.text" />
        </div>
      </div>
    </div>
    <time class="feed__date">{{ date }} </time>
  </article>
</template>

<script>
import { Toggler } from '../toggler'
import { User } from '../user'
import { Comment } from '../comment'

export default {
  name: 'feed',
  components: {
    Toggler,
    User,
    Comment
  },
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
  data () {
    return {
      shown: false
    }
  },
  methods: {
    toggle (isOpened) {
      this.shown = isOpened
    }
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

    // :deep(.story) p {
    //   margin-bottom: 16px;
    // }

    // :deep(.story) h2 {
    //   font-weight: 700;
    //   font-size: 26px;
    //   margin-bottom: 16px;
    // }
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
