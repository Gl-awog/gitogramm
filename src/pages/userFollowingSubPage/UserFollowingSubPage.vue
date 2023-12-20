<template>
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
        <SlideButton :hoverText="Following" @click="unFollow(item.login)">{{
          "Following"
        }}</SlideButton>
      </li>
    </ul>
  </div>
</template>
<script>
import { Spinner } from '@/components/spinner'
import { SlideButton } from '@/components/slideButton'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export default {
  name: 'UserFollowingSubPage',
  components: {
    Spinner,
    SlideButton
  },
  setup () {
    const unFollow = async (owner) => {
      try {
        await dispatch('user/unsetFollowing', { owner })
      } catch (e) {
        console.log(e)
      }
    }

    const { state, dispatch } = useStore()

    const loadUserFollowing = async () => {
      try {
        const { login } = user.value.data
        await dispatch('user/fetchUserFollowing', { owner: login })
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(async () => {
      await dispatch('user/fetchUser').then(() => {
        loadUserFollowing()
      })
    })

    const user = computed(() => state.user.user)
    const userFollowing = computed(() => state.user.userfollowing)

    return {
      user,
      userFollowing,
      unFollow
    }
  }
}
</script>
