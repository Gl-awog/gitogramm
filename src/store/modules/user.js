import * as api from '@/api'

export const user = {
  namespaced: true,
  state: {
    user: {
      data: {},
      isLoading: false,
      error: ''
    },
    userrepo: {
      data: {},
      isLoading: false,
      error: ''
    },
    userfollowing: {
      data: {},
      isLoading: false,
      error: ''
    },
    following: {
      isLoading: false,
      error: ''
    }
  },
  mutations: {
    SET_USER (state, payload) {
      state.user.data = payload
    },
    SET_USER_LOADING: (state, payload) => {
      state.user.isLoading = payload
    },
    SET_USER_ERROR: (state, payload) => {
      state.user.error = payload
    },
    SET_USER_REPOS: (state, payload) => {
      state.userrepo.data = payload
    },
    SET_USER_REPOS_LOADING: (state, payload) => {
      state.userrepo.isLoading = payload
    },
    SET_USER_REPOS_ERROR: (state, payload) => {
      state.userrepo.error = payload
    },
    SET_USER_FOLLOWING: (state, payload) => {
      state.userfollowing.data = payload
    },
    SET_USER_FOLLOWING_LOADING: (state, payload) => {
      state.userfollowing.isLoading = payload
    },
    SET_USER_FOLLOWING_ERROR: (state, payload) => {
      state.userfollowing.error = payload
    },
    SET_FOLLOWING_LOADING: (state, payload) => {
      state.following.isLoading = payload
    },
    SET_FOLLOWING_ERROR: (state, payload) => {
      state.following.error = payload
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
      commit('SET_USER_LOADING', true)
      try {
        const { data } = await api.user.getUser()
        commit('SET_USER', data)
      } catch (error) {
        console.log(error)
        commit('SET_USER_ERROR', error)
      } finally {
        commit('SET_USER_LOADING', false)
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
      commit('SET_USER_REPOS_LOADING', true)
      try {
        const { data } = await api.user.getUserRepos({ owner })
        commit('SET_USER_REPOS', data)
      } catch (error) {
        console.log(error)
        commit('SET_USER_REPOS', [])
        commit('SET_USER_REPOS_ERROR', error)
      } finally {
        commit('SET_USER_REPOS_LOADING', false)
      }
    },

    async fetchUserFollowing ({ commit }, { owner }) {
      commit('SET_USER_FOLLOWING_LOADING', true)
      try {
        const { data } = await api.user.getUserFollowing({ owner })
        commit('SET_USER_FOLLOWING', data)
      } catch (error) {
        console.log(error)
        commit('SET_USER_FOLLOWING', [])
        commit('SET_USER_FOLLOWING_ERROR', error)
      } finally {
        commit('SET_USER_FOLLOWING_LOADING', false)
      }
    },

    async setFollowing ({ commit }, owner) {
      // commit('SET_FOLLOWERS_LOADING', true)

      try {
        const response = await api.user.setFollowing(owner)
        if (response.status === 204) {
          console.log('success')
        }
      } catch (e) {
        console.log(e)
        // commit('SET_FOLLOWERS_ERROR', 'не удалось обновить данные')
      } finally {
        // commit('SET_FOLLOWERS_LOADING', false)
      }
    },

    async unsetFollowing ({ commit }, owner) {
      console.log(owner)
      commit('SET_FOLLOWING_LOADING', true)
      try {
        const response = await api.user.unsetFollowing(owner)
        if (response.status === 204) {
          console.log('unfollow success')
        }
      } catch (e) {
        console.log(e)
        commit('SET_FOLLOWING_ERROR', e)
      } finally {
        commit('SET_FOLLOWING_LOADING', false)
      }
    }
  }
}
