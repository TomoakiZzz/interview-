<template>
  <div class="main">
    <map id="map" show-location :markers="markers" :longitude="longitude" :latitude="latitude"></map>
    <div class="location" @click="location">
      <i class="iconfont icon-dingwei"></i>
    </div>
    <div class="goMy" @click="goMyView">
      <i class="iconfont icon-04f"></i>
    </div>
    <cover-view class="personal">
      <button></button>
    </cover-view>
    <div class="addInterview" @click="goAddInterview">添加面试</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      markers: []
    };
  },
  computed: {
    ...mapState({
      longitude: state => state.home.longitude,
      latitude: state => state.home.latitude
    })
  },
  methods: {
    ...mapActions({
      location: "home/getLocation"
    }),
    goMyView() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    goAddInterview() {
      wx.navigateTo({ url: "/pages/addInterview/main" });
    }
  },
  created() {
    this.location();
  }
};
</script>

<style lang="scss" scoped>
map {
  width: 100%;
  height: 100%;
}
.location {
  position: fixed;
  bottom: 150rpx;
  left: 30rpx;
  > i {
    font-size: 80rpx;
    color: #197dbf;
  }
}
.goMy {
  position: fixed;
  bottom: 150rpx;
  right: 30rpx;
  > i {
    font-size: 80rpx;
    color: #197dbf;
  }
}
.main {
  width: 100%;
  height: 100%;
  position: relative;
  .addInterview {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90rpx;
    background: #000;
    text-align: center;
    line-height: 90rpx;
    color: #fff;
  }
}
</style>