<template>
  <div class="mainWarp">
    <form @submit="submit" :report-submit="highlight">
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
            <input
              name="phoneNumber"
              v-model="initial.phone"
              placeholder="请输入面试联系人电话"
              maxlength="11"
            >
          </label>
        </p>
        <p class="listItem">
          <span>面试时间</span>
          <label class="timeSelect">
            <picker
              mode="multiSelector"
              name="time"
              :value="info.date"
              :range="dateRange"
              @columnchange="columnChange"
            >
              <view class="picker">{{dateShow}}</view>
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
              v-model="initial.address.address"
            >
          </label>
        </p>
      </div>
      <h4 class="remarkTitle">备注信息</h4>
      <div class="remarkContent">
        <div>
          <textarea name="remark" v-model="initial.description"></textarea>
        </div>
      </div>
      <button form-type="submit" :class="highlight ? 'active':'sumbitBtn'">确定</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const moment = require("moment");
const range = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23
  ],
  ["00分", "10分", "20分", "30分", "40分", "50分"]
];
export default {
  data() {
    return {
      info: {
        date: [0, 0, 0]
      },
      time: "",
      count: 0
    };
  },
  computed: {
    ...mapState({
      initial: state => state.addInterview.initial
    }),

    // 处理面试日期
    dateRange() {
      let dateRange = [...range];
      // 如果时间是今天，过滤掉现在之前的小时
      if (!this.info.date[0]) {
        dateRange[1] = dateRange[1].filter(item => {
          return item > moment().hour();
        });
      } else {
        dateRange[1] = range[1];
      }
      // 格式化小时
      dateRange[1] = dateRange[1].map(item => {
        return item + "点";
      });
      // 计算当前日期之后的十天
      dateRange[0] = dateRange[0].map(item => {
        return (
          moment()
            .add(item, "days")
            .date() + "号"
        );
      });
      return dateRange;
    },
    // 显示的日期
    dateShow() {
      return moment()
        .add(
          moment().hour() == 23 ? this.info.date[0] - 1 : this.info.date[0],
          "d"
        )
        .add(this.info.date[1] + 1, "h")
        .minute(this.info.date[2] * 10)
        .format("YYYY-MM-DD HH:mm");
    },
    highlight() {
      if (!this.initial.company) {
        this.count = 0;
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.initial.phone)) {
        this.count = 1;
        return false;
      }
      if (!this.initial.address.address) {
        this.count = 2;
        return false;
      }
      return true;
    }
  },
  methods: {
    ...mapActions({
      addAddresslist: "addInterview/addAddresslist"
    }),
    ...mapMutations({
      clearState: "addInterview/clearState"
    }),

    // 监听多列选择器每列变化
    columnChange(e) {
      let { column, value } = e.target;
      let date = [...this.info.date];
      date[column] = value;
      this.info.date = date;
    },
    goAddressView() {
      wx.navigateTo({ url: "/pages/changeAddress/main" });
    },
    async submit(e) {
      console.log("form发生了submit事件，携带数据为：", e);
      if (this.highlight) {
        this.initial.start_time = moment(this.dateShow).unix() * 1000;
        this.initial.form_id = e.target.formId;
        let data = await this.addAddresslist(this.initial);
        console.log(data.code, "++++++");
        let This = this;
        if (data.code === 0) {
          wx.showModal({
            title: "温馨提示",
            content: data.msg,
            showCancel: true,
            confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
            confirmColor: "#197DBF",
            success(res) {
              if (res.confirm) {
                console.log(This.clearState);
                This.clearState({
                  form_id: "",
                  company: "",
                  address: "",
                  phone: ""
                });
                wx.navigateTo({ url: "/pages/interviewList/main" });
              }
            }
          });
        }
      } else {
        switch (this.count) {
          case 0:
            wx.showToast({
              title: "请输入公司名称",
              icon: "none",
              duration: 2000
            });
            break;
          case 1:
            wx.showToast({
              title: "请输入面试联系人的手机或座机",
              icon: "none",
              duration: 2000
            });
            break;
          case 2:
            wx.showToast({
              title: "请输入面试地址",
              icon: "none",
              duration: 2000
            });
            break;
          default:
            break;
        }
      }
    },
    remindMsg() {
      wx.showToast({
        title: "在面试前一个小时我们会通知你哦",
        icon: "none",
        duration: 2000
      });
    },
    watchInpValue(e) {
      console.log(e);
    }
  },

  created() {
    if (moment().hour() == 23) {
      this.info.date = [1, 0, 0];
    }
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
      > label {
        flex: 1;
        input {
          width: 100%;
        }
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
  .active {
    color: #fff;
    background: #197dbf;
    border-radius: 0;
    height: 80rpx;
    font-size: 32rpx;
  }
}
</style>
