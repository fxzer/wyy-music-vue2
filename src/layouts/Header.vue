<template>
  <div class="header-wrap" id="header-wrap">
    <router-link to="/" class="home-link">
      <img src="@/assets/images/header-logo.png" alt="首页" />
    </router-link>
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
      <Panel
        :visible.sync="searchPanelVisible"
        :styleObj="panelStyle"
        class="search-panel"
      >
        <template #content>
          <vuescroll v-if="showHotSearchBoard">
            <SearchHistory @select="handleSelect" />
            <HotSearchBoard @select="handleSelect" />
          </vuescroll>
          <SearchTips v-if="!showHotSearchBoard" @select="handleSelect" />
        </template>
      </Panel>
    </div>
    <!-- 右侧 -->
    <div class="info" @click.stop="showLogin">
      <img
        class="avatar"
        :src="avatarSrc"
        alt="avatar"
      />
      <div class="username" >
        {{username}} <i class="el-icon-caret-bottom"></i>
      </div>
    </div>
    <Login :visible.sync="loginVisible" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Cookies from 'js-cookie'
export default {
  name: "Header",
  props: {},
  data() {
    return {
      searchType: 1,
      defaultAvatar: require("../assets/images/user-avatar-default.png"),
      placeholder: "请输入歌名、歌手、专辑",
      showHotSearchBoard: false,
      loginVisible: false,
      panelStyle: {
        width: "440px",
        height: "calc(100vh - 180px)",
        top: "70px",
        left: "20px",
        padding: "10px 0",
      },
      prefixIcon: null,
      isCloseBtn: false,
      kwSearchResult: [], //关键字搜索结果
      hotSearchBoard: [], //热搜榜
    };
  },
  computed: {
    ...mapState("search", ["kw", "sessionid","searchPanelVisible"]),
    avatarSrc() {
      if(this.sessionid){
        console.log('this.sessionid: ', this.sessionid);
      }else{
        return this.defaultAvatar
      }
    },
    username(){
      return  '未登录'
    }
  },
  components: {
    Login:() => import('./components/Login.vue'),
    SearchTips: () => import("./components/SearchTips.vue"),
    SearchHistory: () => import("./components/SearchHistory.vue"),
    HotSearchBoard: () => import("./components/HotSearchBoard.vue"),
  },
  methods: {
    ...mapMutations("search", ["setKw", "addOne", "setSearchPanel",'setSessionId']),
    ...mapMutations("player", ["setMusicLyric"]),
    //获取默认搜索关键字
    async getDefaultKeywoard() {
      let {
        data: { showKeyword, searchType },
      } = await this.$http("/search/default");
      this.placeholder = showKeyword;
      this.searchType = searchType;
    },

    handleSearch() {
      this.setSearchPanel(false);
      if (!this.kw) {
        this.setKw(this.placeholder);
      }
      this.setMusicLyric(false)
      this.$router.push({
        path: "/searchResult/songs",
        query: {
          kw: this.kw,
          type: 1,
        },
      });
    },
    //监听搜索框前置图标点击事件
    initPreIconEvent() {
      this.prefixIcon =
        this.$refs.searchInputRef.$el.querySelector(".el-input__prefix");
      this.prefixIcon.addEventListener("click", this.handlePreIconClick);
    },
    handlePreIconClick() {
      this.setKw(this.placeholder);
      //TODO:防抖或节流
      this.handleSearch();
    },
    handleFocus() {
      this.setSearchPanel(true);
      if (!this.kw) {
        this.showHotSearchBoard = true;
      }
    },
    handleBlur() {
      if (!this.isCloseBtn) {
        setTimeout(() => {
          //延迟隐藏，防止点击搜索项收集不到数据
          this.showHotSearchBoard = false;
          this.setSearchPanel(false);
        }, 200);
      }
    },
    //点击热搜榜或搜索提示项
    handleSelect(item) {
      let { searchWord, name, type = 1 } = item;
      let kw = searchWord || name;
      this.setKw(kw);
      this.addOne(kw);
      this.setSearchPanel(false);
      this.setMusicLyric(false)
      this.showHotSearchBoard = false;
      let pathMap = {
        1: "/songs",
        10: "/albums",
        100: "/artists",
        1000: "/playlists",
      };
      this.$router.push({
        path: "/searchResult" + pathMap[type],
        query: {
          kw: this.kw,
          type: type,
        },
      });
    },
    //监听搜索框输入事件
    handleInput(val) {
      this.setKw(val);
      if (val) {
        this.showHotSearchBoard = false;
      }
    },
    //展示登录弹窗
    showLogin(){
      this.loginVisible = true
    }
  },
  created() {
    let sessionid = Cookies.get('wyy_sessionid')
    if(sessionid){
      this.setSessionId(sessionid)
    }
    this.getDefaultKeywoard();
  },
  mounted() {
    this.initPreIconEvent();
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
z-index: 1999;
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
    margin-right:100px;
    display: flex;
    align-items: center;
    color: #f8d9dd;
    cursor: pointer;
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 10px;
      background-color: #ddd;
    }
    .username{
      display: flex;
      align-items: center;
      &:hover{
        color:#fff;
      }
    }
  }
  //搜索提示面板
  .search-tips-wrap {
    color: #333;
  }
}
.el-input {
  ::v-deep .el-input__suffix,
  ::v-deep .el-input__prefix {
    top: -2px;
  }
}
</style>