<template>
  <div class="search-result">
    <div class="search-title"><span>搜索</span> <p class="keywords text-of-single">得到</p></div>
      <!--你可能感兴趣  -->
    <div class="may-interest">
      <p class="interest-title">你可能感兴趣</p>
      <div class="interest-list">
        <MayInterestItem/>
        <MayInterestItem/>
        <MayInterestItem/>
        <MayInterestItem/>
        <MayInterestItem/>
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
        :index="'/searchResult' + item.path"
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
    }
  },
  computed: { 

  },
  watch: { 

  },
  components: { 
    MayInterestItem: () => import('./components/MayInterestItem.vue')
  },
  methods: {
    isActive(menuItem){
      return this.$route.path === '/searchResult' + menuItem.path
    }
  },
  created () { 

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
    margin-bottom:20px;
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