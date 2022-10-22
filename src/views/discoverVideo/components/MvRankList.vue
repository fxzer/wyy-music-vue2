<template>
  <div
    class="mv-rank-list"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
  > 
    <h2 class="rank-title">MV排行榜</h2>
    <div class="mv-header-wrap">
      <div class="mv-header-left">最近更新:今天</div>
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

    <div class="rank-mv-wrap">
      <div class="mv-wrap" v-for="(mv,index) in mvRankList" :key="mv.id">
        <MvBoardItem :mv="mv" :index="index" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvRankList",
  props: {
   
  },
  data() {
    return {
      loading: false,
      activeArea: "内地",
      mvRankList: [],
      areaList: [ "内地", "港台", "欧美", "日本", "韩国"],
    };
  },
  computed: {},
  watch: {},
  components: {
    MvBoardItem: () => import('./MvBoardItem')
  },
  methods: {
     changeArea(area) {
      let { query } = this.$route;
      this.$router.push({ query: Object.assign({}, query, { area }) });
      this.activeArea = area;
      this.getTopMvList()
    },
    //排行榜
    async getTopMvList() {
      this.loading = true;
      let { activeArea } = this;
      let { data } = await this.$http(`/top/mv?limit=50&area=${activeArea}`);
      this.mvRankList = data.sort((a,b)=>a.lastRank-b.lastRank) 
      this.loading = false;
    },
  },
  created() {
    this.getTopMvList()
  },
  mounted() {},
};
</script>
<style scoped lang='scss'>
.mv-rank-list {
  .rank-title {
    font-size: 18px;
    color: #1d1d1d;
    margin-top: 16px;
    font-weight: 600;
  }
  .mv-header-wrap {
    height: 40px;
    line-height: 40px;
    position: relative;
    .mv-header-left {
      font-size: 12px;
      display: flex;
      align-items: center;
      color: #ccc;
      width: 100px;
    }
    .filter-wrap {
      position: absolute;
      top: 50%;
      right: 0;
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

  .rank-mv-wrap{
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
}
</style>