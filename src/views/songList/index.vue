<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-15 11:34:04
 * @FilePath: \vue-wyy-music\src\views\songList\index.vue
 * @Description: 
-->
<template>
  <div  class='song-list'>
      <Banner :banner="banner" @jump="toHighQuality"/>
      <!-- 分类选择 -->
      <div class="cates-select-box">
        <div class="left-button" @click="selectPanelChange">
           <span>{{activeName || '全部歌单'}}</span><i class="iconfont icon-icon_left_arrow"></i>
        </div>
        <div class="right-cates">
          <span class="cate-item" v-for="(cate,index) in hotList" :key="cate.id" 
          :class="{'active':cate.id===activeId}" @click="handleCateClick(cate)">{{cate.name}}</span>
        </div>
        <CatePanel  @selectCate="handleCateClick"  :visible.sync="panelShow" :activeCate="activeName"
         :subGroup="subGroup"  :panelStyle="panelStyle" :categories="categories"/>
      </div>
      <!-- 歌单列表 -->
      <div class="songlist-wrap">
        <SongListBox v-for="item in playLists" :key="item.id" :algInfo="{...item,picUrl:item.coverImgUrl}"  showCreator/>
      </div>
      <Pagination v-bind="pageOption" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import page from '@/mixins/page'
export default {
  name: 'SongList',
  props: {
  },
  mixins:[page],
  data () {
    return {
      all:{},//全部歌单
      categories:{},//分类
      subList:[],//歌单细类
      activeId:0,//当前选中的分类
      activeName:'',
      hotList:[],//热门歌单分类
      playLists:[],//歌单列表
      highQualitys:[],//精品歌单
      banner:{ },
      panelStyle:{
        width:'900px',
      },
     
      panelShow:false,//是否显示分类选择面板
    }
  },

  computed: { 
    subGroup(){//歌单细类分组
      return this.subList.reduce((pre,cur)=>{
        if(!pre[cur.category]) pre[cur.category]=[]
        pre[cur.category].push(cur)
        return pre
      },[])
    }
  },
  components: { 
    Banner:()=>import('./components/Banner.vue'),
    CatePanel:()=>import('./components/CatePanel.vue'),
    SongListBox:()=>import('@/views/personalized/components/SongListBox.vue')
  },
  methods: {
    async getHotCates(){
      let res = await this.$http('/playlist/hot')
      this.hotList = res.tags || []
    },
    async getCateList(){
      const {all,categories,sub} = await this.$http('/playlist/catlist')
      this.all = all
      this.categories = categories
      this.subList = sub
    },
    //获取歌单列表
    async getSongListByCate(cat){
      let baseUrl = '/top/playlist'
      let catStr = cat  ? `cat=${cat}` : ''
      let url = `${baseUrl}?limit=10&offset=${this.offset}&${catStr}` 
      let { playlists,total } = await this.$http(url)
      
      this.playLists = playlists || []
      this.pageOption.total = total || 0
    },
    //精品歌单
    async getHighQuality(cat,limit = 1){
      let baseUrl = '/top/playlist/highquality'
      let catStr = cat ? `&cat=${cat}` : ''
      let url = `${baseUrl}?limit=${limit}${catStr}` 
      let { playlists } = await this.$http(url)
      this.highQualitys = playlists || []
      this.banner = this.highQualitys[0] || {copywriter:'', name:'',}
    },
    //点击分类
    handleCateClick({id,name}){
      this.panelShow = false
      this.activeId =  id
      this.activeName = name
      this.getSongListByCate(name)
      this.getHighQuality(name)
    },
    //当前页变化
    handleCurrentChange(current){
      this.currentChange(current)
      this.getSongListByCate(this.activeName)
    },
    //显示分类选择面板
    selectPanelChange(){
      this.panelShow = !this.panelShow
      this.getCateList()
    },
    //确定分类选择
    toHighQuality(){
      let { activeName:cat} = this
      let query = cat ? {cat} : {}
      this.$router.push({name:'highQuality',query })
    }
  },
  created () { 
    this.getHotCates()
    this.getSongListByCate()
    this.getHighQuality()
  },
  mounted () { 

  },
  watch: { 

  }
}
</script>
<style scoped lang='scss'>
  .song-list{
    .cates-select-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin:15px 0;
      //不能选择文字
      user-select: none;
      .left-button{
        cursor: pointer;
        font-size: 16px;
        height: 32px;
        color:#666;
        display: flex;
        align-items:center;
        border:1px solid #d3d3d3;
        border-radius: 16px;
        padding: 2px 15px 3px;
      }
      .right-cates{
        display: flex;
        .cate-item{
          padding: 0 10px;
          font-size: 14px;
          color: #666;
          display: inline-block;
          height: 24px;
          line-height: 24px;
          &.active{
            color: #EC4141;
            background-color: #FEF5F5;
            border-radius: 12px;
            font-weight: 600;
          }
          &:hover{
            color:#ec4141;
            opacity:.8;
            cursor:pointer;
          }
        }
      }
    }
    //歌单列表
    .songlist-wrap{
      display:grid;
      grid-template-columns: repeat(5,1fr);
      grid-gap: 20px;
    }
  
  }
</style>