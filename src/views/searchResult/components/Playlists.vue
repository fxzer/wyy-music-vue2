<template>
    <!-- 歌单列表 -->
      <div  
        v-loading="loading" 
        element-loading-spinner="el-icon-loading"
        element-loading-text="载入中...">
        <div class="playlists-result">
        <SongListBox v-for="item in playlists" :key="item.id" 
        :algInfo="{...item,picUrl:item.coverImgUrl}" size="large"  showCreator/>
        </div>
        <Pagination v-bind="pageOption" @current-change="handleCurrentChange"/>
      </div>
</template>

<script>
import page from '@/mixins/page'

export default {
  name: 'Playlists',
  props: {
  },
    mixins: [page],
  data () {
    return {
      loading:false,
      playlists: [],
    }
  },
  computed: { 

  },
  watch: { 

  },
  components: { 
    SongListBox:() => import('@/views/personalized/components/SongListBox.vue')
  },
  methods: {
     async search() {
      this.loading = true
      let { offset } = this;
      let { kw } = this.$route.query;
      if(kw){
        let { result: { playlists = [], playlistCount = 0} } = await this.$http( `/cloudsearch?keywords=${kw}&type=1000&limit=10&offset=${offset}` );
        this.playlists = playlists;
        this.pageOption.total = playlistCount
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
 //歌单列表
  .playlists-result{
    display:grid;
    grid-template-columns: repeat(6,1fr);
    grid-gap: 20px;
  }
</style>