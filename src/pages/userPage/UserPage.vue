<template>
  <Header>
    <template #s-topline>
      <Topline
        v-if="user"
        :avatar="user.avatar_url || undefined"
        @onLogout="logout"
      />
      <Topline v-else @onLogout="() => {}" />
    </template>
  </Header>
  <main class="g-main">
    <div class="g-container">
      <section class="userpage">
        <aside class="userpage__aside">
          <h2>My profile</h2>
          <UserInfo
            v-if="user"
            :avatar="user.avatar_url || undefined"
            :username="user.login"
            :fio="user.name"
            :public_repos="user.public_repos"
            :following="user.following"
          />
        </aside>
        <div class="userpage__content">
          <h2>Repositories</h2>
          <div class="repo-container">
            <div class="repo-count" v-if="user_repos">
              {{ user_repos.length }}
            </div>
            <ul class="repo-list">
              <li class="repo-item" v-for="item in user_repos" :key="item.id">
                <Story
                  :title="item.name"
                  :text="item.description"
                  :like="item.stargazers_count"
                  :fork="item.forks"
                />
              </li>
            </ul>
          </div>
          <h2>Following</h2>
          <div class="following-container">
            <div class="following-count" v-if="user_following">
              {{ user_following.length }}
            </div>
            <ul class="following-list">
              <li
                class="following-item"
                v-for="item in user_following"
                :key="item.id"
              >
                <div class="following-item__left">
                  <User :username="item.login" :avatar="item.avatar_url" />
                  <p class="following-item__type">{{ item.type }}</p>
                </div>
                <SlideButton :hoverText="Following" @click="$emit('onFollow')"
                  >{{ "Following" }}
                </SlideButton>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { Header } from '@/components/header'
import { Topline } from '@/components/topline'
import { User } from '@/components/user'
import { UserInfo } from '@/components/userInfo'
import { Story } from '@/components/story'
import { SlideButton } from '@/components/slideButton'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UserPage',
  components: {
    Header,
    Topline,
    UserInfo,
    Story,
    User,
    SlideButton
  },
  emits: ['onFollow'],
  computed: {
    ...mapState({
      user: (state) => state.user.user.data,
      user_repos: (state) => state.user.userrepo.data,
      user_following: (state) => state.user.userfollowing.data
    })
  },
  methods: {
    ...mapActions({
      fetchUser: 'user/fetchUser',
      fetchUserRepos: 'user/fetchUserRepos',
      fetchUserFollowing: 'user/fetchUserFollowing',
      logout: 'user/logout'
    }),

    async loadUserRepos () {
      try {
        const { login } = this.user
        await this.fetchUserRepos({ owner: login })
      } catch (e) {
        console.log(e)
      }
    },
    async loadUserFollowing () {
      try {
        const { login } = this.user
        await this.fetchUserFollowing({ owner: login })
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted () {
    await this.fetchUser().then(() => {
      this.loadUserRepos()
      this.loadUserFollowing()
    })
  }
}
</script>

<style lang="scss" scoped>
.userpage {
  & {
    display: flex;
    position: relative;
    min-height: calc(100vh - 134px - 33px);
    text-align: left;

    &:before {
      content: "";
      position: absolute;
      left: 36%;
      width: 1px;
      height: calc(100% + 32px);
      top: -32px;
      background: #cccccc;
    }
  }

  &__aside {
    width: 36%;
    box-sizing: border-box;
  }

  &__content {
    width: 64%;
    box-sizing: border-box;
    padding: 0 0 36px 74px;
  }

  h2 {
    margin-bottom: 30px;
  }

  .repo {
    &-container {
      position: relative;
    }

    &-item {
      box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.0705882353);
      border: 1px solid #f1f1f1;
      padding: 24px 20px 24px 20px;
      margin-bottom: 18px;
    }

    &-count {
      position: absolute;
      top: -58px;
      right: 0;
      font-size: 18px;
      font-weight: 700;
      color: #9e9e9e;
    }
  }

  .following {
    &-container {
      position: relative;
    }

    &-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;
      align-items: center;

      :deep(.user) {
        position: relative;
        margin: 0 20px 16px 0;
      }

      :deep(.user__avatar) {
        width: 72px;
        height: 72px;
      }

      :deep(.user__name) {
        position: absolute;
        left: 90px;
        top: 14px;
        white-space: nowrap;
        font-size: 18px;
        font-weight: 500;
      }

      &__type {
        font-size: 12px;
        color: #9E9E9E;
        margin-top:42px;
      }

      &__left {
        display: flex;
      }
    }

    &-count {
      position: absolute;
      top: -58px;
      right: 0;
      font-size: 18px;
      font-weight: 700;
      color: #9e9e9e;
    }
  }
}
</style>
