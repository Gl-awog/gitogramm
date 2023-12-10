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
        // window.history.replaceState(
        //   {},
        //   '',
        //   `${window.location.pathname}?${window.location.hash}`
        // )
        // const loc = window.location
        // window.location.href = `${loc.host}${loc.hash}/auth`
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
