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
    async fetchUser ({ commit }) {
      try {
        const { data } = await api.user.getUser()
        commit('SET_USER', data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
