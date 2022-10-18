<template>
  <div  class="video-item-box">
    <div class="cover-box">
      <img :src="video.coverUrl" :alt="video.title" class="cover-img">
      <span class="play-number">
        <i class="iconfont icon-play"></i>
        <span class="number" v-if="video.playTime">
          {{video.playTime | playCountFilter}}</span>
      </span>
      <span class="video-dt">{{video.durationms | formatDuration}}</span>
    </div>
    <div class="video-desc">
      <p class="video-title text-of-single">
        <Mtag content="MV" v-if="!video.type"/> <span v-html="video.title"></span></p> 
     <p class="video-artist text-of-single">by {{cname(video)}}</p> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoItemBox',
  props: {
    video:{
      default:()=>{},
      type:Object
    }
  },
  data () {
    return {

    }
  },
  computed: { 

  },
  watch: { 

  },
  components: { 

  },
  methods: {
    cname(video){
      return video?.creator.map(item => item.userName).join('/') || ''
    },
  },
  created () { 

  },
  mounted () { 

  },
}
</script>
<style scoped lang='scss'>
.video-item-box{
  .cover-box{
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    overflow: hidden;
    border-radius: 5px;
    .cover-img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
    .play-number{
      position: absolute;
      top: 8px;
      right: 8px;
      color: #fff;
      font-weight: 500;
      display: flex;
      align-items: center;
      vertical-align:middle;
      .icon-play{
        font-size: 14px;
      }
      .number{
        font-size: 10px;
      }
    }
    .video-dt{
      position: absolute;
      bottom: 8px;
      right: 8px;
      color:#fff;
      font-size: 12px;
    }
  .video-desc{
    margin-top: 8px;
    width:calc(100% - 16px);
    .video-title{
      font-size: 14px;
      color: #555;
      &:hover{
        color: #222;
      }
    }
    .video-artist{
     margin-top: 2px;
      font-size: 12px;
      color: #999;
      &:hover{
        color: #777;
      }
    }
  }
}
</style>