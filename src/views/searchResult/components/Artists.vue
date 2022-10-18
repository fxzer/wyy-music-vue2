<template>
  <div 
    v-loading="loading" 
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..." 
  >
    <div class="artist-result">
      <SingerCover v-for="singer in filterList"  :key="singer.id" :singer="singer" showAlias/>
    </div>
    <Pagination v-bind="pageOption" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import page from '@/mixins/page'
import search from '@/mixins/search'
export default {
  name: 'Artists',
  props: {
  },
  mixins: [page,search],
  data () {
    return {
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
  },
  created () { 
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