import * as api from '@/api'

export const trendings = {
    namespaced: true,
    state: {
        data: []
    },
    getters: {

    },
    mutations: {
        SET_TRENDINGS: (state, payload) => {
            state.data = payload
        }
    },
    actions: {

    }
}