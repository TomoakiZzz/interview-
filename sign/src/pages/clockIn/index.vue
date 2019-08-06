<template>
  <div class="clockIn">
    <div class="map">
     <map 
      id="map" 
      show-location 
      ></map>
    </div>
    <div class="location">
      <span><img src="../../imgs/people.png" alt="" class="img"></span>
      <b><img src="../../imgs/location.png" 
          alt="" 
          class="img"
          @click="clicklocation"
      ></b>
    </div>
    <div class="bottom">
      <button @click="addinterview">添加面试</button>
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from './store'

export default {
  data(){
    return {

    }
  },
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    addinterview(e){//添加面试
      console.log(e)
    },
    regionchange: (e) => {
      console.log(e)
   },
   clicklocation:(e)=>{
     wx.navigateTo({
       url: '/pages/personal/main',
       success: (result)=>{
         
       },
       fail: ()=>{},
       complete: ()=>{}
     });
   }
  }
}
</script>

<style lang="scss" scoped>
.clockIn{
  width:100%;
  height:100%;
  background: skyblue;
}
.map{
  width:100%;
  height:100%;
}
#map{
  width:100%;
  height:100%;
}
.location{
  width:100%;
  position: fixed;
  top:80%;
  display: flex;
  span{
    flex:8;
    .img{
      width:80rpx;
      height:80rpx;
      margin-left: 40rpx;
    }
  }
  b{
    .img{
      width:80rpx;
      height:80rpx;
      margin-right: 40rpx;
    }
  }
}
button{
  width:100%;
  background: #000;
  color:#fff;
  bottom:0;
  position: fixed;
}
</style>

