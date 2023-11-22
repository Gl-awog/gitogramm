<template>
    <div class="comment">
        <p><span class="comment__user">{{ username }}</span> {{ text }}</p>
    </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    username: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
    margin-bottom: 6px;

    &__user {
      font-weight: 700;
    }
}
</style>
