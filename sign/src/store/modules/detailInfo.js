import { detailInfo, updateDetail } from "../../service/index"
const moment = require('moment')
// 模块所有的状态
const state = {
  lists: {},
  addressId: 0
}

// 模块内的同步改变
const mutations = {
  updateDeatail(state, payload) {
    console.log(state, payload)
    payload.address = JSON.parse(payload.address).address
    payload.start_time = moment(payload.start_time * 1).format("YYYY-MM-DD HH:mm")
    state.lists = payload;
  },
  getAddressId(state, payload) {
    state.addressId = payload
  }
}

// 模块内的异步改变
const actions = {
  async  getDeatail({ commit }, payload) {
    console.log(payload)
    const res = await detailInfo(payload);
    console.log("ress", res.data);
    commit("updateDeatail", res.data);
  },
  async changeDetail({ commit, dispatch }, payload) {

    let data = await updateDetail(payload)
    console.log(data)
    if (data.code === 0) {
      console.log('失败')
      await dispatch('getDeatail',payload.id)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
