<template>
  <div class="addressMain">
    <div class="addressChange">
      <span>北京</span>
      <label>
        <input placeholder="面试地址" v-model="searchValue" @input="searchAddress">
      </label>
    </div>
    <div v-if="address.length!==0" class="addressList">
      <!-- {{address}} -->
      <div
        class="addressItem"
        v-for="item in address"
        :key="item.id"
        @click="goAddInterview(item)"
      >
        <div class="addressIcon">
          <span></span>
        </div>
        <div class="addressCon">
          <h5>{{item.title}}</h5>
          <p>{{item.address}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Use Vuex
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      address: state => state.addInterview.addressList,
    })
  },
  data() {
    return {
      searchValue: ""
    };
  },
  methods: {
    ...mapActions({
      getSuggestion: "addInterview/getSuggestion"
    }),
    ...mapMutations({
      getAddress: "addInterview/getAddress",
      setAddressContext:"addInterview/setAddressContext"
    }),
    searchAddress(e) {
      // console.log(e)
      function debounce(func, wait) {
        let timeout;
        return function() {
          let context = this;
          let args = arguments;

          if (timeout) clearTimeout(timeout);

          timeout = setTimeout(() => {
            func.apply(context, args);
          }, wait);
        };
      }
      this.searchValue = e.mp.detail.value;
      if (e.mp.detail.value.length === 0) {
        debounce(this.getAddress([]), 1000);
      }
      debounce(this.getSuggestion(e.mp.detail.value), 1000);
    },
    goAddInterview(address) {
      // console.log(address);
      this.setAddressContext(address)
      wx.redirectTo({
        url: `/pages/addInterview/main`
      });
    }
  },
  created() {
    this.getAddress([]);
  }
};
</script>

<style lang="scss" scoped>
.addressMain {
  height: 100%;
  .addressChange {
    width: 100%;
    display: flex;
    font-size: 32rpx;
    height: 88rpx;
    align-items: center;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    > span {
      width: 144rpx;
      text-align: center;
      position: relative;
    }
    > span:after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      width: 1px;
      height: 32rpx;
      background: #ccc;
      transform: translateY(-50%);
    }
    > label {
      padding-left: 20rpx;
    }
  }
}
.addressList {
  .addressItem {
    width: 100%;
    height: 100rpx;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    .addressIcon {
      width: 132rpx;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      span {
        width: 38rpx;
        height: 36rpx;
        margin-right: 32rpx;
        background: url("../../imgs/icon.png") no-repeat;
        background-size: cover;
      }
    }
    .addressCon {
      font-size: 32rpx;
      flex: 1;
      p {
        font-size: 22rpx;
        color: #cdcdcd;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
