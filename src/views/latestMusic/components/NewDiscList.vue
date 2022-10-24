<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 16:53:57
 * @FilePath: \vue-wyy-music\src\views\latestMusic\components\NewDiscList.vue
 * @Description: 
-->
<template>
  <div class="new-disc-list">
    <!-- 筛选面板 -->
    <div class="filter-wrap">
      <!-- 国家选择 -->
      <div class="area-type-wrap">
        <div
          class="area-type-item"
          v-for="(value, areaName) in areaTypes"
          :key="areaName"
          :class="{ active: value == activeArea }"
          @click="changeArea(value)"
        >
          {{ areaName }}
        </div>
      </div>
      <!-- 推荐和全部 -->
      <div class="recommend-wrap">
        <div
          class="recommend-item"
          v-for="(mode, modeType) in modeTypes"
          :key="modeType"
          :class="{ active: mode == activeMode }"
          @click="changeMode(mode)"
        >
          {{ modeType }}
        </div>
      </div>
    </div>
    <!-- 新碟容器 -->
    <div class="new-disc-wrap"  v-loading="loading"
       element-loading-spinner="el-icon-loading"
       element-loading-text="载入中..."
    >
        <SongListBox v-for="disc in newDiscList" :key="disc.id" 
            position="center" size="large" 
            :algInfo="disc"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewDiscList",
  props: {},
  data() {
    return {
      loading: false,
      activeMode: "new",
      newDiscList: [],
      //热门或最新
      modeTypes: {
        推荐: "new",
        热门: "hot",
      },
      activeArea: "ALL",
      areaTypes: {
        全部: "ALL",
        华语: "ZH",
        欧美: "EA",
        日本: "JP",
        韩国: "KR",
      },
    };
  },
  computed: {},
  watch: {},
  components: {
    SongListBox: () => import('../../personalized/components/SongListBox.vue'),
  },
  methods: {
    changeMode(mode) {
      let { query } = this.$route;
      this.$router.push({ query: Object.assign({}, query, { mode }) });
      this.activeMode = mode;
      this.getNewDiscs();
    },
    changeArea(area) {
      let { query } = this.$route;
      this.$router.push({ query: Object.assign({}, query, { area }) });
      this.activeArea = area;
      this.getNewDiscs();
    },
    async getNewDiscs() {
      this.loading = true;
      let { activeMode, activeArea } = this;
      let { albums } = await this.$http(`/album/new?offset=0&limit=10&area=${activeArea}&type=${activeMode}`);
      this.newDiscList = albums;
      this.loading = false;
      
    },
  },
  created() {
    let { area = "ALL", mode = "new" } = this.$route.query;
    this.activeArea = area;
    this.activeMode = mode;
    this.getNewDiscs();
  },
  mounted() {},
};
</script>
<style scoped lang='scss'>
.filter-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  //国家地区
  .area-type-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .area-type-item {
      color: #666;
      font-size: 14px;
      cursor: pointer;
      margin-left: 30px;
      &:hover {
        color: #444;
      }
      &.active {
        color: #333;
        font-weight: 700;
      }
    }
  }
  //推荐/全部
  .recommend-wrap {
    display: flex;
    align-items: center;
    .recommend-item {
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
.new-disc-wrap{
  display: grid;
  grid-template-columns: repeat(5,1fr);
  grid-gap: 20px;
}
</style>