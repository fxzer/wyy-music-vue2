<template>
  <div 
    v-loading="loading" 
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..." 
    style="padding:10px 0 0px;"
  >
    <div class="artist-result">
      <SingerCover v-for="singer in artistList"  :key="singer.id" :singer="singer" @click.native="toSingerDetail(singer)" showAlias/>
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
    artistList(){
      let reg = new RegExp(this.kw,'gi')
      return this.filterList.map(singer => {
        singer.name = singer.name.replace(reg,`<span class="kw-highlight">${this.kw}</span>`)
        return singer
      })
    }
  },
  watch: { 

  },
  components: { 
    SingerCover:() => import('@/views/singerList/components/SingerCover.vue')
  },
  methods: {
     toSingerDetail(singer) {
      this.$router.push(`/singerDetail/${singer.id}`);
    },
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