<template>
  <h2>Repositories</h2>
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
      <li class="repo-item" v-for="item in userRepos.data" :key="item.id">
        <Story
          :title="item.name"
          :text="item.description"
          :like="item.stargazers_count"
          :fork="item.forks"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import { Spinner } from '@/components/spinner'
import { Story } from '@/components/story'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export default {
  name: 'UserReposSubPage',
  components: {
    Spinner,
    Story
  },
  setup () {
    const { state, dispatch } = useStore()

    const user = computed(() => state.user.user)
    const userRepos = computed(() => state.user.userrepo)

    const loadUserRepos = async () => {
      try {
        const { login } = user.value.data
        await dispatch('user/fetchUserRepos', { owner: login })
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(async () => {
      // if (!user.value.data) {
      await dispatch('user/fetchUser').then(() => {
        loadUserRepos()
      })
      // } else {
      //   loadUserRepos()
      // }
    })

    return {
      user,
      userRepos
    }
  }
}
</script>
