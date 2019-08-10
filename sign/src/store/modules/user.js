import {decrypt,updatePhoneNumber} from "../../service/index"
// 模块所有的状态
const state = {
    openid:"",
    info:{},
    personPhoneNumber:null
}

// 模块内的同步改变
const mutations = {
  updataOpenid(state,payload){
      state.openid=payload
  },
  getPersonPhoneNumber(state,payload){
      console.log(payload,"获取手机号")
    state.personPhoneNumber = payload
  }
}

// 模块内的异步改变
const actions = {
    async decrypt({commit,dispatch},payload){
        let data=await decrypt(payload);
        console.log("data...",data)
        dispatch("updatePersonNumber",{phone:data.data.phoneNumber*1})
        commit("getPersonPhoneNumber",data.data.phoneNumber)
    },
    async updatePersonNumber({commit},payload){
        let data = await updatePhoneNumber(payload)
        console.log(data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}