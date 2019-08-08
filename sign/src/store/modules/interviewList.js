import {sign} from "../../service/index"
// 模块所有的状态
const state = {
    list:[]
  }
  
  // 模块内的同步改变
  const mutations = {
    updateLocation(state, payload){
      state.list = payload;
      console.log("2222222222222222",state.list)
    }
  }
  
  // 模块内的异步改变
  const actions = {
    async  getLocation({commit},payload){
      const res=await sign(payload);
      console.log("每部分数据",res.data);
      res.data.map(item=>{
        item.address = JSON.parse(item.address);
        item.start_time = new Date(Number(item.start_time)).toLocaleString();
      })
      state.list = [...state.list, ...res.data];
    //   if (payload.page === 1) {
    //     state.list = res.data
    // } else {
    //     state.list = [...state.list, ...res.data];
    // }
      commit("updateLocation",res.data);
  }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  