<template>
  <div class="list-warp">
    <div class="test">
      <div class="testNav">
        <ul v-for="(item,index) in stateTab" :key="index">
          <li :class="{'selected':tab === index,'testTitle':true}" @click="changTab(index)">{{item}}</li>
        </ul>
      </div>
      <div class="container">
        <div>
          <tabList :list="list"></tabList>
        </div>
        <!-- <div v-else-if="tab===1">
          <coreDumped></coreDumped>
        </div>
        <div v-else-if="tab===2">
          <notBegun></notBegun>
        </div>
        <div v-else="tab===3">
          <div v-for="(ite,index) in list" :key="index" class="tabContent">
            <div class="all">
                <b>{{ite.address}}</b>
                <em>{{ite.company}}</em>
                <span>{{ite.create_time}}</span>
                <i>{{ite.id}}</i>
            </div>
           
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import tabList from "../../components/tabList"

export default {
  components: {
    tabList
  },
  data() {
    return {
      tab: 3,
      stateTab: ["未开始", "已打卡", "已放弃", "全部"]
    };
  },
  computed: {
    ...mapState({
      list: state => state.interviewList.list
    })
  },

  methods: {
    ...mapActions({
      location: "interviewList/getLocation"
    }),
    changTab(index) {
      console.log(index);
      this.tab = index;
      if (index == 3) {
      }
    }
  },
  created() {
    this.location();
  }
};
</script>


<style lang="scss" scoped>
.test {
  width: 100%;
  .testNav {
    padding: 0 20rpx;
    height: 100rpx;
    border-top: 2rpx solid #ccc;
    border-bottom: 2rpx solid #ccc;
    line-height: 100rpx;
    display: flex;
    position: fixed;
    background: #fff;
    top:0;
    ul {
      width: 100%;
      height: 100rpx;
      display: flex;
      text-align: center;
      li {
        flex: 2;
      }
    }
    .testTitle {
      flex: 1;
      text-align: center;
    }
    .selected {
      color: blue;
      border-bottom: 1px solid blue;
    }
  }
}
.tabContent{
  width:100%;
  height:auto;
  background: skyblue;
  margin-top: 4rpx;
}
</style>

