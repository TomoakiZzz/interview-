<template>
  <div class="personal-warp">
    <div class="peoTop">
      <div class="portrait">
        <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" class="index_img" alt>
        <i v-else class="iconfont icon-04f person"></i>
      </div>
      <p v-if="personPhoneNumber" class="userName">{{personPhoneNumber}}</p>
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="getPhone">获取用户手机号</button>

      <button v-if="showSetting" open-type="openSetting" class="getPhone">打开设置页面</button>

      <p class="marginBottom"></p>
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

      <div class="personal" @click="serviceClick">
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
      isShow: false,
      showSetting: false
    };
  },
  beforeMount() {
    this.handleGetUserInfo();
  },
  computed: {
    ...mapState({
      personPhoneNumber:state=>state.user.personPhoneNumber
    })
  },
  methods: {
    ...mapActions({
      orientation: "clockIn/getLocation",
      decrypt: "user/decrypt"
    }),
    getPhoneNumber(e) {
      console.log("e....", e);
      let { encryptedData, iv } = e.target;
      if (encryptedData) {
        this.decrypt({
          encryptedData,
          iv
        });
      } else {
        this.showSetting = true;
        wx.openSetting({ success: res => {} });
      }
    },
    serviceClick() {
      wx.showModal({
        title: "微信开发者工具不支持客服中心",
        showCancel: false
      });
    },
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
.marginBottom {
  height: 40rpx;
}
.peoTop {
  width: 100%;
  height: auto;
  background: rgb(246, 249, 250);
  .portrait {
    width: 100rpx;
    height: 180rpx;
    // background: #ccc;
    position: relative;
    margin-left: 45%;
    .index_img {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      font-size: 120rpx;
      line-height: 250rpx;
      margin-top: 30rpx;
    }
    .person {
      font-size: 150rpx;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }
  }
}
.getPhone {
  margin-top: 40rpx;
  font-size: 30rpx;
  width: 40%;
  border: 2rpx solid #ccc;
}
.userName {
  font-size: 40rpx;
  margin-top: 30rpx;
  width: 100%;
  text-align: center;
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

