import { stat } from "fs"

const state = {
    action_cx: {
        xem: '1.0',
        them : '1.0',
        sua : '1.0',
        xoa : '1.0',
        xuat: '1.0'
    },
    action_tinhtrang_cx: {
        xem: '3.0',
        them: '3.0',
        sua: '3.0',
        xoa: '3.0',
        xuat: '3.0'
    },
    action_thicong: {
        xem: '7.0',
        them: '7.0',
        sua: '7.0',
        xoa: '7.0',
        xuat: '7.0'
    },
    action_tttc: {
        xem: '9.0',
        them: '9.0',
        sua: '9.0',
        xoa: '9.0',
        xuat: '9.0'
    }
}

const getters = {
    getAction_CX : (state) => {
        return state.action_cx
    },
    getAction_tinhtrang_cx: (state) => {
        return state.action_tinhtrang_cx
    },
    getAction_thicong: (state) => {
        return state.action_thicong
    },
    getAction_tttc: (state) => {
        return state.action_tttc
    }
}

const mutations = {
    updateAction_CX: (state,payload) => {
        state.action_cx = payload
    },
    updateAction_tinhtrang_cx: (state,payload) => {
        state.action_tinhtrang_cx = payload
    },
    updateAction_thicong: (state,payload) => {
        state.action_thicong = payload
    },
    updateAction_tttc: (state,payload) => {
        state.action_tttc = payload
    }
}

const actions = {
    commitAction_CX: ({commit},payload) => {
        commit("updateAction_CX",payload)
    },
    commitAction_tinhtrang_cx: ({commit},payload) => {
        commit("updateAction_tinhtrang_cx", payload)
    },
    commitAction_thicong: ({commit},payload) => {
        commit("updateAction_thicong", payload)
    },
    commitAction_tttc: ({commit},payload) => {
        commit("updateAction_tttc", payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}