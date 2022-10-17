<template>
  <div class="header">
    <a href="#" class="home-link">
      <img src="@/assets/images/header-logo.png" alt="首页" />
    </a>
    <!-- placeholder="请输入歌名、歌手、专辑" -->
    <div class="search-box">
      <el-input
        v-model.trim="keywords"
        size="small"
        clearable
        ref="searchInputRef"
        :placeholder="placeholder"
        prefix-icon="iconfont icon-search"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.native.enter="handleSearch"
        @input="handleInput"
      ></el-input>
      <!-- 搜索提示面板 -->
      <Panel :visible.sync="showSearchPanel" :styleObj="panelStyle">
        <template #content>
        <vuescroll  v-if="showHotSearchBoard">
          <SearchHistory  :list="historyList"  @select="handleSelect" 
          @deleteOne="handleDeleteOne" @deleteAll="handleDeleteAll" />
          <HotSearchBoard   @select="handleSelect" />
        </vuescroll>
          <SearchTips v-if="!showHotSearchBoard" :keywords="keywords" @select="handleSelect" />
        </template>
      </Panel>
    </div>
    <div class="info">
      <img
        class="avatar"
        src="https://p1.music.126.net/AU-c-BY7xcLqqL9srI7-yg==/109951164381968028.jpg?param=30y30"
        alt="avatar"
      />
      <div class="username">
        Endorphin_K <i class="el-icon-caret-bottom"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {},
  data() {
    return {
      keywords: "",
      searchType: 1,
      placeholder: "",
      showSearchPanel: false,
      showHotSearchBoard: false,
      panelStyle: {
        width: "440px",
        height: "calc(100vh - 180px)",
        top: "70px",
        left: "20px",
        padding: "10px 0",
      },
      prefixIcon: null,
      historyList: [], // 搜索历史
      kwSearchResult: [], //关键字搜索结果
      hotSearchBoard: [], //热搜榜
    };
  },
  computed: {},
  components: {
    SearchTips: () => import("./components/SearchTips.vue"),
    SearchHistory: () => import("./components/SearchHistory.vue"),
    HotSearchBoard: () => import("./components/HotSearchBoard.vue"),
  },
  methods: {
    //获取默认搜索关键字
    async getDefaultKeywoard() {
      let { data: { showKeyword, searchType },} = await this.$http("/search/default");
      this.placeholder = showKeyword;
      this.searchType = searchType;
    },
    //搜索
    async defaultSearch() {
      let { keywords } = this;
      let {
        result: { songs } 
      } = await this.$http(`/cloudsearch?keywords=${keywords}&limit=100`);
      this.historyList.push(keywords);
      this.kwSearchResult = songs;
    },

    handleSearch() {
      if (this.keywords) {
        this.defaultSearch();
      } else {
        this.handlePreIconClick();
      }
    },
    //监听搜索框前置图标点击事件
    initPreIconEvent() {
      this.prefixIcon =
        this.$refs.searchInputRef.$el.querySelector(".el-input__prefix");
      this.prefixIcon.addEventListener("click", this.handlePreIconClick);
    },
    handlePreIconClick() {
      this.keywords = this.placeholder;
      this.defaultSearch();
      //TODO:防抖或节流
    },
    handleFocus() {
      this.showSearchPanel = true;
      if (!this.keywords) {
        this.showHotSearchBoard = true;
      }
    },
    handleBlur() {
      setTimeout(() => {//延迟隐藏，防止点击搜索项收集不到数据
        this.showSearchPanel = false;
        this.showHotSearchBoard = false;
      }, 200);
    },
    //点击热搜榜或搜索提示项
    handleSelect(item) { 
      let { searchWord ,name} = item;
      this.keywords = searchWord || name;
      this.showSearchPanel = false;
      this.showHotSearchBoard = false;
      console.log('item: ', item);
      console.log('item.type: ', item.type);
      let pathMap = {
        1: "/songs",
        10: "/albums",
        100: "/artists",
        1000: "/playlists",
      };
      this.$router.push({
        path:'/searchResult' + pathMap[item.type],
        query: {
          kw: this.keywords,
          type: item.type,
        },
      });
    },
    //监听搜索框输入事件
    handleInput(val) {
      if (val) {
        this.showHotSearchBoard = false;
      }
    },
    handleDeleteOne(index){
      this.historyList.splice(-index-1,1)
    },
    handleDeleteAll(){
      this.historyList = []
    }
  },
  created() {
    
    this.getDefaultKeywoard();
  },
  mounted() {
    this.initPreIconEvent();
    this.$bus.$on("search", (keywords) => {
      if(!keywords) this.keywords = keywords;
    });
  },
  beforeDestroy() {
    this.prefixIcon.removeEventListener("click", this.handlePreIconClick);
  },
  watch: {
    keywords(val) {
      if (!val) {
        this.showHotSearchBoard = true;
      }
    },
    historyList: {
      handler(newVal) {
        localStorage.setItem("historyList", JSON.stringify(newVal));
      },
      deep: true,
    },
    showHotSearchBoard(val){
      if(val){
        //获取历史记录
        this.historyList = JSON.parse(localStorage.getItem("historyList"));
      }
    }
  },
};
</script>
<style scoped lang='scss'>
.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: #ec4141;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .home-link {
    display: block;
    height: 100%;
    width: 200px;
    & > img {
      display: block;
      height: 100%;
      width: 100%;
    }
  }
  .search-box {
    flex: 1;
    height: 100%;
    padding-left: 30px;
    display: flex;
    align-items: center;
    .el-input {
      width: 240px;
      ::v-deep .el-input__inner {
        color: #fff;
        border-radius: 16px;
        border: none;
        background-color: #e13e3e;
      }
      ::v-deep .el-input__icon {
        padding-left: 5px;
        color: #fff;
        opacity: 0.8;
        cursor: pointer;
        &:hover {
          opacity: 1;
        }
      }
    }
    ::placeholder {
      color: #ee9999;
    }
  }
  .info {
    width: 200px;
    display: flex;
    align-items: center;
    color: #f8d9dd;
    cursor: pointer;
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  //搜索提示面板
  .search-tips-wrap {
    color: #333;
  }
}
</style>