<template>
  <div class="user">
    <div class="user__avatar ">
      <!-- <img :src="`${imgHost}${avatar}`" :alt="username" /> -->
      <img :src="avatar" :alt="username" />
    </div>
    <div class="user__name">{{ username }}</div>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    avatar: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true
    }
  }
  // data () {
  //   return {
  //     imgHost: location.origin
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.user {
  &__avatar {
    border-radius: 50%;
    img {
      max-width: 100%;
      margin: 0 auto;
      border-radius: 50%;
    }
  }

  &__name {
    font-size: 12px;
  }
}
</style>
