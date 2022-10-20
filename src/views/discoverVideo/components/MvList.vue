<template>
  <div
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
  >
  <!-- 最新MV -->
    <div class="mv-header-wrap" >
          <div class="mv-header-left" @click="toAllMvs('全部','最新')">
            <h2>最新MV</h2>
            <i class="el-icon-arrow-right"></i>
        </div>
        <!-- 筛选 -->
        <div class="filter-wrap">
          <div
            class="filter-item"
            v-for="area in areaList"
            :key="area"
            :class="{ active: area == activeArea }"
            @click="changeArea(area)"
          >
            {{ area }}
          </div>
        </div>
    </div>
    <div class="mv-list video-wrap">
      <MvItemBox v-for="mv in mvList"  :key="mv.id" :mv="mv" class="video-item"/>
   </div>
    <!-- 网易出品 -->
    <div class="mv-header-wrap">
          <div class="mv-header-left"  @click="toAllMvs('网易出品','最新')">
            <h2>网易出品</h2>
            <i class="el-icon-arrow-right"></i>
        </div>
    </div>
    <div class=" mv-list video-wrap">
        <MvItemBox v-for="mv in wyMvList" :key="mv.id" :mv="mv" class="video-item"/>
    </div>
    <!-- 排行榜 -->
    <div class="mv-header-wrap" >
          <div class="mv-header-left" @click="toTop50">
            <h2>MV排行榜</h2>
            <i class="el-icon-arrow-right"></i>
        </div>
    </div>
    <div class="top-mv-wrap">
       <div class="mv-wrap"  v-for="(mv,index) in topMvList"  :key="mv.id">
         <MvBoardItem :mv="mv" :index="index"/>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mvList",
  props: {},
  data() {
    return {
      loading: false,
      activeArea: "全部",
      mvList: [],
      hotMvList: [],
      wyMvList: [],
      topMvList: [],
      recdMvList: [],
      areaList: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
    };
  },
  computed: {},
  watch: {},
  components: {
    MvItemBox: () => import("./MvItemBox.vue"),
    MvBoardItem: () => import("./MvBoardItem.vue"),
  },
  methods: {
     changeArea(area) {
      let { query } = this.$route;
      this.$router.push({ query: Object.assign({}, query, { area }) });
      this.activeArea = area;
      this.getNewMvList()
    },
    //获取最新MV
     async getNewMvList() {
      this.loading = true;
      let {   activeArea } = this;
      let area = activeArea === "全部" ?  "" : activeArea;
      let { data } = await this.$http(`/mv/first?offset=0&limit=10&area=${area}`);
      this.mvList = data;
      this.loading = false;
    },
    //网易出品
     async getWyMvList() {
      this.loading = true;
      let { data } = await this.$http(`/mv/exclusive/rcmd?limit=10`);
      this.wyMvList = data;
      this.loading = false;
    },
    //排行榜
     async getTopMvList() {
      this.loading = true;
      let { data } = await this.$http(`/top/mv?limit=10`);
      this.topMvList = data;
      this.loading = false;
    },
    toAllMvs(type,order) {
      let { activeArea } = this;
      this.$router.push({ path: `/discoverVideo/allMvList?area=${activeArea}&type=${type}&order=${order}` });
    },
    toTop50() {
      this.$router.push({ path: `/discoverVideo/mvRankList` });
    },
  },
  created() {
     this.getNewMvList()
     this.getWyMvList()
     this.getTopMvList()
  },
  mounted() {},
};
</script>
<style scoped lang='scss'>
@import '../../searchResult/style/video.scss';
.mv-header-wrap{
  height: 50px;
  line-height: 50px;
  margin-top: 10px;
  position: relative;
  .mv-header-left{
    display: flex;
    align-items: center;
    color:#1d1d1d;
    width: 100px;
    cursor: pointer;
    h2{
      font-size: 20px;
      font-weight: 700;
      white-space: nowrap;  
    }
    i{
       font-size: 20px;
       font-weight: 800;
       transform: translateY(-2px);
    }
  }
  .filter-wrap{
    position: absolute;
    top: 50%;
    right:0;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    .filter-item {
      width: 50px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      border-radius: 12px;
      color: #666;
      font-size: 14px;
      cursor: pointer;
      margin-left: 30px;
      &:hover {
        color: #444;
      }
      &.active {
        color: #ec4141;
        background-color: #feeeee;
      }
    }
}
}
.mv-list-wrap{
  height: calc(100% - 80px);
}
.top-mv-wrap{
  //分两列
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  .mv-wrap{
    padding:10px;
    border-bottom:1px solid #f5f5f5;
    &:nth-of-type(9),&:nth-of-type(10){
     border-bottom:none;
    }
    &:nth-of-type(2n-1){
      border-right:1px solid #f5f5f5;
    }
  }
}
</style>