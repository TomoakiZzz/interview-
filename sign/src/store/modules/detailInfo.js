import { detailInfo, updateDetail, sign } from "../../service/index"
const moment = require('moment')
// 模块所有的状态
const state = {
  lists: {},
  addressId: 0,
  list: [],
  status: 0,//表示面试类型
  page: 1,//当前页码
  pageSize: 10,//当前显示的数据
  hasMore: true//是否有更多数据
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
<<<<<<< HEAD
=======
    console.log(payload.list,"上拉加载")
>>>>>>> mengyali
    if (payload.list) {
      if (payload.list.length === state.pageSize * state.page) {
        state.hasMore = true
      } else {
        state.hasMore = false
      }
    }
    for (let key in payload) {
      state[key] = payload[key]
    }

  }
}
// 模块内的异步改变
const actions = {
  async  getDeatail({ commit, state }, payload) {

    const res = await detailInfo(payload);
    console.log("ress", res.data);
    commit("updateDeatail", res.data);
  },
  async changeDetail({ commit, dispatch }, payload) {
    console.log(payload, "888888888888")
    let data = await updateDetail(payload)
    // console.log(data)
    if (data.code === 0) {
      console.log('失败')
      await dispatch('getDeatail', payload.id)
      await dispatch('getLocation', { status: -1, remind: payload.context.remind, page: state.page, pageSize: 10 })

    }
  },
  async  getLocation({ commit, state }, payload) {
    let params = {}
    params.page = state.page
    params.pageSize = state.pageSize
    params.status = state.status
    if (params.atatus === 2) {
      delete params.status
    }


    const res = await sign(params);
    console.log("每部分数据", res.data);
    res.data.map(item => {
      if (!JSON.parse(item.address).address) {
        item.address = item.address
      } else {
        item.address = JSON.parse(item.address).address
      }
      item.start_time = new Date(Number(item.start_time)).toLocaleString();
    })
    if (state.page === 1) {
      commit("updateLocation", { list: res.data });
    } else {
      commit("updateLocation", { list: [...state.list, ...res.data] });
    }

  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
