import * as api from '@/api'

export const user = {
  namespaced: true,
  state: {
    user: {
      data: null
    }
  },
  mutations: {
    SET_USER (state, payload) {
      state.user.data = payload
    }
  },
  getters: {},
  actions: {
    getAuthPersonalCode () {
      api.user.sendUserToAuthPage()
    },

    async authUserByCode (store, code) {
      const { data } = await api.user.getAccessTokenByPersonalCode(code)
      return data.token
    },

    async fetchUser ({ commit }) {
      try {
        const { data } = await api.user.getUser()
        commit('SET_USER', data)
      } catch (error) {
        console.log(error)
      }
    },

    logout () {
      try {
        localStorage.removeItem('token')
        // const params = new URLSearchParams(window.location.search)
        // params.delete('code')
        // window.history.replaceState()
        // console.log(params)
        // console.log(window.location.search)
        // this.$router.replace({ name: 'auth' })
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
