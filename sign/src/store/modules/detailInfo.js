import {detailInfo,update} from "../../service/index"
// 模块所有的状态
const state = {
    lists:[]
  }
  
  // 模块内的同步改变
  const mutations = {
    updateLocation(state, payload){
      console.log(state,payload)
      state.lists = payload;
    }
  }
  
  // 模块内的异步改变
  const actions = {
    async  getLocation({commit},payload){
      console.log(payload)
      const res=await detailInfo(payload);
      console.log("ress",res.data);
      commit("updateLocation",res.data);
  },
  async  getUpdate({commit},payload){
    console.log(payload)
    const res=await update(payload);
    console.log("ress",res.data);
    commit("updateLocation",res.data);
},
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  