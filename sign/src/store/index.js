import Vue from 'vue';
import Vuex from 'vuex';
import CreateLogger from 'vuex/dist/logger';

// 引入store子模块
import home from './modules/home';
import addInterview from "./modules/addInterview"
import clockIn from './modules/clockIn';
import interviewList from './modules/interviewList';
import detailInfo from "./modules/detailInfo";
import updatedata from "./modules/detailInfo";
import user from "./modules/user"
Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    home,
    addInterview,
    clockIn,
    interviewList,
    detailInfo,
    updatedata,
    user
  },
  plugins: [CreateLogger()]
})