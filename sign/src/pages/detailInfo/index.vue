<template>
  <div class="list-warp">
    <div class="detailConText">
      <div>
        <span>面试地址 :</span>
        <label>{{lists.address}}</label>
      </div>
      <div>
        <span>面试时间 :</span>
        <label>{{lists.start_time}}</label>
      </div>
      <div>
        <span>联系方式 :</span>
        <label>{{lists.phone}}</label>
      </div>
      <div>
        <span>是否提醒 :</span>
        <label v-if="lists.remind=== -1">未提醒</label>
        <label v-else>已提醒</label>
      </div>
      <div>
        <span>面试状态 :</span>
        <label v-if="lists.status===-1">未开始</label>
        <label v-else-if="lists.status===0">已打卡</label>
        <label v-else>已放弃</label>
      </div>
      <div v-if="lists.status!==1">
        <span>取消提醒 :</span>
        <switch @change="changeRemind" name="switch"/>
      </div>
    </div>
    <div v-if="lists.status!==1" class="changeCard">
      <button @tap="punchCard">去打卡</button>
      <button @tap="abandon">放弃面试</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      lists: state => state.detailInfo.lists,
      addressId: state => state.detailInfo.addressId
    })
  },

  methods: {
    ...mapActions({
      detailInfolists: "detailInfo/getDeatail",
      updatedata: "updatedata/getUpdate",
      changeDetail: "detailInfo/changeDetail"
    }),
    ...mapMutations({
      getAddressId: "detailInfo/getAddressId"
    }),
    changeRemind(e, options) {
      console.log(e, options);
      if (e.target.value) {
        this.changeDetail({ context: { remind: -1 }, id: this.addressId * 1 });
      } else {
        this.changeDetail({ context: { remind: 1 }, id: this.addressId * 1 });
      }
    },
    punchCard() {
      wx.wx.navigateTo({
        url: '/pages/punchCard/main',
        success: (result)=>{
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    },
    abandon() {
      wx.showModal({
        title: "温馨提示",
        content: "确定要放弃本次面试吗？",
        showCancel: true,
        confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: "#197DBF",
        success: res => {
          if (res.confirm) {
            this.changeDetail({
              context: { status: 1 },
              id: this.addressId * 1
            });
          }
        }
      });
    }
  },
  onLoad(options) {
    console.log(options);
    this.detailInfolists(options.id * 1);
    this.getAddressId(options.id * 1);
  }
};
</script>

<style lang="scss" scoped>
.detailConText {
  padding-left: 30rpx;
  font-size: 28rpx;
  > div {
    line-height: 88rpx;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    > span {
      color: #808080;
      width: 170rpx;
    }
    > label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.changeCard {
  padding-top: 46rpx;
  display: flex;
  justify-content: space-between;
  button {
    width: 330rpx;
    height: 96rpx;
    line-height: 96rpx;
    border: 0;
    border-radius: 0;
    outline: none;
    color: #fff;
    font-size: 32rpx;
  }
  button:first-child {
    background: #197dbf;
  }
  button:last-child {
    background: #dc4e42;
  }
}
</style>

