import { decrypt, updatePhoneNumber, getUseFingerprint } from "../../service/index"
// 模块所有的状态
const state = {
    openid: "",
    info: {},
    personPhoneNumber: null,
    isShowMask: true
}

// 模块内的同步改变
const mutations = {
    updataOpenid(state, payload) {
        state.openid = payload
    },
    getPersonPhoneNumber(state, payload) {
        let str = payload.slice(3, -3)
        let newStr = payload.replace(str, "*****")
        state.personPhoneNumber = newStr
    },
    changeIsShow(state, payload) {
        state.isShowMask = payload
    }
}

// 模块内的异步改变
const actions = {
    async decrypt({ commit, dispatch }, payload) {
        let data = await decrypt(payload);
        // console.log("data...", data)
        let phoneNumber = data.data.phoneNumber
        if (data.code === 0) {
            // console.log('指纹解锁功能', state.openid)
            wx.startSoterAuthentication({
                requestAuthModes: ['fingerPrint'],
                challenge: '123456',
                authContent: '请用指纹解锁',
                success: async res => {
                    // console.log(res, "生物验证")
                    let data = await (getUseFingerprint({ openid: state.openid, json_string: res.resultJSON, json_signature: res.resultJSONSignature }))
                    // console.log(data, '手机是否验证成功')
                    if (data.code === 0) {
                        await dispatch("updatePersonNumber", { phone: phoneNumber * 1 })
                        commit("getPersonPhoneNumber", phoneNumber)
                    }
                }
            })
        }

    },
    async updatePersonNumber({ commit }, payload) {
        let data = await updatePhoneNumber(payload)
        // console.log(data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}