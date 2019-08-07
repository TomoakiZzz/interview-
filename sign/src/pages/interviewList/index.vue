<template>
  <div class="list-warp">
    <div class="test">
      <div class="testNav">
        <ul v-for="(item,index) in stateTab" :key="index">
          <li :class="{'selected':tab === index,'testTitle':true}" @click="changTab(index)">{{item}}</li>
        </ul>
      </div>
      <div class="container">
        <div v-if="tab===0">0</div>
        <div v-else-if="tab===1">1</div>
        <div v-else-if="tab===2">2</div>
        <div v-else="tab===3">
          <div v-for="(ite,index) in list" :key="index" class="tabContent">
            <b>{{ite.address}}</b>
            <em>{{ite.company}}</em>
            <span>{{ite.create_time}}</span>
            <i>{{ite.id}}</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Use Vuex
import { mapState, mapActions } from "vuex";
// import all from "../all/main"
export default {
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
  .container {
  }
}
.tabContent{
  width:100%;
  height:auto;
  background: skyblue;
  margin-top: 4rpx;
}
</style>

