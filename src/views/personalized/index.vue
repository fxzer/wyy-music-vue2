<!--
 * @Author: FXJ
 * @CreateDate: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-16 18:43:04
 * @FilePath: \vue-wyy-music\src\views\personalized\index.vue
 * @Description: 首页个性推荐
-->

<template>
  <div   class="personal-recomend" >
    <el-carousel :interval="3000" autoplay type="card" height="250px">
      <el-carousel-item v-for="banner in bannerList" :key="banner.bannerId" >
        <a  class="banner-link" @click="handleBannerClick(banner)" >
          <img :src="banner.pic" :alt="banner.typeTitle"/>
        </a>
      </el-carousel-item>
    </el-carousel>
   <div 
      v-loading="loading1" 
      element-loading-spinner="el-icon-loading"
      element-loading-text="载入中...">
     <h2 class="area-title">推荐歌单<i class="iconfont icon-icon_left_arrow"></i></h2>
    <div class="recom-list" v-loading="loading1" 
      element-loading-spinner="el-icon-loading"
      element-loading-text="载入中...">
      <SongListBox v-for="item in algList" :key="item.id" :algInfo="item"/>
    </div>
   </div>
   <div  
      v-loading="loading2"
      element-loading-spinner="el-icon-loading"
      element-loading-text="载入中..."
   >
     <h2 class="area-title">独家放送<i class="iconfont icon-icon_left_arrow"></i></h2>
      <div class="mv-list private-content-list"  v-loading="loading2">
        <MvRecommend v-for="item in privateContent" :key="item.id" :mv="item" palyBtnShow :bannerShow="false"  />
      </div>
   </div>
   <div  
      v-loading="loading3"
      element-loading-spinner="el-icon-loading"
      element-loading-text="载入中..."
   >
     <h2 class="area-title">最新音乐<i class="iconfont icon-icon_left_arrow"></i></h2>
    <div class="mv-list private-content-list" >
      <SongItemBox v-for="item in newSongList" :key="item.id" :songInfo="item"  
      :class="{'is-foucs':newSongId===item.id}" @bgClick="handleBgClick"/>
    </div>
   </div>
   
    <!-- <h2 class="area-title">推荐电台<i class="iconfont icon-icon_left_arrow"></i></h2>
    <div class="mv-list private-content-list">
      <SongItemBox v-for="item in newSongList" :key="item.id" :songInfo="item" size="medium"/>
    </div> -->
    <div  
      v-loading="loading4" 
      element-loading-spinner="el-icon-loading"
      element-loading-text="载入中...">
       <h2 class="area-title">推荐MV<i class="iconfont icon-icon_left_arrow"></i></h2>
      <div class="mv-list"  v-if="mvList.length">
        <MvRecommend v-for="item in mvList" :key="item.id" :mv="item"   />
      </div>
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
      loading1:false,
      loading2:false,
      loading3:false,
      loading4:false,
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
      this.loading1 = true
      const  {result=[]} = await this.$http("/personalized?limit=10");
      this.algList = result || [];
      this.loading1 = false
    },
    async getPrivateContent(){
      this.loading2 = true
      const data = await this.$http("/personalized/privatecontent")
      this.privateContent = data.result
      this.loading2 = false
    },
    //最新音乐
    async getNewSong(){
      this.loading3 = true
      const data = await this.$http("/personalized/newsong?limit=12")
      this.newSongList = data.result
      this.loading3 = false
    },
    async getPersonalizedMv(){
      this.loading4 = true
      const {result=[]} = await this.$http("/personalized/mv");
      this.mvList = result 
      this.loading4 = false
    },
    //点击banner
    handleBannerClick(banner){
      if(banner.song){
        // this.getSongDetail(banner.song.id)
        if(this.id !== banner.song.id){
          this.getSongUrl(banner.song.id)
        }
      } else{
       
      }
    },
   async getSongDetail(id){
     let songDetail = await  this.$http(`/song/detail?ids=${id}`) 
     
    },
    //点击背景
    handleBgClick(id){
      this.newSongId = id
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
