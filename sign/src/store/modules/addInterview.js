import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js';
import {addAddress} from "../../service/index"
// 实例化一下
const qqMapSdk = new QQMapWX({
    key: 'UCGBZ-XN5KU-FUNVX-2JHW7-QJG3S-65F5I' // 必填
});

const state = {
    addressList: [],
    initial:{
        company:"",
        phone:"",
        address:{},
        description:""
    }
}

const actions = { 
    getSuggestion({ commit }, payload) {
        console.log(payload)
        qqMapSdk.getSuggestion({
            keyword: payload,
            success: res => {
                commit('getAddress',res.data)
                console.log('res...', res);
            }
        })
    },
    async addAddresslist({ commit }, {...payload}){
        // console.log(payload,"////////////////")
    //    let data = await addAddress(payload)
       return new Promise(async (resolve,reject)=>{
        payload.latitude = payload.address.location.lat;
        payload.longitude = payload.address.location.lng;

        payload.address = JSON.stringify(payload.address);
        console.log(payload,"////////////////")
        let result = await addAddress(payload);
        console.log(result)
        resolve(result);
       })
    }
}

const mutations = {
    
    getAddress(state,payload){
        console.log("123",payload)
        state.addressList = payload
    },
    setAddressContext(state,payload){
        state.initial.address=payload
    },
    clearState(state, payload){
        state.initial = {...state.initial, ...payload};
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
