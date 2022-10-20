<template>
  <div class="all-mv-list"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
  >
     <MvFilter/>
   <div class="mv-list video-wrap">
      <MvItemBox v-for="mv in mvList" :key="mv.id" :mv="mv" class="video-item"/>
   </div>
  </div>
</template>

<script>
export default {
  name: 'AllMvList',
  props: {
  },
  data () {
    return {
      loading: false,
      mvList: [],
    }
  },
  computed: { 

  },
  watch: { 
     '$route.query':{
      deep:true,
      immediate:true,
      handler(query){
       function allToStr(str){
          return str === '全部' ? '' : str
        }
        let { area='全部', type='全部', order='全部' } = query
        let areaStr = allToStr(area)
        let typeStr = allToStr(type)
        let orderStr = allToStr(order)
        let queryStr = 'area='+areaStr+'&type='+typeStr+'&order='+orderStr
        this.getMvListByCate(queryStr)
      }
    }
  },
  components: { 
    MvFilter: () => import('./MvFilter.vue'),
    MvItemBox: () => import('./MvItemBox.vue'),
  },
  methods: {
    //处理全部
    async getMvListByCate(query) {
      this.loading = true;
      let { data } = await this.$http(`/mv/all?offset=0&limit=10&${query}`);
      this.mvList = data;
      this.loading = false;
    },
  },
  created () { 

  },
  mounted () { 

  },
}
</script>
<style scoped lang='scss'>
@import '../../searchResult/style/video.scss';
</style>