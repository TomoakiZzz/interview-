import {decrypt} from "../../service/index"
// 模块所有的状态
const state = {
    openid:"",
    info:{}
}

// 模块内的同步改变
const mutations = {
  updataOpenid(state,payload){
      state.openid=payload
  }
}

// 模块内的异步改变
const actions = {
    async decrypt({commit},payload){
        let data=await decrypt(payload);
        console.log("data...",data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}