<template>
  <Header>
    <template #s-topline>
      <Topline />
    </template>
    <template #s-bottomline>
      <div class="user__list">
        <div class="user__list-wrapper">
          <ul class="user__list-inner">
            <li class="user__list-item" v-for="user in users" :key="user.id">
              <User :avatar="user.avatar" :username="user.username" />
            </li>
          </ul>
        </div>
      </div>
    </template>
  </Header>
  <main class="g-main">
    <div class="g-container-narrow">
      <ul class="feeds-list">
        <li class="feeds-item" v-for="item in usersWithStories" :key="item.id">
          <Feed :username="item.username" :avatar="item.avatar" :date="item.stories[0].date" :comments="item.stories[0].comments" :storyIndex="0">
            <template #s-story>
              <Story :title="item.stories[0].title" :text="item.stories[0].text" :like="item.stories[0].like" :fork="item.stories[0].fork" />
            </template>
          </Feed>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { Header } from '@/components/header'
import { Topline } from '@/components/topline'
import { User } from '@/components/user'
import { Feed } from '@/components/feed'
import { Story } from '@/components/story'
import users from './user.json'

export default {
  name: 'FeedsPage',
  components: {
    Header,
    Topline,
    User,
    Feed,
    Story
  },
  data () {
    return {
      users
    }
  },
  computed: {
    usersWithStories () {
      return this.users.filter(user => user.stories !== undefined && user.stories.length)
    }
  }
}
</script>

<style lang="scss">
.user__list {
  margin: 30px 0 10px;

  ul {
    display: flex;
    justify-content: space-between;
  }

  .user__avatar {
    border-radius: 50%;
    border: 2px solid transparent;
    margin-bottom: 10px;
    width: 92px;
    height: 92px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    transition:border-color 0.3s;

    &:hover {
      border-color:#A6328D;
    }
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
      gap: 16px;
    }
  }

  @media (max-width:768px) {
    ul {
      gap: 12px;
    }
  }

  @media (max-width:425px) {
    .user__avatar {
      width: 72px;
      height: 72px;
    }
  }
}
</style>
