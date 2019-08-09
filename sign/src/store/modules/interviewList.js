import {sign} from "../../service/index"
// 模块所有的状态
const state = {
    list:[]
  }
  
  // 模块内的同步改变
  const mutations = {
    updateLocation(state, payload){
      state.list = payload;
    }
  }
  
  // 模块内的异步改变
  const actions = {
    async  getLocation({commit},payload){
      const res=await sign(payload);
      console.log("每部分数据",res.data);
      res.data.map(item=>{
        if(!JSON.parse(item.address).address){
          item.address = item.address
        }else{
          item.address = JSON.parse(item.address).address
        }
        
        item.start_time = new Date(Number(item.start_time)).toLocaleString();
      })
      commit("updateLocation",res.data);
  }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  