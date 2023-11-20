<template>
    <article class="story">
        <div class="story__user">
            <StoryUserItem :username="username" :avatar="avatar" />
        </div>
        <div class="story__hero">
            <h2>
                <slot name="storyTitle"></slot>
            </h2>
            <p>
                <slot name="storyText"></slot>
            </p>
            <ul class="story__stats">
                <li>
                    <Icon name="Star" /><span>Star</span>
                </li>
                <li>
                    <slot name="storyLike" />
                </li>
                <li>
                    <Icon name="Fork" /><span>Fork</span>
                </li>
                <li>
                    <slot name="storyFork" />
                </li>
            </ul>
        </div>
        <div class="story__comments">
            <Toggler @onToggle="toggle"></Toggler>
            <div class="story__comments-wrapper" v-if="shown">
                <slot name="storyComments"></slot>
            </div>
        </div>
        <time class="story__date">
            <slot name="storyDate"></slot>
        </time>
    </article>
</template>

<script>
import { StoryUserItem } from '../storyUserItem'
import { Toggler } from '../toggler'
// import { Comment } from '../comment'
import { Icon } from '../../icons'

export default {
  name: 'StoryItem',
  components: {
    StoryUserItem,
    Toggler,
    Icon
  },
  props: {
    // id: {
    //   type: Number,
    //   required: false
    // },
    avatar: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true
    }
    // storyIndex: {
    //   type: Number,
    //   required: false
    // }
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
.story {
    margin: 0 0 24px;
    text-align: left;

    &__user {
        margin-bottom: 6px;
        .story-user-item {
            display: flex;
            align-items: center;
        }

        :deep(h4) {
            font-size: 18px;
            font-weight: 700;
            margin-left: 16px;
        }
    }

    &__hero {
        box-shadow: 0px 4px 40px 0px #00000012;
        border: 1px solid #f1f1f1;
        padding: 24px 20px 24px 20px;
        margin-bottom: 18px;

        p {
            margin-bottom: 16px;
        }
    }

    h2 {
        font-weight: 700;
        font-size: 26px;
        margin-bottom: 16px;
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

    &__stats {
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

    @media (max-width:425px) {
        :deep(.story-user-avatar) {
            width: 35px;
            height: 35px;
        }
    }
}
</style>
