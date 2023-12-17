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
          </ul></div>
          <!-- <pre>{{ user }}</pre> -->
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { Header } from '@/components/header'
import { Topline } from '@/components/topline'
import { UserInfo } from '@/components/userInfo'
import { Story } from '@/components/story'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UserPage',
  components: {
    Header,
    Topline,
    UserInfo,
    Story
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user.data,
      user_repos: (state) => state.user.userrepo.data
    })
  },
  methods: {
    ...mapActions({
      fetchUser: 'user/fetchUser',
      fetchUserRepos: 'user/fetchUserRepos',
      logout: 'user/logout'
    }),

    async loadUserRepos () {
      try {
        const { login } = this.user
        await this.fetchUserRepos({ owner: login })
      } catch (e) {
        console.log(e)
      }
    }
  },

  async mounted () {
    await this.fetchUser().then(() => {
      this.loadUserRepos()
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
      top:-58px;
      right:0;
      font-size:18px;
      font-weight: 700;
      color: #9E9E9E;
    }
  }
}
</style>
