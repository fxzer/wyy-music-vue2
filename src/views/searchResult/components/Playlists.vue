<template>
    <!-- 歌单列表 -->
      <div  
        v-loading="loading" 
        element-loading-spinner="el-icon-loading"
        element-loading-text="载入中..."
        style="padding-bottom: 100px;">
        <div class="playlists-result">
        <SongListBox v-for="item in palyList" :key="item.id" 
        :algInfo="{...item,picUrl:item.coverImgUrl}" size="large"  showCreator/>
        </div>
        <Pagination v-bind="pageOption" @current-change="handleCurrentChange"/>
      </div>
</template>

<script>
import page from '@/mixins/page'
import search from '@/mixins/search'
export default {
  name: 'Playlists',
  props: {
  },
  mixins: [page,search],
  data () {
    return {
    }
  },
  computed: { 
    palyList(){
      let reg = new RegExp(this.kw,'gi')
      return this.filterList.map(item => {
        item.name = item.name.replace(reg,`<span class="kw-highlight">${this.kw}</span>`)
        return item
      })
    }
  },
  watch: { 

  },
  components: { 
    SongListBox:() => import('@/views/personalized/components/SongListBox.vue')
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
 //歌单列表
  .playlists-result{
    display:grid;
    grid-template-columns: repeat(6,1fr);
    grid-gap: 20px;
  }
</style>