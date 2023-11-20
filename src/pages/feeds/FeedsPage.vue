<template>
  <Header>
    <template #topline>
      <Topline />
    </template>
    <template #headerContent>
      <div class="story-user-list">
        <div class="story-user-list-wrapper">
          <ul>
            <li class="story-user-item" v-for="user in users" :key="user.id">
              <StoryUserItem :avatar="user.avatar" :username="user.username" />
            </li>
          </ul>
        </div>
      </div>
    </template>
  </Header>
  <main class="g-main">
    <div class="g-container-narrow">
      <div class="story-list">
        <ul>
          <li class="story-item" v-for="{ id, username, avatar, stories } in users" :key="id">
            <StoryItem :id="id" :username="username" :avatar="avatar" :storyIndex="0" v-if="stories">
              <template #storyTitle>
                {{ stories[0].title }}
              </template>
              <template #storyText>
                {{ stories[0].text }}
              </template>
              <template #storyLike>{{ stories[0].like }}</template>
              <template #storyFork>{{ stories[0].fork }}</template>
              <template #storyComments v-if="stories[0].comments">
                <div v-for="comment in stories[0].comments" :key="comment">
                  <Comment :username="comment.username" :text="comment.text" />
                </div>
              </template>
              <template #storyDate>
                {{ stories[0].date }}
              </template>
            </StoryItem>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import { Header } from '@/components/header'
import { Topline } from '@/components/topline'
import { StoryUserItem } from '@/components/storyUserItem'
import { StoryItem } from '@/components/storyItem'
import users from './user.json'
import { Comment } from '@/components/comment'

export default {
  name: 'FeedsPage',
  components: {
    Header,
    Topline,
    StoryUserItem,
    StoryItem,
    Comment
  },
  data () {
    return {
      users
    }
  }
}
</script>

<style lang="scss">
.story-user-list {
  margin: 30px 0 10px;

  ul {
    display: flex;
    justify-content: space-between;
  }

  .story-user-avatar {
    border-radius: 50%;
    border: 2px solid #A6328D;
    margin-bottom: 10px;
    width: 92px;
    height: 92px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }

  @media (max-width:1200px) {
    overflow: hidden;
    margin: 0 -16px;

    &-wrapper {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      transform: translateZ(0);
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      scrollbar-width: none;
      margin-bottom: -16px;
      padding: 0 0 16px 16px;
    }

    ul {
      gap: 32px;
      justify-content: flex-start;

      &:after {
        content: "";
        padding-right: 1px;

      }
    }
  }

  @media (max-width:900px) {
    ul {
      gap:16px;
    }
  }

  @media (max-width:768px) {
    ul {
      gap:12px;
    }
  }

  @media (max-width:425px) {
  .story-user-avatar {
    width: 72px;
    height: 72px;
  }
}

}

</style>
