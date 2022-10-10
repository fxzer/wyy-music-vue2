<!--
 * @Author: FXJ
 * @CreateDate: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-10 23:27:45
 * @FilePath: \vue-wyy-music\src\views\personalRecommend\index.vue
 * @Description: 
-->

<template>
  <div   class="personal-recomend">
    <el-carousel :interval="3000000" type="card" height="250px">
      <el-carousel-item v-for="banner in bannerList" :key="banner.bannerId" >
        <a  class="banner-link" @click="handleBannerClick(banner)" >
          <img :src="banner.pic" :alt="banner.typeTitle"/>
        </a>
      </el-carousel-item>
    </el-carousel>
    <h2 class="area-title">推荐歌单<i class="iconfont icon-icon_left_arrow"></i></h2>
    <div class="recom-list">
      <SongListBox v-for="item in algList" :key="item.id" :algInfo="item"/>
    </div>
    <h2 class="area-title">推荐MV<i class="iconfont icon-icon_left_arrow"></i></h2>
    <div class="mv-list">
      <MvRecommend v-for="item in mvList" :key="item.id" :mvInfo="item"/>
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
      algList:[],
      mvList:[],
    };
  },
  created() {},
  computed: {
  },
  components: {
    SongListBox: () => import("./components/SongListBox"),
    MvRecommend: () => import("./components/MvRecommend"),
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
    async getPersonalizedMv(){
      const {result=[]} = await this.$http("/personalized/mv");
      this.mvList = result 
    },
    //点击banner
    handleBannerClick(banner){
      if(banner.song){
        console.log('banner.song: ', banner.song);
        this.getSongDetail(banner.song.id)
      } else{
       console.log('跳转到歌单详情页');
      }

    },
    //获取歌曲详情
   async getSongDetail(id){
     let songDetail = await  this.$http(`/song/detail?ids=${id}`) 
     console.log('songDetail: ', songDetail);
    }
  },
  mounted() {
    this.getBannerData();
    this.getAlgList() 
    this.getPersonalizedMv() 
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
.area-title i{
  font-size: 20px;
  margin-left: 2px;
}

// mv列表
.mv-list{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}
</style>
