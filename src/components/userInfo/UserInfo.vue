<template>
  <div class="userinfo">
    <User :username="username" :avatar="avatar" />
    <Placeholder v-if="isLoading" :isSimple="true" :paragraphs="1"  />
    <ul v-else class="userinfo__stats">
      <li class="userinfo__stats-a">
        <em>{{ public_repos }}</em> repositories
      </li>
      <li class="userinfo__stats-a">
        <em>{{ following }}</em> following
      </li>
      <li class="userinfo__stats-fio">{{ fio }}</li>
    </ul>
  </div>
</template>

<script>
import { User } from '../user'
import { Placeholder } from '../placeholder'

export default {
  name: 'UserInfo',
  components: {
    User,
    Placeholder
  },
  props: {
    avatar: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true
    },
    fio: {
      type: String
    },
    public_repos: {
      type: Number
    },
    following: {
      type: Number
    },
    isLoading: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.userinfo {
  display: flex;

  &__stats {
    margin-top: 34px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 4px;
    align-self: flex-start;

    &-a {
      flex-basis: calc(50% - 4px);
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 6px;

      em {
        font-size: 14px;
        font-weight: 700;
      }
    }

    &-fio {
      flex-basis: 100%;
      color: #9e9e9e;
      font-size: 14px;
    }
  }

  :deep(.user) {
    position: relative;
    margin: 0 20px 16px 0;
  }

  :deep(.user__avatar) {
    width: 90px;
    height: 90px;
  }

  :deep(.user__name) {
    position: absolute;
    left: 110px;
    top: 0;
    white-space: nowrap;
    font-size: 24px;
    font-weight: 700;
  }
}
</style>
