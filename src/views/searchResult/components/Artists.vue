<template>
  <div 
    v-loading="loading" 
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..." 
  >
    <div class="artist-result">
      <SingerCover v-for="singer in artists"  :key="singer.id" :singer="singer" showAlias/>
    </div>
    <Pagination v-bind="pageOption" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import page from '@/mixins/page'
export default {
  name: 'Artists',
  props: {
  },
  mixins: [page],
  data () {
    return {
      loading: false,
      artists: [],
    }
  },
  computed: { 

  },
  watch: { 

  },
  components: { 
    SingerCover:() => import('@/views/singerList/components/SingerCover.vue')
  },
  methods: {
   async search() {
      this.loading = true
      let { offset } = this;
      let { kw } = this.$route.query;
      if(kw){
        let { result: { artists = [], artistCount = 0} } = await this.$http( `/cloudsearch?keywords=${kw}&type=100&limit=10&offset=${offset}` );
        this.artists = artists;
        this.pageOption.total = artistCount
      }
      this.loading = false
    },
       //当前页变化
    handleCurrentChange(current){
      this.currentChange(current)
      this.search()
    },
  },
  created () { 
    this.search()
  },
  mounted () { 

  },
}
</script>
<style scoped lang='scss'>
 .artist-result{
   display: grid;
   grid-template-columns:repeat(10,1fr);
   grid-gap: 20px;
 }
</style>