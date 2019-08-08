<template>
  <div class="wrap">
   <ul v-if="list.length">
      <li v-for="item in list" :key="item.id" @click="details(item.id)">
        <p class="tabTop">
          <b class="firmName">{{item.company}}</b>
          <span :class="'tag'+(item.status+2)">{{item.status?item.status==1?'已放弃':'未开始':'已打卡'}}</span>
        </p>
        <p class="tabsection">{{item.address.address}}</p>
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
  
  data(){
    return{
      times:{}
    }
  },
  props: {
    list: {
      type: Array,
      default: []
    }
    
  },
  component:{
    
  },
  onLoad(options){
console.log("555555555555555555555",options)
  },
  methods: {
   details(id){
    wx.navigateTo({
       url: '/pages/detailInfo/main?id='+id,
       success: (res)=>{
         console.log("哈哈哈",res)
       },
       fail: ()=>{},
       complete: ()=>{}
     });
   }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  padding-top: 88rpx;
}
li{
  border-top: 20rpx solid #eee;
  // margin-top: 20rpx;
  width: 100%;
  height:auto;
  background:rgb(250, 249, 249);
  padding: 10rpx 30rpx;
  box-sizing: border-box;
}
.tabTop{
    width:100%;
    display:flex;
    b{
        flex:7;
        font-size: 40rpx;
    }
    span{
        flex:3;
    }
}
.tabsection{
    height:40rpx;
    line-height: 40rpx;
    margin:20rpx 0;
}
.tabBottom{
    width:100%;
    height:100rpx;
    line-height: 100rpx;
    display:flex;
    .interViewTime{
        width:280%;
        font-size: 25rpx;
    }
    span{
        :nth-child(2){
            text-align: center;
        }
    }
}
.tag3{
    background: #ccc;
    padding:10rpx 2rpx;
    margin-left: 20%;
    height: 70rpx;
    line-height: 70rpx;
    color:rgb(70, 68, 68);
    text-align: center;
}
.tag1{
   background: pink;
   height:60%;
   line-height: 60rpx;
   margin-top: 20rpx;
    margin-left: 20%;
    color:rgb(241, 43, 76);
    text-align: center;
}
.none{
  margin-top: 30rpx;
}
</style>
