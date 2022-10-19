<template>
  <div class="header-wrap" id="header-wrap">
    <a href="#" class="home-link">
      <img src="@/assets/images/header-logo.png" alt="首页" />
    </a>
    <div class="search-box">
      <el-input
        :value="kw"
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
      <Panel :visible.sync="searchPanelVisible" :styleObj="panelStyle" class="search-panel">
        <template #content>
        <vuescroll  v-if="showHotSearchBoard">
          <SearchHistory   @select="handleSelect"   />
          <HotSearchBoard   @select="handleSelect" />
        </vuescroll>
          <SearchTips v-if="!showHotSearchBoard"   @select="handleSelect" />
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
import { mapState,mapMutations } from 'vuex'
export default {
  name: "Header",
  props: {},
  data() {
    return {
      searchType: 1,
      placeholder: "请输入歌名、歌手、专辑",
      showHotSearchBoard: false,
      panelStyle: {
        width: "440px",
        height: "calc(100vh - 180px)",
        top: "70px",
        left: "20px",
        padding: "10px 0",
      },
      prefixIcon: null,
      isCloseBtn:false,
      kwSearchResult: [], //关键字搜索结果
      hotSearchBoard: [], //热搜榜
    };
  },
  computed: {
    ...mapState('search',["kw" ,"searchPanelVisible"]),
  },
  components: {
    SearchTips: () => import("./components/SearchTips.vue"),
    SearchHistory: () => import("./components/SearchHistory.vue"),
    HotSearchBoard: () => import("./components/HotSearchBoard.vue"),
  },
  methods: {
    ...mapMutations('search',["setKw","addOne",'setSearchPanel']),
    //获取默认搜索关键字
    async getDefaultKeywoard() {
      let { data: { showKeyword, searchType },} = await this.$http("/search/default");
      this.placeholder = showKeyword;
      this.searchType = searchType;
    },
    //搜索
    async defaultSearch() {
      let { kw } = this;
      let {
        result: { songs } 
      } = await this.$http(`/cloudsearch?keywords=${kw}&limit=100`);
      this.addOne(kw);
      this.kwSearchResult = songs;
    },

    handleSearch() {
      if (this.kw) {
        this.defaultSearch();
      } else {
        this.handlePreIconClick();
      }
    },
    //监听搜索框前置图标点击事件
    initPreIconEvent() {
      this.prefixIcon = this.$refs.searchInputRef.$el.querySelector(".el-input__prefix");
      this.prefixIcon.addEventListener("click", this.handlePreIconClick);
    },
    handlePreIconClick() {
      this.setKw(this.placeholder)
      this.defaultSearch();
      //TODO:防抖或节流
    },
    handleFocus() {
      this.setSearchPanel(true)
      if (!this.kw) {
        this.showHotSearchBoard = true;
      }
    },
    handleBlur() {
      if(!this.isCloseBtn){
        setTimeout(() => {//延迟隐藏，防止点击搜索项收集不到数据
          this.showHotSearchBoard = false;
          this.setSearchPanel(false)
        }, 200);
      }
   
    },
    //点击热搜榜或搜索提示项
    handleSelect(item) { 
      let { searchWord ,name,type=1} = item;
      let kw = searchWord || name;
      this.setKw(kw)
      this.addOne(kw);
      this.setSearchPanel(false)
      this.showHotSearchBoard = false;
      let pathMap = {
        1: "/songs",
        10: "/albums",
        100: "/artists",
        1000: "/playlists",
      };
      this.$router.push({
        path:'/searchResult' + pathMap[type],
        query: {
          kw: this.kw,
          type: type,
        },
      });
    },
    //监听搜索框输入事件
    handleInput(val) {
      this.setKw(val)
      if (val) {
        this.showHotSearchBoard = false;
      }
    },
    // headerClick(e){
    //   if(e.target.className.includes('el-icon-close')){
    //     this.isCloseBtn = true
    //   }else{
    //     this.isCloseBtn = false
    //   }
    // }
  },
  created() {
    this.getDefaultKeywoard();
  },
  mounted() {
    this.initPreIconEvent();
    // let headerWrap = document.querySelector('.header-wrap')
    // headerWrap.addEventListener('click',this.headerClick)
  },
  beforeDestroy() {
    this.prefixIcon.removeEventListener("click", this.handlePreIconClick);
  },
  watch: {
    kw(val) {
      if (!val) {
        this.showHotSearchBoard = true;
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.header-wrap {
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
.el-input{
   ::v-deep .el-input__suffix, 
   ::v-deep .el-input__prefix{
      top: -2px;
  }
}
</style>