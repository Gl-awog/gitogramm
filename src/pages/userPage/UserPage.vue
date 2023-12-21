<template>
  <Header>
    <template #s-topline>
      <Topline
        v-if="user.data"
        :avatar="user.data.avatar_url || undefined"
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
            v-if="user.data"
            :avatar="user.data.avatar_url"
            :username="user.data.login"
            :fio="user.data.name"
            :public_repos="user.data.public_repos"
            :following="user.data.following"
            :isLoading="user.data.isLoading"
          />
        </aside>
        <div class="userpage__content">
          <router-view />

          <!-- <h2>Repositories</h2>
          <div class="userpage__loader" v-if="userRepos.isLoading">
            <Spinner />
          </div>
          <div class="userpage__error" v-else-if="userRepos.error">
            {{ userRepos.error }}
          </div>
          <div class="repo-container" v-else>
            <div class="repo-count" v-if="userRepos.data">
              {{ userRepos.data.length }}
            </div>
            <ul class="repo-list">
              <li
                class="repo-item"
                v-for="item in userRepos.data"
                :key="item.id"
              >
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
          <div class="userpage__loader" v-if="userFollowing.isLoading">
            <Spinner />
          </div>
          <div class="userpage__error" v-else-if="userFollowing.error">
            {{ userFollowing.error }}
          </div>
          <div class="following-container" v-else>
            <div class="following-count" v-if="userFollowing.data">
              {{ userFollowing.data.length }}
            </div>
            <ul class="following-list">
              <li
                class="following-item"
                v-for="item in userFollowing.data"
                :key="item.id"
              >
                <div class="following-item__left">
                  <User :username="item.login" :avatar="item.avatar_url" />
                  <p class="following-item__type">{{ item.type }}</p>
                </div>
                <SlideButton
                  :hoverText="Following"
                  @click="unFollow(item.login)"
                  >{{ "Following" }}</SlideButton
                >
              </li>
            </ul>
          </div> -->
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { Header } from '@/components/header'
import { Topline } from '@/components/topline'
import { UserInfo } from '@/components/userInfo'
// import { User } from '@/components/user'
// import { Story } from '@/components/story'
// import { SlideButton } from '@/components/slideButton'
// import { Spinner } from '@/components/spinner'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export default {
  name: 'UserPage',
  components: {
    Header,
    Topline,
    UserInfo
    // Story,
    // User,
    // SlideButton,
    // Spinner
  },
  setup () {
    const { state, dispatch } = useStore()

    // const loadUserRepos = async () => {
    //   try {
    //     const { login } = user.value.data
    //     await dispatch('user/fetchUserRepos', { owner: login })
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }

    // const loadUserFollowing = async () => {
    //   try {
    //     const { login } = user.value.data
    //     await dispatch('user/fetchUserFollowing', { owner: login })
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }

    // const unFollow = async (owner) => {
    //   try {
    //     await dispatch('user/unsetFollowing', { owner })
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }

    onMounted(async () => {
      await dispatch('user/fetchUser')
      // await dispatch('user/fetchUser').then(() => {
      //   loadUserRepos()
      //   loadUserFollowing()
      // })
    })

    const user = computed(() => state.user.user)
    // const userRepos = computed(() => state.user.userrepo)
    // const userFollowing = computed(() => state.user.userfollowing)

    return {
      user
      // userRepos,
      // userFollowing,
      // unFollow
    }
  }
  // computed: {
  //   ...mapState({
  //     user: (state) => state.user.user,
  //     userRepos: (state) => state.user.userrepo,
  //     userFollowing: (state) => state.user.userfollowing,
  //   }),
  // },
  // methods: {
  //   ...mapActions({
  //     fetchUser: "user/fetchUser",
  //     fetchUserRepos: "user/fetchUserRepos",
  //     fetchUserFollowing: "user/fetchUserFollowing",
  //     logout: "user/logout",
  //     unsetFollowing: "user/unsetFollowing",
  //   }),

  //   async unFollow(owner) {
  //     try {
  //       await this.unsetFollowing(owner);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },

  //   async loadUserRepos() {
  //     try {
  //       const { login } = this.user.data;
  //       await this.fetchUserRepos({ owner: login });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   },
  //   async loadUserFollowing() {
  //     try {
  //       const { login } = this.user.data;
  //       await this.fetchUserFollowing({ owner: login });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   },
  // },
  // async mounted() {
  //   await this.fetchUser().then(() => {
  //     this.loadUserRepos();
  //     this.loadUserFollowing();
  //   });
  // },
}
</script>

<style lang="scss">
.userpage {
  padding-bottom: 10px;
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

  &__loader {
    min-width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
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
        color: #9e9e9e;
        margin-top: 42px;
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

@media (max-width: 900px) {
  .userpage {
    display: block;

    &__content > h2 {
      display: none;
    }

    &:before {
      display: none;
    }

    &__aside {
      width: 100%;
      background:#FAFAFA;
      padding:0 16px 20px;

      h2 {
        display: none;
      }

    }

    &__content {
      width: 100%;
      padding: 20px 16px;

      .story h2 {
        font-size: 16px;
        margin-bottom: 8px;
      }
    }
  }

  .repo {
    &-count {
      display: none;
    }

    &-item {
      :deep(.story) {
        h2 {
          font-size: 22px;
        }

        p {
          font-size: 12px;
        }
      }
    }
  }

  .following {
    &-count {
      display: none;
    }

    &-item {
      :deep(.user) {
        .user__avatar {
          width: 66px;
          height: 66px;
        }
      }

      .btn {
        height: 36px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@media (max-width: 900px) {
  .g-main {
    border-top: none;
    padding-top:0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) calc(100% - 30px),
      rgba(0, 0, 0, 0.17) 100%
    );
  }

  .g-container {
    padding:0;
  }
}
</style>
