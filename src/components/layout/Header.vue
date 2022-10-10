<template>
  <div id="Header" class="Header">
    <a href="#" class="home-link">
      <img src="@/assets/images/header-logo.png" alt="首页" />
    </a>
    <div class="search-box">
      <el-input
        v-model="keyword"
        placeholder="请输入歌名、歌手、专辑"
        size="small"
        clearable
        prefix-icon="iconfont icon-search"
      ></el-input>
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
      keyword: "",
    };
  },
  created() {},
  computed: {},
  components: {},
  methods: {},
  mounted() {},
  watch: {},
};
</script>
<style scoped lang='scss'>
.Header {
  position: fixed;
  left:0;
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
      caret-color: #f5f5f7;
      ::v-deep .el-input__inner {
        border-radius: 16px;
        border: none;
        background-color: #e13e3e;
      }
      ::v-deep .el-input__icon {
        padding-left: 5px;
        color: #f5f5f7;
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
}
</style>