<template>
  <div class="mainWarp">
    <form @submit="formSubmit">
      <header class="header">面试信息</header>
      <div class="interviewList">
        <p class="listItem">
          <span>公司名称</span>
          <label>
            <input name="company" v-model="initial.company" placeholder="请输入公司名称">
          </label>
        </p>
        <p class="listItem">
          <span>公司电话</span>
          <label>
            <input name="phoneNumber" v-model="initial.phoneNumber" placeholder="请输入面试联系人电话" maxlength="11">
          </label>
        </p>
        <p class="listItem">
          <span>面试时间</span>
          <label class="timeSelect">
            <picker
              mode="multiSelector"
              name="time"
              :value="multiIndex"
              :range="getTime"
              @change="bindMultiPickerChange"
            >
              <view class="picker">{{time}}</view>
            </picker>
            <i class="iconfont icon-warning" @click="remindMsg"></i>
          </label>
        </p>
        <p class="listItem">
          <span>面试地址</span>
          <label>
            <input
              name="address"
              placeholder="请选择面试地址"
              disabled
              @click="goAddressView"
              v-model="initial.addressContext"
            >
          </label>
        </p>
      </div>
      <h4 class="remarkTitle">备注信息{{}}</h4>
      <div class="remarkContent">
        <div>
          <textarea name="remark" v-model="initial.remark"></textarea>
        </div>
      </div>
      <button form-type="submit" class="sumbitBtn">确定</button>
    </form>
  </div>
</template>

<script>
// Use Vuex
// import store from "./store";
import {mapState} from "vuex"
export default {
  data() {
    return {
      multiIndex: [0, 0, 0],
      time: "",
      address: ""
    };
  },
  computed: {
    ...mapState({
      initial: state=>state.addInterview.initial
    }),
    getTime() {
      let multiArray = [[], [], []];
      let day = new Date().getDate();
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let hours = new Date().getHours();
      let d = new Date(year, month, 0).getDate();
      let remainDay = d - day;
      for (var i = 0; i <= remainDay; i++) {
        day++;
        multiArray[0].push(`${day}号`);
      }
      multiArray[0].splice(0, 1);
      for (var i = 0; i <= 24; i++) {
        hours++;
        if (hours > 24) {
          hours = 0;
        }
        multiArray[1].push(hours + "点");
      }
      multiArray[1].splice(0, 1);
      for (var i = 0; i < 6; i++) {
        multiArray[2].push(`${i}0分`);
      }
      multiArray[2].splice(0, 1);
      return multiArray;
    },
    highlight(){
      if(!this.initial.company){
        return false
      }
      
    }
  },
  methods: {
    bindMultiPickerChange(e) {
      console.log(789, e.mp.detail.value);
      this.multiIndex = e.mp.detail.value;
      let indexArr = e.mp.detail.value;
      let showTime = [];
      let data = new Date();
      let year = data.getFullYear(); //获取完整的年份(4位,1970-????)
      let month = data.getMonth() + 1;
      this.getTime.map((item, index) => {
        return showTime.push(item[indexArr[index]]);
      });
      this.time = `${year}-${
        month > 10 ? month : "0" + month
      }-${showTime[0].substr(showTime[0].length - 2, 1)} 
      ${showTime[1].substr(showTime[1].length - 2, 1)}:${showTime[2].substr(
        showTime[2].length - 2,
        1
      ) + "0"}`;
    },
    goAddressView() {
      wx.navigateTo({ url: "/pages/changeAddress/main" });
    },
    formSubmit(e) {
      console.log("form发生了submit事件，携带数据为：", e.mp.detail.value);
      
    },
    remindMsg() {
      wx.showToast({
        title: "在面试前一个小时我们会通知你哦",
        icon:"none",
        duration: 2000
      });
    },
    watchInpValue(e){
      console.log(e)
    } 
  },
  
  created() {
    let getCurrentTime = () => {
      let data = new Date();
      let year = data.getFullYear(); //获取完整的年份(4位,1970-????)
      let month = data.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      let day = data.getDate(); //获取当前日(1-31)
      let hours = data.getHours();
      let minutes = data.getMinutes();
      let newMinutes = Math.floor(minutes / 10);
      this.time = `${year}-${month > 10 ? month : "0" + month}-${
        day > 10 ? day : "0" + day
      } ${hours}:${newMinutes + "0"}`;
    };
    getCurrentTime();
  }
};
</script>

<style lang="scss" scoped>
.mainWarp {
  width: 100%;
  .header {
    width: 100%;
    height: 80rpx;
    background: #f6f6f6;
    line-height: 80rpx;
    font-size: 32rpx;
    padding: 0 30rpx;
    border-bottom: 1px solid #efefef;
  }
  .interviewList {
    padding-left: 30rpx;
    .listItem {
      width: 100%;
      height: 80rpx;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      > span {
        width: 160rpx;
      }
      .timeSelect {
        flex: 1;
        display: flex;
        justify-content: space-between;
        i {
          margin-right: 30rpx;
          font-size: 44rpx;
          color: #197dbf;
        }
      }
      input {
        width: 100%;
      }
    }
  }
  .remarkTitle {
    width: 100%;
    height: 80rpx;
    background: #f6f6f6;
    line-height: 80rpx;
    padding-left: 32rpx;
    font-size: 32rpx;
  }
  .remarkContent {
    padding: 15rpx 15rpx 25rpx;
    > div {
      width: 100%;
      height: 200rpx;
      border: 1px solid #c6c6c6;
      border-radius: 2px;
      > textarea {
        width: 100%;
        height: 100%;
      }
    }
  }
  .sumbitBtn {
    width: 100%;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    background: #999999;
    color: #fff;
    font-size: 32rpx;
    border-radius: 0;
  }
}
</style>
