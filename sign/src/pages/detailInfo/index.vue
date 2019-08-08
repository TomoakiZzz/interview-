<template>
  <div class="list-warp">
    
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex";


export default {
 
  data() {
    return {
     
    };
  },
  computed: {
    ...mapState({
      lists: state => state.detailInfo.lists
    })
  },

  methods: {
    ...mapActions({
      detailInfolists: "detailInfo/getLocation",
      updatedata:"updatedata/getUpdate"
    })
  },
  created() {
    this.detailInfolists();
    this.updatedata();
  }
};
</script>


<style lang="scss" scoped>

</style>

