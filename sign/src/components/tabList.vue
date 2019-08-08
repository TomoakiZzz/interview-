<template>
  <div class="wrap">
   <ul v-if="list.length">
      <li v-for="item in list" :key="item.id" @click="goDetail(item.id)">
        <p class="tabTop">
          <b class="firmName">{{item.company}}</b>
          <span :class="'tag'+(item.status+2)">{{item.status?item.status==1?'已放弃':'未开始':'已打卡'}}</span>
        </p>
        <p class="tabsection">地址{{item.address.address}}</p>
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
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
   
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
  background:skyblue;
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
    background: red;
    .interViewTime{
        width:240%;
        background: orange;
    }
    span{
        :nth-child(2){
            text-align: center;
        }
    }
}
.tag3{
    color:red;
}
</style>
