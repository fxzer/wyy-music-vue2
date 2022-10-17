<template>
  <div class="search-result">
    <div class="search-title"><span>搜索</span> <p class="keywords text-of-single">得到</p></div>
      <!--你可能感兴趣  -->
    <div class="may-interest" v-if="showMayIns">
      <p class="interest-title">你可能感兴趣</p>
      <div class="interest-list">
        <MayInterestItem v-for="(data,key) in mayIns" :key="key" :dataObj="data[0]" :type="key"/>
      </div>
    </div>
    <!-- 菜单列表 -->
    <el-menu
      mode="horizontal"
      router
      text-color="#373737"
    >
      <el-menu-item
        default-active="/searchResult/songs"
        v-for="(item, index) in searchTypes"
        :index="'/searchResult' + item.path+ '?kw=' + kw"
        :class="{'is-active':isActive(item)}"
        :key="item.path"
        active-text-color="#303133"
        >{{ item.title }}
      </el-menu-item>
    </el-menu>
      <router-view  class="result-list"/>
  </div>
</template>

<script>

export default {
  name: 'SearchResult',
  props: {
  },
  data () {
    return {
      kw: '',
      searchTypes: [
        {
          title: "单曲",
          path: "/songs",
          type:1,
        },
        {
          title: "歌手",
          path: "/artists",
          type: 100,
        },
        {
          title: "歌单",
          path: "/playlists",
          type: 1000,
        },
        {
          title: "专辑",
          path: "/albums",
          type: 10,
        },
        {
          title: "视频",
          path: "/videos",
          type: 1014,
        },
        
        {
          title: "播客",
          path: "/podcasts",
          type: 1009,
        },
        {
          title: "声音",
          path: "/sounds",
          type: 1006,
        },
        {
          title: "用户",
          path: "/users",
          type: 1002,
        },
      ],
      mayIns:{},//你可能感兴趣
    }
  },
  computed: { 
    showMayIns(){
      return Object.keys(this.mayIns).length > 0
    },
  },
  watch: { 

  },
  components: { 
    MayInterestItem: () => import('./components/MayInterestItem.vue'),
  },
  methods: {
    isActive(menuItem){
      return this.$route.path === '/searchResult' + menuItem.path
    },
    //可能感兴趣
   async getMayInterest(kw){
      let { result  }= await this.$http(`/search/multimatch?keywords=${kw}`) 
      delete result.orders
      this.mayIns = result
    },
    // 各种类型搜索
       //搜索单个类别
    // async search( type=1, limit=10, offset=0, kw ) {
    //   let {
    //     result: { songs = [], artists = [], albums = [], playlists = [] },
    //   } = await this.$http( `/cloudsearch?keywords=${kw}&type=${type}&limit=${limit}&offset=${offset}` );
    //   switch (type) {
    //     case 1:
    //       return songs;
    //     case 100:
    //       return artists;
    //     case 10:
    //       return albums;
    //     case 1000:
    //       return playlists;
    //   }
    // },
  },
  created () { 
    //TODO:刷新回显输入框
    let {  query:{kw} } = this.$route 
    
    this.kw = kw
    // let type = this.searchTypes.filter(item =>  path.includes(item.path))[0].type 
    // if(kw){
    //   this.search(type, 10, 0, kw).then(res => this.list = res)
    //   this.getMayInterest(kw)
    // }
  },
  mounted () { 

  },
}
</script>
<style scoped lang='scss'>
.search-result{
  color:#f00;
  padding:10px 24px;
  .search-title{
    color:#1d1d1f;
    font-size:18px;
    font-weight: 600;
    margin-top:10px;
    margin-bottom:10px;
    display: flex;
    align-items: center;
    .keywords{
      margin-left:8px;
      width:calc(100% - 44px);
    }
  }
  .may-interest{
     margin-bottom:20px;
    .interest-title{
      font-size:14px;
      color:#999;
      margin-bottom:10px;
    }
    .interest-list{
      display:flex;
      flex-wrap:wrap;
      margin-bottom:10px;
      ::v-deep .may-interest-item:nth-of-type(4n){
        margin-right:0;
      }
    }
  }
  // 搜索结果-菜单列表
  .el-menu {
    padding-bottom: 4px;
    margin-left: 20px;
    .el-menu-item {
      height: 50px;
      padding: 0;
      font-size: 14px;
      margin: 0 15px;
    }
   &.el-menu--horizontal {
      border: none !important;
    }
  }
  ::v-deep .el-menu--horizontal > .el-menu-item.is-active {
    font-size: 16px;
    font-weight: 600;
    border-bottom: 3px solid #ec4141 !important;
  }
  //结果
  .result-list{
    color:#666;
  }
}
</style>