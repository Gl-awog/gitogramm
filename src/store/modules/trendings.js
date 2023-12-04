import * as api from '@/api'

export const trendings = {
  namespaced: true,
  state: {
    posts: {
      data: {},
      isLoading: false,
      error: ''
    },
    readme: {}
  },
  getters: {
    getRepoById: (state) => (id) =>
      state.posts.data.find((item) => item.id === id)
  },
  mutations: {
    SET_TRENDINGS_DATA: (state, payload) => {
      state.posts.data = payload
    },
    SET_TRENDINGS_LOADING: (state, payload) => {
      state.posts.isLoading = payload
    },
    SET_TRENDINGS_ERROR: (state, payload) => {
      state.posts.error = payload
    }
    // SET_README: (state, payload) => {
    //  state.data
    // }
  },
  actions: {
    async fetchTrendings ({ commit }) {
      commit('SET_TRENDINGS_LOADING', true)
      try {
        const { data } = await api.trendings.getTrendings()
        commit('SET_TRENDINGS_DATA', data.items)
        console.log(data.items)
      } catch (error) {
        commit('SET_TRENDINGS_ERROR', error)
        // throw error;
      } finally {
        commit('SET_TRENDINGS_LOADING', false)
      }
    },

    async fetchReadme (store, { id, owner, repo }) {
      try {
        const { data } = await api.readme.getReadme({ owner, repo })
        console.log(data)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
}
