<template>
  <div 
     v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
    style="padding-bottom: 100px;"
  >
     <div class="mvs-result video-wrap">
       <MvItemBox v-for="mv in mvList" :key="mv.id" :mv="mv" class="video-item"/>
     </div>
      <Pagination v-bind="pageOption" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import page from '@/mixins/page'
import search from '@/mixins/search'
export default {
  name: 'Mvs',
  props: {
  },
  mixins: [page,search],
  data () {
    return {
    }
  },
  computed: { 
    mvList(){
      let reg = new RegExp(this.kw,'gi')
      return this.filterList.map(mv => {
        mv.name = mv.name.replace(reg,`<span class="kw-highlight">${this.kw}</span>`)
        return mv
      })
    }
  },
  watch: { 

  },
  components: { 
    MvItemBox : () => import('@/views/discoverVideo/components/MvItemBox.vue')
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
@import '../style/video.scss';
</style>