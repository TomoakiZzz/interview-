<template>
  <div class="list-warp">
    <div class="test">
      <div class="testNav">
        <ul v-for="(item,index) in stateTab" :key="index">
          <li :class="{'selected':tab === index,'testTitle':true}" @click="changTab(index,item.status)">{{item.name}}</li>
        </ul>
      </div>
      <div class="container">
        <div>
          <!-- <div v-for="(ite,index) in list" :key="index">4444{{ite.company}}</div> -->
          <tabList :list="list"></tabList>
        </div>
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
      tab: 0,
      stateTab: [{
              "name":"未开始",
              "status":-1
            },{
            "name":"已打卡",
            "status":0
            },{
            "name":"已放弃",
            "status":1
            },{
            "name":"全部",
            "status":2
            }]
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
    changTab(index,status) {
      console.log(index);
      this.tab = index;
      // this.list.splice(0)
     this.interviewLists({status:status});
    }
  },
  // created() {
  //   this.interviewLists();
  // }
};
</script>


<style lang="scss" scoped>
.test {
  width: 100%;
  .testNav {
    height: 100rpx;
    border-top: 2rpx solid #ccc;
    border-bottom: 2rpx solid #ccc;
    line-height: 100rpx;
    position: fixed;
    display: flex;
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

