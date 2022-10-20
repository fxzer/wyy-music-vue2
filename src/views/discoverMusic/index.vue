<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-15 15:47:42
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
        default-active="/discoverMusic/leaderBoard"
        v-for="(item, index) in secondaryMenuList"
        :index="'/discoverMusic' + item.path"
        :class="{'is-active':isActive(item)}"
        :key="item.path"
        active-text-color="#303133"
        >{{ item.title }}
      </el-menu-item>
    </el-menu>
      <router-view  class="music-wrap"/>
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
          path: "/leaderBoard",
        },
        {
          title: "歌手",
          path: "/singerList",
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
    isActive(menuItem){
      return this.$route.path.includes('/discoverMusic' + menuItem.path)
    }
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
  .music-wrap{
    flex:1;
    overflow: auto;
  }
  ::v-deep .el-menu--horizontal > .el-menu-item.is-active {
    font-size: 20px;
    font-weight: 600;
    border-bottom: 3px solid #ec4141 !important;
  }
  
}
</style>
