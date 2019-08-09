import { detailInfo, updateDetail, sign } from "../../service/index"
const moment = require('moment')
// 模块所有的状态
const state = {
  lists: {},
  addressId: 0,
  list: []
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
  },
  updateLocation(state, payload) {
    state.list = payload;
  }
}
// 模块内的异步改变
const actions = {
  async  getDeatail({ commit }, payload) {
    
    const res = await detailInfo(payload);
    console.log("ress", res.data);
    commit("updateDeatail", res.data);
  },
  async changeDetail({ commit, dispatch }, payload) {
    console.log(payload,"888888888888")
    let data = await updateDetail(payload)
    // console.log(data)
    if (data.code === 0) {
      console.log('失败')
      await dispatch('getDeatail', payload.id)
      await dispatch('getLocation',{ status: -1 ,remind:payload.context.remind})

    }
  },
  async  getLocation({ commit }, payload) {
    const res = await sign(payload);
    // console.log("每部分数据", res.data);
    res.data.map(item => {
      if (!JSON.parse(item.address).address) {
        item.address = item.address
      } else {
        item.address = JSON.parse(item.address).address
      }
      item.start_time = new Date(Number(item.start_time)).toLocaleString();
    })
    commit("updateLocation", res.data);
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
