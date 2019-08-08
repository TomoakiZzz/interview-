<template>
  <div class="personal-warp">
    <div class="peoTop">
      <div class="portrait">
        <img :src="userInfo.avatarUrl" class="index_img" alt />
      </div>
      <p class="userName">{{userInfo.nickName}}</p>
    </div>

    <div class="perso">
      <div
        @click="getUserInfoClick"
        open-type="getUserInfo"
        @getuserinfo="getUserInfo"
        class="personal"
      >
        <i class="iconfont icon-icon-clock"></i>
        <p>我的面试</p>
        <span>></span>
      </div>

      <div class="personal">
        <i class="iconfont icon-warning"></i>
        <p>客服中心</p>
        <span>></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// console.log(mapState,mapActions)
export default {
  data() {
    return {
      markers: [],
      userInfo: {},
      isShow: false
    };
  },
  beforeMount() {
    this.handleGetUserInfo();
  },
  computed: {
    ...mapState({
      longitude: state => state.clockIn.longitude,
      latitude: state => state.clockIn.latitude
    })
  },
  methods: {
    ...mapActions({
      orientation: "clockIn/getLocation"
    }),
    handleGetUserInfo() {
      wx.getUserInfo({
        success: data => {
          console.log(data);
          this.userInfo = data.userInfo;
          this.isShow = true;
        },
        fail: () => {
          console.log("获取失败");
        }
      });
    },
    getUserInfoClick() {
      wx.navigateTo({
        url: "/pages/interviewList/main",
        success: result => {},
        fail: () => {},
        complete: () => {}
      });
    },
    getUserInfo(data) {
      console.log(data);
      //判断用户是否授权
      if (data.mp.detail.rawData) {
        //用户授权
        this.handleGetUserInfo();
      }
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
  .portrait {
    width: 100rpx;
    height: 180rpx;
    // background: #ccc;
    margin-left: 45%;
    .index_img {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      font-size: 120rpx;
      line-height: 250rpx;
      margin-top: 30rpx;
    }
  }
}
.userName {
  font-size: 40rpx;
  margin-top: 30rpx;
  margin-left: 48%;
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
  border-bottom: 2rpx solid #ccc;
  border-top: 2rpx solid #ccc;
  display: flex;
  .icon-icon-clock {
    flex: 1;
    font-size: 40rpx;
    margin-left: 20rpx;
  }
  .icon-warning {
    flex: 1;
    font-size: 50rpx;
    margin-left: 20rpx;
  }
  p {
    flex: 8;
  }
  span {
    flex: 1;
  }
}
</style>

