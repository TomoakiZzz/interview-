import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js';

// 实例化一下
const qqMapSdk = new QQMapWX({
    key: 'UCGBZ-XN5KU-FUNVX-2JHW7-QJG3S-65F5I' // 必填
});

const state = {
    address: [],
    initial:{
        company:"",
        phoneNumber:"",
        addressContext:"",
        remark:""
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
    }
}

const mutations = {
    getAddress(state,payload){
        console.log("123",payload)
        state.address = payload
    },
    setAddressContext(state,payload){
        state.initial.addressContext=payload
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
