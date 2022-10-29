<template>
  <div class="music-detail-wrap" :class="visible ? 'visible' : ''">
    <div
      class="song-info-box"
      v-loading="lyricLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="transparent"
      element-loading-text="载入中..." v-if="show"
    >
      <div class="song-name text-of-single">
        {{ songDetail.name }}
      </div>
      <p class="singer-name text-of-single">{{ arns }}</p>
    </div>
    <div class="player-box">
      <div class="left-cover" >
        <div class="img-box" :class="playing?'cover-rotate':'rotate-pause'">
          <img
            src="https://p2.music.126.net/uG77ErMNkYLeZKxD52FeMw==/109951167953199692.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="right-lyrics" ref="lyricWrap">
          <div class="lyric-wrap" :style="tranformObj">
            <p class="lyric-item" v-for="(item, index) in lyricList" :class="{'active':index==activeIndex}" :key="index">
            {{ item.content }}
          </p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MusicDetail",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      lyricList: [],
      lyricLoading: false,
      activeIndex: 0,
      lywrapHeight: 0,
      tranformObj: {
        transform: "translateY(0px)",
      },
    };
  },
  computed: {
    ...mapState("player", ["id", "songDetail","currentTime","playing"]),
    show(){
      return Object.keys(this.songDetail).length
    },
    arns() {
      let aln = this.songDetail?.al?.name;
      return (
        this.songDetail?.ar?.map((item) => item.name).join("/") + aln || "FXJ"
      );
    },
  },
  watch: {
    async visible(val) {
      if (val) {
       this.getLyric();
      }
    },
    id(id) {
       if(id&&this.visible) this.getLyric()
    },
    currentTime(time){
      if(time){
        this.activeIndex =  this.findIndex(time)
        console.log('this.lywrapHeight: ', this.lywrapHeight/2);
        let height = 30 * this.activeIndex - this.lywrapHeight /2
        this.tranformObj = {
          transform: `translateY(-${height}px)`
        }
      }
    }
  },
  components: {},
  methods: {
    strToTime(str) {
      let timeArr = str.slice(1).split(".")[0].split(":");
      let time = timeArr[0] * 60 + timeArr[1] * 1;
      return time;
    },
    //计算歌词位置
    findIndex(currentTime){
      let index = 0;
      for(let i = 0;i<this.lyricList.length;i++){
        if(currentTime<this.lyricList[i].time){
          index = i-1;
          break;
        }
      }
      return index;
    },
    lyricHandle(lyrisStr){
        let lyArr = lyrisStr.split("\n");
        //如果没有时间戳的歌词
        if (lyArr[0].indexOf("[") === -1) {
          this.lyricList = lyArr.map((item) => {
            return {
              content: item,
            };
          })
        } else {
          this.lyricList = lyArr
            .filter((item) => item)
            .map((item) => {
              let itemArr = item.split("]");
              let time = this.strToTime(itemArr[0]);
              let content = itemArr[1];
              return {
                time,
                content,
              };
            });
        }
        
    },
    //请求歌词
    async getLyric() {
      this.lyricLoading = true;
      let res = await this.$http("/lyric?id=" + this.id);
      this.lyricHandle(res.lrc.lyric)
      this.lyricLoading = false;
    },
    getWrapHeight() {
      this.lywrapHeight = this.$refs.lyricWrap.offsetHeight;
    },
  },
  created() {},
  mounted() {
    if(this.visible && this.lyricList.length===0) this.getLyric()
    this.lywrapHeight = this.$refs?.lyricWrap?.offsetHeight || 600
   document.addEventListener('resize',this.getWrapHeight)
  },
  beforeDestroy(){
    document.removeEventListener('resize',this.getWrapHeight)
  }
};
</script>
<style scoped lang='scss'>
.music-detail-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 100%;
  height: calc(100vh - 140px);
  width: 100vw;
  z-index: 199;
  background: linear-gradient(to bottom, #bcbcbc 0%, #f5f5f5 30%, #fff 100%);
  transition: all 0.3s ease-in-out;
  .song-info-box {
    margin: 30px auto 10px;
    max-width: 800px;
    .song-name {
      font-size: 22px;
      font-weight: 600;
      color: #333;
      text-align: center;
      overflow: hidden;
    }
    .singer-name {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }

  // 播放器
  .player-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px auto;
    max-width: 1000px;
    min-width: 400px;
    overflow: auto;
    height: calc(100vh - 260px);
    .left-cover {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .img-box {
        width: 80%;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        cursor: pointer;
         animation: cover-rotate 20s linear infinite;
        &.cover-rotate{
          animation-play-state: running;
          
        }
        &.rotate-pause{
          animation-play-state: paused;
        }
        &::after {
          content: "";
          display: block;
          padding-bottom: 100%;
        }
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
    .right-lyrics {
      flex: 1;
      margin-left: 40px;
      height: 100%;
      overflow: auto;
      margin-top: 30px;
      overflow: auto;
      .lyric-wrap{
        transition:all 0.3s ease-in-out;
        overflow: auto;
        .lyric-item {
        font-size: 14px;
        color: #a4a4a4;
        line-height: 30px;
        height:30px;
        vertical-align: middle;
        text-align: center;
        &.active {
          color: #333;
          font-size: 15px;
          font-weight: 600;
        }
      }
      }
    }
  }
}
.music-detail-wrap.visible {
  top: 60px;
}
@keyframes cover-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>