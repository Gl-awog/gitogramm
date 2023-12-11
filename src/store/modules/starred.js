import * as api from '@/api'

export const starred = {
  namespaced: true,
  state: {
    starred: {
      data: null,
      error: '',
      isLoading: false
    },
    issues: {
      isLoading: false
    }
  },
  mutations: {
    SET_STARRED (state, payload) {
      state.starred.data = payload
    },
    SET_STARRED_LOADING: (state, payload) => {
      state.starred.isLoading = payload
    },
    SET_STARRED_ERROR: (state, payload) => {
      state.starred.error = payload
    },
    SET_ISSUES (state, payload) {
      state.starred.data = state.starred.data.map((repo) => {
        if (payload.id === repo.id) {
          repo.issues = payload.issues
        }
        return repo
      })
    },
    SET_ISSUES_LOADING: (state, payload) => {
      state.issues.isLoading = payload
    }
  },
  actions: {
    async fetchStarred ({ commit }) {
      commit('SET_STARRED_LOADING', true)
      try {
        const { data } = await api.starred.getStarred()
        commit('SET_STARRED', data)
      } catch (error) {
        commit('SET_STARRED_ERROR', error)
        // throw error;
      } finally {
        commit('SET_STARRED_LOADING', false)
      }
    },

    async fetchIssuesForRepo ({ commit }, { id, owner, repo }) {
      commit('SET_ISSUES_LOADING', true)
      try {
        const { data } = await api.issues.getIssues({ owner, repo })

        commit('SET_ISSUES', { id, issues: data })
      } catch (error) {
        console.log(error)
        commit('SET_ISSUES', { id, issues: [{ title: error }] })
      } finally {
        commit('SET_ISSUES_LOADING', false)
      }
    }
  }
}
