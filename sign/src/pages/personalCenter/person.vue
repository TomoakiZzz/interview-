<template>
  <div class="mainWarp">
    <div class="interviewList">
      <p class="interviewItem">
        <span>面试地址:</span>
        <label>北京市海淀区上地软件园南路57号</label>
      </p>
      <p class="interviewItem">
        <span>面试时间:</span>
        <label>2019-08-06 17:00</label>
      </p>
      <p class="interviewItem">
        <span>联系方式:</span>
        <label>15532568521</label>
      </p>
      <p class="interviewItem">
        <span>是否提醒:</span>
        <label>未提醒</label>
      </p>
      <p class="interviewItem">
        <span>面试状态:</span>
        <label>未开始</label>
      </p>
      <p class="interviewItem">
        <span>取消提醒:</span>
        <label></label>
      </p>
    </div>
    <div class="interviewBtn">
      <span>去打卡</span>
      <span>放弃面试</span>
    </div>
  </div>
</template>

<script>
// Use Vuex
// import store from "./store";

export default {
  computed: {
    // count() {
    //   return store.state.count;
    // }
  },
  methods: {
    // increment() {
    //   store.commit("increment");
    // },
    // decrement() {
    //   store.commit("decrement");
    // }
  }
};
</script>

<style lang="scss" scoped>
  .mainWarp{
    .interviewList{
      border-top: 1px solid #eee;
      padding-left: 30rpx;
      .interviewItem{
        width: 100%;
        height: 80rpx;
        border-bottom: 1px solid #eeeeee;
        line-height: 80rpx;
        font-size: 26rpx;
        display: flex;
        >span{
          color:#7D7D7D;
          width: 160rpx;
        }
      }
    }
    .interviewBtn{
      border-top: 1px solid #eee;
      padding: 60rpx 28rpx 0;
      display: flex;
      justify-content: space-between;
      >span{
        width: 330rpx;
        height: 96rpx;
        text-align: center;
        line-height: 96rpx;
        color:#fff;
      }
      >span:first-of-type{
        background: #197DBF;
      }
      >span:last-of-type{
        background:#DC4E42;
      }
    }
  }
</style>
