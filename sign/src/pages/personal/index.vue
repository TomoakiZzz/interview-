<template>
  <div class="personal-warp">
    <div class="peoTop"><img src="../../imgs/people.png" class="peo"/></div>
    <div>
      <p><img src="../../imgs/shijian.png" class="peop"/>我的面试<span>></span></p>
      <p><img src="../../imgs/kefu.png" class="peop"/>客服中心<span>></span></p>
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from './store'

export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-warp{
  width:100%;
  height:100%;
}
.peoTop{
  width: 100%;
  height:300rpx;
  background:rgb(222, 236, 241);
}
.peo{
  width: 130rpx;
  height:130rpx;
  margin-top:10%;
  margin-left: 40%;
}
.peop{
  width: 50rpx;
  height:50rpx;
  line-height: 50rpx;
  margin-top: 10rpx;
}
p{
  width:100%;
  line-height: 40rpx;
  margin-top: 10%;
  border:2rpx solid #ccc;
  height:80rpx;
  span{
    float: right;
    line-height: 80rpx;
    font-size: 40rpx;
    margin-right: 20rpx;
  }
}
</style>

