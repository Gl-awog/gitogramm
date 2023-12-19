import * as api from '@/api'

export const user = {
  namespaced: true,
  state: {
    user: {
      data: null
    },
    userrepo: {
      data: null
    },
    userfollowing: {
      data: null
    }
  },
  mutations: {
    SET_USER (state, payload) {
      state.user.data = payload
    },
    SET_USER_REPOS: (state, payload) => {
      state.userrepo.data = payload
    },
    SET_USER_FOLLOWERS: (state, payload) => {
      state.userfollowing.data = payload
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
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    },

    async fetchUserRepos ({ commit }, { owner }) {
      try {
        const { data } = await api.user.getUserRepos({ owner })
        commit('SET_USER_REPOS', data)
      } catch (error) {
        console.log(error)
        commit('SET_USER_REPOS', [])
      }
    },
    async fetchUserFollowing ({ commit }, { owner }) {
      // commit('SET_USER_FOLLOWERS_LOADING', true)
      try {
        const { data } = await api.user.getUserFollowing({ owner })
        commit('SET_USER_FOLLOWERS', data)
      } catch (error) {
        console.log(error)
        commit('SET_USER_FOLLOWERS', [])
      } finally {
        // commit('SET_FOLLOWERS_LOADING', false)
      }
    }
  }
}
