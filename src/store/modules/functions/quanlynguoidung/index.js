const state = {
    action_nd: {
        xem: '10.0',
        them : '10.0',
        sua : '10.0',
        xoa : '10.0',
        xuat: '10.0'
    },
}
const getters = {
    getAction_nd: (state) => {
        return state.action_nd
    },
    
}
const mutations = {
    updateAction_nd: (state,payload) => {
        state.action_nd = payload
    },
}

const actions = {
    commitAction_nd: ({commit},payload) => {
        commit("updateAction_nd",payload)
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}