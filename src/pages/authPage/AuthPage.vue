<template>
    <section class="auth">
        <div class="auth__content">
            <div class="auth__left">
                <Logo />
                <h2>More than just one repository.
                    This is our digital world.</h2>
                <SlideButton :hoverText="`Authorize with github`" :isIcon="true" @click="getAuthPersonalCode">Authorize with github
                    <template #btn-icon>
                        <Icon name="LogoGithub" />
                    </template>
                </SlideButton>
            </div>
        </div>
        <footer class="auth__footer">
            &copy;&nbsp;Gitogram from Loftschool
        </footer>
    </section>
</template>

<script>
import { Logo } from '@/components/logo'
import { SlideButton } from '@/components/slideButton'
import { Icon } from '../../icons'
import { mapActions } from 'vuex'

export default {
  name: 'AuthPage',
  components: {
    Logo,
    SlideButton,
    Icon
  },
  methods: {
    ...mapActions({
      getAuthPersonalCode: 'user/getAuthPersonalCode',
      authUserByCode: 'user/authUserByCode'
    })
  },
  async created () {
    const code = new URLSearchParams(window.location.search).get('code')

    if (code) {
      const token = await this.authUserByCode(code)
      localStorage.setItem('token', token)
      this.$router.replace({ name: 'home' })
    }
  }
}
</script>

<style lang="scss">
.auth {
    height: 100vh;
    display: flex;
    flex-direction: column;

    &__content {
        flex-grow: 1;
        background: url("../../assets/bg_notebook.png") no-repeat 100% 50%;
        display: flex;
        align-items: center;
    }

    &__left {
        width: 50%;
        box-sizing: border-box;
        padding-left: 142px;
        text-align: left;

        h2 {
            margin: 24px 16px 54px 0;
            max-width: 256px;
            font-size: 18px;
        }
    }

    &__footer {
        height: 84px;
        box-sizing: border-box;
        border-top: rgba(#3C3C43, 0.3) solid 1px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
    }

    @media (max-width:900px) {
        &__content {
            display: block;
            background: url("../../assets/bg_notebook_tablet.png") no-repeat 50% 100%;
        }

        &__left {
            width: 100%;
            height: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 16px;
            text-align: center;
        }

        &__footer {
            display: none;
        }
    }

    @media (max-width:425px) {
        &__content {
            background-image: url("../../assets/bg_notebook_mob.png");
            background-position: 50% 30px;
            display: flex;
            flex-direction: column;
        }

        &__left {
            margin-top: auto;
            height: auto;
            padding-bottom: 16px;

            h2 {
                margin: 12px 0 12px;
            }
        }
    }
}
</style>
