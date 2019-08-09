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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import tabList from "../../components/tabList";

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
          status: "2"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      list: state => state.interviewList.list
    })
  },

  methods: {
    ...mapActions({
      interviewLists: "interviewList/getLocation"
    }),
    changTab(index, status) {
      this.tab = index;
      if(typeof status === "number"){
        this.interviewLists({ status: status });
      }else{
        this.interviewLists();
      }
      
    }
  },
  onLoad() {
    this.interviewLists({ status: -1 });
  },
  mounted() {
    this.interviewLists({ status: -1 });
  },
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
      li>span{
        display:inline-block;
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
</style>

