<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-15 12:40:20
 * @FilePath: \vue-wyy-music\src\components\layout\BottomBar.vue
 * @Description: 
-->
<template>
  <div class="bottom-bar">
    <audio
      ref="audioRef"
      preload="auto"
      @timeupdate="timeUpdate"
      @ended="ended"
      style="displa: none; z-index: -999"
    ></audio>
    <div class="song-box">
      <img :src="picSrc" class="song-img" />
      <div class="song-info">
        <div class="song-info-top">
          <div class="song-name text-overflow">
            {{ songDetail.name || "开源云音乐" }}
            <span class="alia" v-for="aliaItem in songDetail.alia">{{
              aliaItem
            }}</span>
          </div>
          <span class="iconfont icon-heart"></span>
        </div>
        <div class="singer-name">
          <span class="name-item" v-for="ar in ars" :key="ar.id">{{
            ar.name
          }}</span>
        </div>
      </div>
    </div>
    <div class="play-actions">
      <div class="top-control">
        <span
          title="顺序播放"
          class="iconfont icon-shunxubofang"
          v-if="loopType === 0"
          @click="changeLoopType(1)"
        ></span>
        <span
          title="单曲循环"
          class="iconfont icon-danquxunhuan"
          v-else-if="loopType === 1"
          @click="changeLoopType(2)"
        ></span>
        <span
          title="随机播放"
          class="iconfont icon-suiji"
          v-else
          @click="changeLoopType(0)"
        ></span>
        <span class="iconfont icon-shangyi" @click="handlePrev"></span>
        <!-- || -->
        <span
          class="iconfont icon-pause"
          v-if="playing"
          @click.stop="setPalyState(false)"
        ></span>
        <span
          class="iconfont icon-playfill"
          v-else
          @click.stop="setPalyState(true)"
        ></span>
        <span class="iconfont icon-xiayi" @click="handleNext"></span>
      </div>
      <div class="bottom-slider">
        <span class="start-time">{{
          currentTime | formatDuration(false)
        }}</span>
        <el-slider
          v-model="currentTime"
          :show-tooltip="false"
          :max="duration"
          @change="setAudioTime"
        ></el-slider>
        <span class="end-time">{{ totalDt | formatDuration }}</span>
      </div>
    </div>

    <!-- 右侧操作按钮 -->
    <div class="tools-box">
      <div
        class="volume-wrap"
        :class="showVolume ? 'show-volume-box' : ''"
        @mouseenter="showVolume = true"
        @mouseleave="showVolume = false"
      >
        <p
          class="iconfont"
          :class="muted ? 'icon-jingyin' : 'icon-laba'"
          slot="reference"
          @click="setMuted"
        ></p>
        <div class="volume-box">
          <el-slider
            v-model="currentVolume"
            vertical
            height="100px"
            :show-tooltip="false"
          >
          </el-slider>
        </div>
      </div>
      <el-badge :value="playList.length" :is-dot="false" :hidden="false">
        <p class="iconfont icon-unorderedlist" @click="openPlayList"></p>
      </el-badge>
    </div>
    <PlayList :visible="playListVisible" />
  </div>
</template>

<script>
import { mapState, mapGetters,mapActions, mapMutations } from "vuex";
let volume = parseFloat(window.localStorage.audioVolume) || 50;
export default {
  name: "BottomBar",
  props: {},
  data() {
    return {
      interval: null,
      currentTime: 0,
      currentVolume: volume,
      showVolume: false,
      playListVisible: false,
      defaultPicUrl: require("../assets/images/default_music_pic.png"),
    };
  },
  components: {
    PlayList: () => import("./components/PlayList.vue"),
  },
  computed: {
    ...mapState("player", [
      "id",
      "audio",
      "muted",
      "playing",
      "songDetail",
      "loopType",
      "volume",
      "playList",
    ]),
    ...mapGetters("player", ["totalDt"]),
    //时长
    duration() {
      return parseInt(this.totalDt / 1000);
    },
    picSrc() {
      return this.songDetail.al.picUrl || this.defaultPicUrl;
    },
    ars() {
      return this.songDetail.ar || [{ id: 999999, name: "FXJ" }];
    },
  },
  methods: {
    ...mapMutations("player", [
      "init",
      "setAudioTime",
      "setPalyState",
      "setLoopType",
      "setVolume",
      "setMuted",
      "setSongUrl",
      "setSongDetail",
    ]),
    ...mapActions('player',['getSongUrl']),
    ended() {
      if(this.loopType === 0){//列表循环
        this.handleNext()
      }else if(this.loopType === 2){//随机播放
        this.handleRandom()
      }
    },
    handleRandom(){
      let randomIndex = Math.floor(Math.random() * this.playList.length)
      let radomSong = this.playList[randomIndex]
      this.getSongUrl(radomSong.id,radomSong);
    },
    timeUpdate() {
      this.currentTime = this.$refs.audioRef.currentTime;
    },
    changeLoopType(type) {
      this.setLoopType(type);
    },
    openPlayList() {
      this.playListVisible = !this.playListVisible;
    },
    handlePrev(){//上一首
      let index = this.playList.findIndex(item => item.id === this.id);
      if(index === 0){
        index = this.playList.length - 1;
      }else{
        index--;
      }
      let preSong = this.playList[index];
      console.log('handlePrev: ',  index, preSong);
      this.getSongUrl(preSong.id,preSong);
    },
    handleNext(){//下一首
      let index = this.playList.findIndex(item => item.id === this.id);
      if(index === this.playList.length - 1){
        index = 0;
      }else{
        index++;
      }
      let nextSong = this.playList[index];
      console.log('handleNext: ',  index, nextSong);
      this.getSongUrl(nextSong.id,nextSong);
    }
  },

  mounted() {
    this.init(this.$refs.audioRef); //初始化audio
    let bottomBar = document.querySelector(".bottom-bar");
    document.addEventListener("click", ($event) => {
      let isbottomBar = bottomBar?.contains($event.target);

      let playListWrap = document.querySelector(
        ".playlist-drawer .el-drawer.rtl"
      );
      let isListWrap = playListWrap?.contains($event.target);
      if (!isListWrap && !isbottomBar && this.playListVisible) {
        this.playListVisible = false;
      }
    });
    4;

    //监听audio
    this.$refs.audioRef.addEventListener("canplay", () => {
      this.setPalyState(true);
    });
  },
  created() {},
  watch: {
    currentVolume(val) {
      this.setVolume(val);
    },
    playList: {
      handler(list) {
        if (!list.length) {
          this.setPalyState(false);
          return;
        }
        let firstSong = list[0];
        if (this.id === firstSong.id) {
          //第一首歌为上一次暂停播放的歌曲,则继续播放
          this.setPalyState(true);
        } else {
          this.setAudioTime(0);
          this.setSongDetail(firstSong);
          this.getSongUrl(firstSong.id,firstSong) 
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang='scss'>
.bottom-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 80px;
  width: 100%;
  border-top: 1px solid #e0e0e0;
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  z-index: 99999;
  .song-box {
    padding: 10px;
    width: 364px;
    display: flex;
    cursor: pointer;
    .song-img {
      width: 52px;
      height: 52px;
      border-radius: 5px;
      margin-right: 12px;
    }
    .song-info {
      color: #373737;
      .song-info-top {
        padding: 4px 0;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        .song-name {
          max-width: 300px;
          font-size: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          .alia {
            font-size: 14px;
            margin-left: 4px;
            color: #999;
          }
        }
        .iconfont {
          margin-left: 5px;
          font-size: 18px;
        }
      }
      .singer-name {
        font-size: 12px;
        color: #373737;
      }
    }
  }
  .play-actions {
    width: 50%;
    min-width: 500px;
    padding: 10px 20px;
    padding-bottom: 4px;
    // 播放相关控制按钮
    .top-control {
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 18px;
        margin: 0 12px;
        cursor: pointer;
        color: #313131;
        &:hover {
          color: #ec4141;
        }
      }
      .icon-playfill,
      .icon-pause {
        font-size: 24px;
        background-color: #f5f5f5;
        border-radius: 50%;
        padding: 8px;
        padding-left: 9px;
      }
    }
    .bottom-slider {
      display: flex;
      justify-content: center;
      align-items: center;
      .start-time,
      .end-time {
        font-size: 12px;
        color: #373737;
        vertical-align: middle;
      }
      .start-time {
        margin-right: 10px;
      }
      .end-time {
        margin-left: 8px;
      }
    }
    .el-slider {
      //滑块进度条
      width: 86%;
      ::v-deep .el-slider__runway {
        margin: 10px 0;
      }
      ::v-deep .el-slider__runway .el-slider__bar {
        background-color: #ec4141;
      }
      ::v-deep .el-slider__button {
        width: 10px;
        height: 10px;
        background-color: #ec4141;
        border-color: #ec4141;
      }
    }
  }
  .tools-box {
    width: 300px;
    padding-right: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    .iconfont {
      font-size: 20px;
      margin: 0 12px;
      cursor: pointer;
      color: #313131;
      &:hover {
        color: #ec4141;
      }
    }
    .volume-box {
      width: 30px;
      height: 120px;
      padding-top: 10px;
      position: absolute;
      display: none;
      filter: drop-shadow(0 0 6px #ddd);
      border-radius: 6px;
      right: 80px;
      bottom: 60px;
      background-color: #fff;
      ::v-deep .el-slider.is-vertical .el-slider__runway {
        margin: 0 12px !important;
      }
      ::v-deep .el-slider__button {
        width: 10px;
        height: 10px;
        background-color: #ec4141;
        border-color: #ec4141;
      }
      ::v-deep .el-slider__bar {
        background-color: #ec4141;
      }
    }
    //倒三角
    .volume-box::after {
      content: "";
      position: absolute;
      border-width: 10px;
      right: 5px;
      bottom: -17px;
      width: 0;
      height: 0;
      border-bottom: 10px solid transparent;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #fff;
    }
    //歌单数量标记
    ::v-deep .el-badge .el-badge__content {
      line-height: 16px !important;
      &.is-fixed {
        top: 0;
        right: 17px;
      }
    }
  }
  .show-volume-box .volume-box {
    display: block;
    cursor: pointer;
  }
}
</style>