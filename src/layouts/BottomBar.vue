<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-15 12:40:20
 * @FilePath: \vue-wyy-music\src\components\layout\BottomBar.vue
 * @Description: 
-->
<template>
  <div class='bottom-bar'>
    <div class="song-box">
      <img :src="picSrc" :alt="song.name" class="song-img"  >
      <div class="song-info">
        <div class="song-info-top">
          <div class="song-name text-overflow">{{song.name || '开源云音乐'}} 
            <span class="alia" v-for="aliaItem in song.alia">{{ aliaItem }}</span>
          </div>
          <span class="iconfont icon-heart"></span>
        </div>
        <div class="singer-name">
          <span class="name-item" v-for="ar in ars" :key="ar.id">{{ar.name}}</span>
        </div>
      </div>
    </div>
    <div class="play-actions">
      <div class="top-control">
        <span class="iconfont icon-shunxubofang"></span>
        <!-- <span class="iconfont icon-danquxunhuan"></span>
        <span class="iconfont icon-suiji"></span> -->
        <span class="iconfont icon-shangyi"></span>
        <span class="iconfont icon-pause" v-if="playing" @click.stop="setPalyState(false)"></span>
        <span class="iconfont icon-playfill" v-else @click.stop="setPalyState(true)"></span>
        <span class="iconfont icon-xiayi"></span>
        <span class="iconfont icon-list"></span>
      </div>
     <div class="bottom-slider">
      <span class="start-time">{{ currentTime | formatDuration(false)}}</span>
       <el-slider v-model="currentTime" :show-tooltip="false" :max="duration" @change="handleDrag"></el-slider>
      <span class="end-time">{{totalDt | formatDuration}}</span>
     </div>
    </div>
    <div class="tools-box"></div>
  </div>
</template>

<script>
import { mapState,mapGetters,mapMutations } from 'vuex'
export default {
  name: 'BottomBar',
  props: {
  },
  data () {
    return {
      currentTime: 0,
      interval: null,
      defaultPicUrl: require('../assets/images/default_music_pic.png')
    }
  },
  components: { 

  },
  methods: {
    ...mapMutations('player',['setAudioTime','setPalyState']),
    // 拖动进度条
    handleDrag(val) {
      this.setAudioTime(val)
      this.currentTime = val
    },
  },
    computed: {
    ...mapState('player',['audio','playing','song']),
    ...mapGetters('player',['totalDt','isPlaying']),
    //时长
    duration() {
      return parseInt(this.totalDt / 1000) 
    },
    picSrc(){
      return this.song.picUrl || this.defaultPicUrl
    },
    ars(){
      return this.song.ar || [{id:999999,name:'FXJ'}]
    }
  },
  mounted () { 
      //   this.audio.addEventListener('ended', () =>{
      //      //监听到播放结束后，在此处可调用自己的接口
      //      this.setPalyState(false)
      // }, false);
  },
  watch: { 
    isPlaying(val){
      if(val){
       this.interval =  setInterval(() => {
          this.currentTime =  parseInt(this.audio.currentTime)
        }, 1000);
      }else{
        clearInterval(this.interval)
      }
    }
  }
}
</script>
<style scoped lang='scss'>
 .bottom-bar{
   position: fixed;
   left:0;
   bottom:0;
   height: 80px;
   width:100%;
   border-top:1px solid #e0e0e0;
   display: flex;
   background-color: #fff;
   justify-content: space-between;
   z-index: 999;
   .song-box{
      padding:10px;
      width: 364px;
      display: flex;
      cursor: pointer;
      .song-img{
        width: 52px;
        height: 52px;
        border-radius:5px;
        margin-right:12px;
        // &.rotate{
        //   animation: rotate 10s linear infinite;
        // }
      }
      .song-info{
         color:#373737;
         .song-info-top{
           padding:4px 0;
           display: flex;
           align-items: center;
           flex-wrap: nowrap;
           .song-name{
             max-width: 300px;
             font-size: 16px;
             white-space: nowrap;
             overflow: hidden;
             text-overflow: ellipsis;
             display: flex;
             align-items: center;
             .alia{
                font-size: 14px;
                margin-left:4px;
                color:#999;
             }
           }
           .iconfont{
            margin-left:5px;
            font-size: 18px;
          }
         }
        .singer-name{
          font-size: 12px;
          color:#373737;
        }
      }
   }
   .play-actions{
    width: 50%;
    min-width: 500px;
    padding:10px 20px;
    padding-bottom: 4px;
    // 播放相关控制按钮
    .top-control{
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont{
        font-size: 18px;
        margin:0 12px;
        cursor: pointer;
        color:#313131;
        &:hover{
          color: #EC4141;
        }
      }
      .icon-playfill,.icon-pause{
        font-size: 24px;
        background-color: #F5F5F5;
        border-radius: 50%;
        padding: 8px;
        padding-left:9px;
      }
    }
    .bottom-slider{
      display: flex;
      justify-content: center;
      align-items:center;
      .start-time,.end-time{
        font-size: 12px;
        color:#373737;
        vertical-align:middle;
      }
      .start-time{
        margin-right: 10px;
      }
      .end-time{
        margin-left: 8px;
      }
    }
    .el-slider {
      //滑块进度条
      width: 86%;
      ::v-deep .el-slider__runway{
        margin:10px 0;
      }
      ::v-deep .el-slider__runway .el-slider__bar{
        background-color: #EC4141;
      }
      ::v-deep .el-slider__button{
        width: 10px;
        height: 10px;
        background-color: #EC4141;
        border-color:#EC4141;
      }
    }
   }
   .tools-box{
    width: 300px;
   }
    // @keyframes rotate {
    //   0% {
    //     transform: rotate(0deg);
    //   }
    //   100% {
    //     transform: rotate(360deg);
    //   }
    // }
 }
</style>