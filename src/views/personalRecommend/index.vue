<!--
 * @Author: FXJ
 * @CreateDate: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-10 22:06:34
 * @FilePath: \vue-wyy-music\src\views\personalRecommend\index.vue
 * @Description: 
-->

<template>
  <div   class="personal-recomend">
    <el-carousel :interval="3000000" type="card" height="250px">
      <el-carousel-item v-for="banner in bannerList" :key="banner.bannerId">
        <a :href="banner.url" class="banner-link"
          ><img :src="banner.pic" :alt="banner.typeTitle"
        /></a>
      </el-carousel-item>
    </el-carousel>
    <h2 class="area-title">推荐歌单</h2>
    <div class="recom-list">
      <SongListBox v-for="item in algList" :key="item.id" :algInfo="item"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalRecommend",
  props: {},
  data() {
    return {
      bannerList: [],
      algList:[]
    };
  },
  created() {},
  computed: {
  },
  components: {
    SongListBox: () => import("./components/SongListBox"),
  },
  methods: {
    async getBannerData() {
      const { banners = [] } = await this.$http("/banner?type=2");
      this.bannerList = banners;
    },
    async getAlgList() {
      const  {result=[]} = await this.$http("/personalized");
      this.algList = result.slice(0,10)
    },
  },
  mounted() {
    this.getBannerData();
    this.getAlgList() 
  },
  watch: {},
};
</script>
<style scoped lang="scss">
.personal-recomend {
  .banner-link {
    display: block;
    height: 100%;
    width: 100%;
    img {
      border-radius: 8px;
      height: 100%;
      width: 100%;
    }
  }
  .recom-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    .list-box {
    }
  }
}

</style>
