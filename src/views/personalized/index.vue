<!--
 * @Author: FXJ
 * @CreateDate: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-13 20:47:00
 * @FilePath: \vue-wyy-music\src\views\personalized\index.vue
 * @Description: 首页个性推荐
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
    <h2 class="area-title">独家放送<i class="iconfont icon-icon_left_arrow"></i></h2>
    <div class="mv-list private-content-list">
      <MvRecommend v-for="item in privateContent" :key="item.id" :mvInfo="item" palyBtnShow :bannerShow="false"  />
    </div>
    <h2 class="area-title">最新音乐<i class="iconfont icon-icon_left_arrow"></i></h2>
    <div class="mv-list private-content-list">
      <SongItemBox v-for="item in newSongList" :key="item.id" :songInfo="item"  :class="{'is-foucs':newSongId===item.id}" @bgClick="handleBgClick"/>
    </div>
    <!-- <h2 class="area-title">推荐电台<i class="iconfont icon-icon_left_arrow"></i></h2>
    <div class="mv-list private-content-list">
      <SongItemBox v-for="item in newSongList" :key="item.id" :songInfo="item" size="medium"/>
    </div> -->
    <h2 class="area-title">推荐MV<i class="iconfont icon-icon_left_arrow"></i></h2>
    <div class="mv-list">
      <MvRecommend v-for="item in mvList" :key="item.id" :mvInfo="item"   />
    </div>
 
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
  name: "PersonalRecommend",
  props: {},
  data() {
    return {
      bannerList: [],
      algList:[],
      mvList:[],
      privateContent:[],
      newSongList:[],
      newSongId:0,
    };
  },
  created() {},
  computed: {
  },
  components: {
    SongListBox: () => import("./components/SongListBox"),
    MvRecommend: () => import("./components/MvRecommend"),
    SongItemBox: () => import("./components/SongItemBox"),
  },
  methods: {
    ...mapState('player',['audio','playing','id']),
    ...mapActions('player',['getSongUrl']),
    async getBannerData() {
      const { banners = [] } = await this.$http("/banner?type=2");
      this.bannerList = banners;
    },
    async getAlgList() {
      const  {result=[]} = await this.$http("/personalized?limit=10");
      this.algList = result || [];
    },
    async getPersonalizedMv(){
      const {result=[]} = await this.$http("/personalized/mv");
      this.mvList = result 
    },
    //点击banner
    handleBannerClick(banner){
      if(banner.song){
        console.log('banner.song: ', banner.song);
        // this.getSongDetail(banner.song.id)
        if(this.id !== banner.song.id){
          this.getSongUrl(banner.song.id)
        }
      } else{
       console.log('跳转到歌单详情页');
      }
    },
  
   async getSongDetail(id){
     let songDetail = await  this.$http(`/song/detail?ids=${id}`) 
     console.log('songDetail: ', songDetail);
    },
    async getPrivateContent(){
      const data = await this.$http("/personalized/privatecontent")
      this.privateContent = data.result
    },
    //最新音乐
    async getNewSong(){
      const data = await this.$http("/personalized/newsong?limit=12")
      this.newSongList = data.result
      console.log('this.newSongList: ', this.newSongList);
    },
    //点击背景
    handleBgClick(id){
      console.log('id: ', id);
      this.newSongId = id
      console.log('点击背景');
    }
  },
  mounted() {
    this.getBannerData();
    this.getAlgList() 
    this.getPersonalizedMv() 
    this.getPrivateContent()
    this.getNewSong()
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
  &.private-content-list{
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
