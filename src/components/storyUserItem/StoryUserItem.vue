<template>
  <div class="story-user-item">
    <figure class="story-user-avatar">
      <img :src="avatar" :alt="username" />
    </figure>
    <h4>{{ username }}</h4>
  </div>
</template>

<script>
export default {
  name: 'StoryUserItem',
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
}
</script>

<style lang="scss" scoped>
h4 {
  font-size: 12px;
}

.story-user-avatar {
  img {
    max-width: 100%;
    margin: 0 auto;
  }
}

</style>
