<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 00:01:11
 * @FilePath: \vue-wyy-music\src\views\singerList\index.vue
 * @Description: 
-->
<template>
  <div   class='singer-wrap'>
    <SingerFilter />
   <div class="singer-list">
     <SingerCover v-for="singer in singerList"  :key="singer.id" :singer="singer"/>
   </div>
  </div>
</template>

<script>
export default {
  name: 'SingerList',
  props: {
  },
  data () {
    return {
      singerList:[],
    }
  },
  created () { 

  },
  computed: { 

  },
  components: { 
    SingerFilter:()=>import('./components/SingerFilter.vue'),
    SingerCover:()=>import('./components/SingerCover.vue')
  },
  methods: {
    async querySingerList(query){
      const { artists } = await this.$http('/artist/list'+query+'&limit=30')
      this.singerList = artists
    }
  },
  mounted () { 

  },
  watch: { 
    '$route.query':{
      deep:true,
      immediate:true,
      handler(query){
        let { area=-1, type=-1, initial=-1 } = query
        let queryStr = '?area='+area+'&type='+type+'&initial='+ initial
        this.querySingerList(queryStr)
      }
    }
  }
}
</script>
<style scoped lang='scss'>
 .singer-list{
   display: grid;
   grid-template-columns:repeat(6,1fr);
   grid-gap: 20px;
 }
</style>