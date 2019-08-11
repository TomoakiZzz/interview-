<template>
  <div class="list-warp">
    <div class="test">
      <div class="testNav">
        <ul>
          <li v-for="(item,index) in stateTab" :key="index" @click="changTab(index,item.status)">
            <span :class="{'selected':tab === index}">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="container">
        <div>
          <tabList :list="list"></tabList>
          <div v-if="list.length && list.length>=10" class="hintMsg">
            <span v-if="hasMore">下拉加载更多数据...</span>
            <span v-if="!hasMore">没有更多数据了</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import tabList from "../../components/tabList";
import { async, timeout } from "q";

export default {
  components: {
    tabList
  },
  data() {
    return {
      tab: 0,
      stateTab: [
        {
          name: "未开始",
          status: -1
        },
        {
          name: "已打卡",
          status: 0
        },
        {
          name: "已放弃",
          status: 1
        },
        {
          name: "全部",
          status: 2
        }
      ]
    };
  },
  computed: {
    ...mapState({
      list: state => state.detailInfo.list,
      page: state => state.detailInfo.page,
      pageSize: state => state.detailInfo.pageSize,
      hasMore: state => state.detailInfo.hasMore
    })
  },
  onReachBottom() {
    if (this.hasMore) {
      wx.showLoading({
        title: "玩命加载中", //上拉的时候会出现一个提示框
        success: async () => {
          await this.updateLocation({ page: this.page + 1 });
          await this.interviewLists();
          wx.hideLoading();
        }
      });
    }
  },
  // onPullDownRefresh() {},
  methods: {
    ...mapActions({
      interviewLists: "detailInfo/getLocation"
    }),
    ...mapMutations({
      updateLocation: "detailInfo/updateLocation"
    }),
    changTab(index, status) {
      this.tab = index;
      this.updateLocation({ status, page: 1 });
      this.interviewLists();
    }
  },
  onLoad() {
    this.interviewLists({
      status: -1,
      page: this.page,
      pageSize: this.pageSize
    });
  }
};
</script>


<style lang="scss" scoped>
.test {
  width: 100%;
  .testNav {
    width: 100%;
    height: 88rpx;
    border-top: 2rpx solid #ccc;
    position: fixed;
    background: #fff;
    top: 0;
    ul {
      width: 100%;
      height: 88rpx;
      display: flex;
      font-size: 30rpx;
      li {
        flex: 1;
        line-height: 86rpx;
        text-align: center;
      }
      li > span {
        display: inline-block;
        width: auto;
        height: 100%;
      }
    }
    .selected {
      color: #368dc7;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #368dc7;
      }
    }
  }
}
.hintMsg {
  width: 100%;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  border-top: 1px solid #ccc;
}
</style>

