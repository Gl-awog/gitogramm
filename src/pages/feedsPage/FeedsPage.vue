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
    <template #s-bottomline>
      <div class="user__list">
        <div class="user__list-wrapper">
          <ul class="user__list-inner">
            <li
              class="user__list-item"
              v-for="{ id, owner } in trendings.data"
              :key="owner.id"
            >
              <User
                :avatar="owner.avatar_url"
                :username="owner.login"
                @click="
                  $router.push({
                    name: 'storiesSlide',
                    params: { initialSlide: id },
                  })
                "
              />
            </li>
          </ul>
        </div>
      </div>
    </template>
  </Header>
  <main class="g-main">
    <div class="g-container-narrow">
      <div class="g-main__loader" v-if="starred.isLoading">
        <Spinner />
      </div>
      <div class="g-main__error" v-else-if="starred.error">
        {{ starred.error }}
      </div>
      <ul class="repo-list" v-else>
        <li class="repo-item" v-for="item in starred.data" :key="item.id">
          <Feed
            :username="item.owner.login"
            :avatar="item.owner.avatar_url"
            :date="convertDateToReadable(item.updated_at)"
            :storyIndex="0"
            :comments="item.issues"
            @onToggleIssues="
              !item.issues && fetchIssuesForRepo({
                id: item.id,
                owner: item.owner.login,
                repo: item.name,
              })
            "
          >
            <template #s-story>
              <Story
                :title="item.name"
                :text="item.description"
                :like="item.stargazers_count"
                :fork="item.forks"
              />
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
import { Spinner } from '@/components/spinner'
import { convertDateToReadable } from '@/helpers/helpers'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'FeedsPage',
  components: {
    Header,
    Topline,
    User,
    Feed,
    Story,
    Spinner
  },
  data () {
    return {}
  },
  methods: {
    convertDateToReadable,
    ...mapActions({
      fetchTrendings: 'trendings/fetchTrendings',
      fetchUser: 'user/fetchUser',
      fetchStarred: 'starred/fetchStarred',
      fetchIssuesForRepo: 'starred/fetchIssuesForRepo',
      logout: 'user/logout'
    })
  },
  computed: {
    ...mapState({
      trendings: (state) => state.trendings.posts,
      user: (state) => state.user.user.data,
      starred: (state) => state.starred.starred
    })
  },
  async created () {
    this.fetchTrendings()
    this.fetchUser()
    this.fetchStarred()
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
    transition: border-color 0.3s;

    &:hover {
      border-color: #a6328d;
    }
  }

  @media (max-width: 1200px) {
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

  @media (max-width: 900px) {
    ul {
      gap: 16px;
    }
  }

  @media (max-width: 768px) {
    ul {
      gap: 12px;
    }
  }

  @media (max-width: 425px) {
    .user__avatar {
      width: 72px;
      height: 72px;
    }
  }
}
</style>
