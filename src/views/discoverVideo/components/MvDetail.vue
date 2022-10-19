<template>
  <div class="mv-detail">
    <div class="left-wrap">
      <h2 class="detail-header">
        <span class="el-icon-arrow-left"></span>MV详情
      </h2>
      <vue-core-video-player
        class="video-player"
        controls="auto"
        autoplay
        v-if="urlData.url"
        :src="urlData.url"
      ></vue-core-video-player>

      <div class="artist-info">
        <div class="art-name-box">
          <img :src="mvDetail.cover"  class="art-avatar" />
          <!-- <p class="art-name">{{artStr()}}</p> -->
        </div>
        <div class="follow-btn"><i class="el-icon-plus"></i><span>关注</span></div>
      </div>

      <h2 class="mv-title">{{mvDetail.name}}</h2>
      <p class="mv-info">
        发布: <span class="mv-publish"></span>{{mvDetail.publishTime}}
        <span class="paly-count">{{mvDetail.playCount | playCountFilter}}</span>
      </p>
    </div>
    <div class="right-wrap">
      <h2 class="detail-header">相关推荐</h2>
      <div class="recomend-list"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VedioDetail",
  data() {
    return {
      urlData: {},
      mvDetail: {},
      src: "http://vodkgeyttp8.vod.126.net/cloudmusic/JWEhZCQgMDcwMCQiMDAgNA==/mv/410100/e3220d00575accac793b440ad91ac643.mp4?wsSecret=33b2bbe03b8d489262a303e54361e6a0&wsTime=1666181794",
    };
  },
  methods: {
    artStr(){
      return this.mvDetail?.artists 
    },
    async getMvUrl(id){
      let { data ={}} = await this.$http(`/mv/url?id=${id}`)
      this.urlData = data
      console.log(' this.urlData: ',  this.urlData);
    },
   async getMvDetail(id){
      let { data = {}} = await this.$http(`/mv/detail?mvid=${id}`)
      this.mvDetail = data
      console.log('  this.mvDetail : ',   this.mvDetail );
   }
  },
  created() {
    
  },
  mounted() {
    let id = this.$route.params.id
    this.getMvUrl(id)
    this.getMvDetail(id)
  },
};
</script>
<style scoped lang='scss'>
.mv-detail {
  display: flex;
  flex-direction: row;
  .left-wrap{
    width: 800px;
    .video-player {
      width: 800px;
      height: 450px;
    }
    .artist-info{
      display: flex;
      align-items: center;
      margin: 10px 0;
      justify-content: space-between;
      .art-name-box{
        display: flex;
        align-items: center;
        .art-avatar{
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          .art-name{
            margin-left: 10px;
          }
      }
       .follow-btn{
          width: 100px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color:#EC4141;
          background-color:  #FDF5F4;
          border-radius: 15px;
          text-align: center;
          cursor: pointer;
          .el-icon-plus{
            margin-right: 2px;
          }
        }
    }
    .mv-title{
        font-size: 20px;
        font-weight: 700;
        margin: 10px 0;
      }
      .mv-info{
         display: flex;
      align-items: center;
        font-size: 12px;
        color: #bbb;
        .mv-publish{
          margin-left: 20px;
        }
        .paly-count{
          margin-left: 20px;
        }
      }
  }
  .right-wrap{
    width:400px;
    min-width: 360px;
    margin-left:36px;
  }
  .detail-header{
    height: 24px;
    font-size: 16px;
    font-weight: 800;
    color:#1d1d1f;
    margin: 10px 0;
    display: flex;
    cursor: pointer;
    vertical-align: middle;
    align-items: center;
    .el-icon-arrow-left{
      font-size: 18px;
      font-weight: 800;
    }
  }
}
</style>