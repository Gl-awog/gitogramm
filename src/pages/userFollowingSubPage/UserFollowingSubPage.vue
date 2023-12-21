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
import { User } from '@/components/user'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export default {
  name: 'UserFollowingSubPage',
  components: {
    Spinner,
    SlideButton,
    User
  },
  setup () {
    const { state, dispatch } = useStore()
    const user = computed(() => state.user.user)
    const userFollowing = computed(() => state.user.userfollowing)

    const unFollow = async (owner) => {
      try {
        await dispatch('user/unsetFollowing', { owner })
      } catch (e) {
        console.log(e)
      }
    }

    const loadUserFollowing = async () => {
      try {
        const { login } = user.value.data
        await dispatch('user/fetchUserFollowing', { owner: login })
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(async () => {
      // if (!user.value.data) {
      await dispatch('user/fetchUser').then(() => {
        loadUserFollowing()
      })
      // } else {
      //   loadUserFollowing()
      // }
    })

    return {
      user,
      userFollowing,
      unFollow
    }
  }
}
</script>

<style lang="scss" scoped>
.following {
  &-item {
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
  }
}
</style>
