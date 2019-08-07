import {sign} from "../../service/index"
// 模块所有的状态
const state = {
    list:[]
  }
  
  // 模块内的同步改变
  const mutations = {
    updateLocation(state, payload){
      console.log(state,payload)
      state.list = payload;
    }
  }
  
  // 模块内的异步改变
  const actions = {
    async  getLocation({commit},payload){
      console.log(payload)
      const res=await sign(payload);
      console.log("resssss",res.data);
      commit("updateLocation",res.data);
  }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  