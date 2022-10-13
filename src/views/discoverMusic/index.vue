<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-13 21:50:42
 * @FilePath: \vue-wyy-music\src\views\discoverMusic\index.vue
 * @Description: 
-->
<template>
  <div class="discover-music">
    <el-menu
      mode="horizontal"
      router
      text-color="#373737"
    >
      <el-menu-item
        default-active="/discoverMusic/songList"
        v-for="(item, index) in secondaryMenuList"
        :index="'/discoverMusic' + item.path"
        :key="item.path"
        active-text-color="#303133"
        >{{ item.title }}
      </el-menu-item>
    </el-menu>
      <router-view  class="music-list-box"/>
  </div>
</template>

<script>
export default {
  name: "DiscoverMusic",
  props: {},
  data() {
    return {
      secondaryMenuList: [
        {
          title: "个性推荐",
          path: "/personalized",
        },
        {
          title: "专属定制",
          path: "/customMusic",
        },
        {
          title: "歌单",
          path: "/songList",
        },
        {
          title: "排行榜",
          path: "/leaderboard",
        },
        {
          title: "歌手",
          path: "/singers",
        },
        {
          title: "最新音乐",
          path: "/latestMusic",
        },
      ],
    
    };
  },
  created() {},
  computed: {},
  components: {},
  methods: {
   
  },
  mounted() {
   
  },
  watch: {},
};
</script>
<style scoped lang="scss">
.discover-music {
  display: flex;
  flex-direction: column;
  .el-menu {
    padding-bottom: 4px;
    margin-left: 20px;
    .el-menu-item {
      height: 50px;
      padding: 0;
      font-size: 16px;
      margin: 0 15px;
    }
   &.el-menu--horizontal {
      border: none !important;
    }
  }
  .music-list-box{
    flex:1;
    overflow: auto;
  }
  ::v-deep .el-menu--horizontal > .el-menu-item.is-active {
    font-size: 20px;
    font-weight: 600;
    border-bottom: 3px solid #ec4141;
  }
  
}
</style>
