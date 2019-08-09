<template>
  <div class="wrap">
    <ul v-if="list.length">
      <li v-for="item in list" :key="item.id" @click="details(item.id)">
        <p class="tabTop">
          <b class="firmName">{{item.company}}</b>
          <span :class="'tag'+(item.status+2)">{{item.status?item.status==1?'已放弃':'未开始':'已打卡'}}</span>
        </p>
        <p class="tabsection">{{item.address}}</p>
        <p class="tabBottom">
          <span class="interViewTime">面试时间: {{item.start_time}}</span>
          <span :class="'tag'+(2-item.status)">{{item.remind?'未提醒':'已提醒'}}</span>
        </p>
      </li>
    </ul>
    <p v-else class="none">当前分类还没有面试!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      times: {}
    };
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  component: {},
  //   onLoad(options){
  // console.log("555555555555555555555",options)
  //   },
  methods: {
    details(id) {
      wx.navigateTo({
        url: "/pages/detailInfo/main?id=" + id,
        success: res => {
          console.log("哈哈哈", res);
        },
        fail: () => {},
        complete: () => {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  padding-top: 88rpx;
}
li {
  border-top: 20rpx solid #eee;
  width: 100%;
  height: auto;
  background: #fff;
  padding: 10rpx 30rpx;
  box-sizing: border-box;
}
.tabTop {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 36rpx;
  b {
    font-size: 40rpx;
  }
  span {
    padding: 12rpx 10rpx;
    font-size: 26rpx;
  }
}
.tabsection {
  height: 40rpx;
  line-height: 40rpx;
  margin: 20rpx 0;
  font-size: 26rpx;
  color: #ccc;
}
.tabBottom {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  display: flex;
  justify-content: space-between;
  .interViewTime {
    font-size: 25rpx;
  }
  span:nth-child(2){ 
      padding: 0 10rpx;
      width: 116rx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      font-size: 25rpx;
  }
}
.tag1 {
  color: rgb(70, 68, 68);
  background: #f4f4f4;
}
.tag3 {
  color: rgb(241, 43, 76);
  background: #FEF0F0;
}
.none {
  margin-top: 30rpx;
}
</style>
