import Vue from 'vue';
import Vuex from 'vuex';
import CreateLogger from 'vuex/dist/logger';

// 引入store子模块
import clockIn from './modules/clockIn';
import interviewList from './modules/interviewList';
Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    clockIn,
    interviewList
  },
  plugins: [CreateLogger()]
})