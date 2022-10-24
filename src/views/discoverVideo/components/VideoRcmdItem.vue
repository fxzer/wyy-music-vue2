<template>
  <div class="recomend-item" @click="toVideoDetail(video.vid)">
    <div class="recomend-cover-box">
      <img :src="video.coverUrl"  />
      <div class="paly-info">
        <span class="iconfont icon-paly"></span>
        <span class="play-count">{{video.playTime |playCountFilter}}</span>
      </div>
      <span class="duration">{{video.durationms |formatDuration}}</span>
    </div>
    <div class="info-wrap">
      <div class="info-title text-of-multi">
       {{ video.title }}
      </div>
      <div class="info-des">
       by {{cname }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoRcmdItem',
  props: {
    video:Object
  },
  data () {
    return {

    }
  },
  computed: { 
    cname(){
      return this.video?.creator.map(item => item.userName).join('/') || ''
    }
  },
  watch: { 
  
  },
  components: { 

  },
  methods: {
    toVideoDetail(vid){
      let id = this.$route.params.id
      if(id == vid) return
      this.$router.push('/discoverVideo/videoDetail/'+vid)
    }
  },
  created () { 

  },
  mounted () { 

  },
}
</script>
<style scoped lang='scss'>
.recomend-item{
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  .recomend-cover-box{
    width: 180px;
    height: 100px;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
    .paly-info{
      position: absolute;
      top:4px;
      right:4px;
      font-size: 12px;
      color:#fff;
      display: flex;
      align-items: center;
      .icon-paly{
        font-size: 12px;
      }
      .play-count{
        color:#fff;
      }
    }
    
    .duration{
      position: absolute;
      bottom:4px;
      right:4px;
      font-size: 12px;
      color:#fff;
    }
  }
  .info-wrap{
    // flex:1;
     width: 180px;
    margin-left: 10px;
    .info-title{
      width: 180px;
      font-size: 14px;
      color: #333;
    }
    .info-des{
      margin-top: 15px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>