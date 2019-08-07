<template>
  <div class="clockIn">
    <div class="map">
      <map id="map" 
      :markers="markers" 
      :longitude="longitude" 
      :latitude="latitude" 
      show-location
      ></map>
      <cover-view class="location" @click="orientation">
        <button>定位</button>
      </cover-view>
    </div>
    <div class="locations">
      <span>
        <img src="../../imgs/people.png" alt class="img" />
      </span>
      <b>
        <img src="../../imgs/location.png" alt class="img" @click="clicklocation" />
      </b>
    </div>
    <div class="bottom">
      <button @click="addinterview" class="addinterview">添加面试</button>
    </div>
  </div>
</template>

<script>
// Use Vuex
import { mapState, mapActions } from "vuex";
// console.log(mapState,mapActions)
export default {
  data() {
    return {
      markers: []
    };
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
    addinterview(e) {
      //添加面试
      console.log(e);
    },
    regionchange: e => {
      console.log(e);
    },
    clicklocation: e => {
      wx.navigateTo({
        url: "/pages/personal/main",
        success: result => {},
        fail: () => {},
        complete: () => {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.clockIn {
  width: 100%;
  height: 100%;
  background: skyblue;
}
.icon-error{
   content: "\e647";
   font-size:30px;
} 
.location {
  position: fixed;
  top: 30rpx;
  left: 30rpx;
}
.map {
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
}
.locations {
  width: 100%;
  position: fixed;
  top: 80%;
  display: flex;
  span {
    flex: 8;
    .img {
      width: 80rpx;
      height: 80rpx;
      margin-left: 40rpx;
    }
  }
  b {
    .img {
      width: 80rpx;
      height: 80rpx;
      margin-right: 40rpx;
    }
  }
}
.addinterview {
  width: 100%;
  background: #000;
  color: #fff;
  bottom: 0;
  position: fixed;
}
</style>

