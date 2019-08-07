<template>
  <div class="personal-warp">

    <div class="peoTop">
      <div class="portrait">
        <i class="iconfont icon-04f"></i>
      </div>
    </div>

    <div class="perso">
      <div @click="mypersonal" class="personal">
        <i class="iconfont icon-icon-clock"></i>
        <p>我的面试</p>
        <span>></span>
      </div>

      <div  class="personal">
         <i class="iconfont icon-warning"></i>
        <p>客服中心</p>
        <span>></span>
      </div>
    </div>
    
  </div>
</template>

<script>
// Use Vuex
import store from "./store";

export default {
  computed: {
    count() {
      return store.state.count;
    }
  },
  methods: {
    increment() {
      store.commit("increment");
    },
    decrement() {
      store.commit("decrement");
    },
    mypersonal() {
      wx.navigateTo({
        url: "/pages/interviewList/main",
        success: result => {},
        fail: () => {},
        complete: () => {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.personal-warp {
  width: 100%;
  height: 100%;
}
.peoTop {
  width: 100%;
  height: 300rpx;
  background: rgb(246, 249, 250);
  .portrait{
    width: 100rpx;
    height: 180rpx;
    // background: #ccc;
    margin-left: 45%;
    .icon-04f {
      font-size: 120rpx;
      line-height: 250rpx;
    }
  }
}
.peo {
  width: 130rpx;
  height: 130rpx;
  margin-left: 40%;
}

.personal {
  width: 100%;
  line-height: 100rpx;
  height: 100rpx;
  margin-top: 40rpx;
  border-bottom:2rpx solid #ccc;
  border-top:2rpx solid #ccc;
  display: flex;
  .icon-icon-clock{
    flex:1;
    font-size:40rpx;
    margin-left: 20rpx;
  }
  .icon-warning{
    flex:1;
    font-size:50rpx;
    margin-left: 20rpx;
  }
  p{
    flex:8;
  }
  span{
    flex:1
  }
  
}
</style>

