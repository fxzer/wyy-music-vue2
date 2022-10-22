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
      <img :src="picSrc" :alt="song.name" class="song-img" />
      <div class="song-info">
        <div class="song-info-top">
          <div class="song-name text-overflow">
            {{ song.name || "开源云音乐" }}
            <span class="alia" v-for="aliaItem in song.alia">{{
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
          class="iconfont icon-shunxubofang"
          v-if="loopType === 0"
          @click="changeLoopType(1)"
        ></span>
        <span
          class="iconfont icon-danquxunhuan"
          v-else-if="loopType === 1"
          @click="changeLoopType(2)"
        ></span>
        <span
          class="iconfont icon-suiji"
          v-else
          @click="changeLoopType(0)"
        ></span>
        <span class="iconfont icon-shangyi"></span>
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
        <span class="iconfont icon-xiayi"></span>
        <span class="iconfont icon-list"></span>
      </div>
      <div class="bottom-slider">
        <span class="start-time">{{
          currentTime | formatDuration(false)
        }}</span>
        <el-slider
          v-model="currentTime"
          :show-tooltip="false"
          :max="duration"
          @change="handleDrag"
        ></el-slider>
        <span class="end-time">{{ totalDt | formatDuration }}</span>
      </div>
    </div>
    <div class="tools-box">
      <!-- <el-popover
        width="80"
        trigger="click"
        placement="top" > -->
      <p class="iconfont icon-laba" slot="reference" @click="volumeClick"></p>
      <div class="volume-box">
        <el-slider v-model="currentVolume" vertical height="100px"> </el-slider>
      </div>
      <!-- </el-popover> -->
      <p class="iconfont icon-unorderedlist" @click="openPlayList"></p>
    </div>
    <PlayList :visible="playListVisible" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
let volume = parseFloat(window.localStorage.audioVolume) || 50;
export default {
  name: "BottomBar",
  props: {},
  data() {
    return {
      currentTime: 0,
      interval: null,
      currentVolume: volume,
      playListVisible: false,
      defaultPicUrl: require("../assets/images/default_music_pic.png"),
    };
  },
  components: {
    PlayList: () => import("./components/PlayList.vue"),
  },
  methods: {
    ...mapMutations("player", [
      "init",
      "setAudioTime",
      "setPalyState",
      "setLoopType",
      "setVolume",
    ]),
    // 拖动进度条
    handleDrag(val) {
      this.setAudioTime(val);
      this.currentTime = val;
    },
    ended(a) {
      console.log("ended-a: ", a);
      this.setPalyState(false);
    },
    timeUpdate(c) {},
    changeLoopType(type) {
      this.setLoopType(type);
    },
    openPlayList() {
      this.playListVisible = !this.playListVisible;
    },
    //
    volumeClick() {
      if (this.volume === 0) {
        //取消静音
        let volume = parseInt(localStorage.getItem("audioVolume"));
        this.setVolume(volume);
      } else {
        //静音
        this.setVolume(0);
      }
    },
  },
  computed: {
    ...mapState("player", ["audio", "playing", "song", "loopType", "volume"]),
    ...mapGetters("player", ["totalDt", "isPlaying"]),
    //时长
    duration() {
      return parseInt(this.totalDt / 1000);
    },
    picSrc() {
      return this.song.picUrl || this.defaultPicUrl;
    },
    ars() {
      return this.song.ar || [{ id: 999999, name: "FXJ" }];
    },
  },
  mounted() {
    this.init(this.$refs.audioRef); //初始化audio
  },
  created() {},
  watch: {
    isPlaying(val) {
      if (val) {
        this.interval = setInterval(() => {
          this.currentTime = parseInt(this.audio.currentTime);
        }, 1000);
      } else {
        clearInterval(this.interval);
      }
    },
    currentVolume(val) {
      this.setVolume(val);
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
  z-index: 999;
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
      // &.rotate{
      //   animation: rotate 10s linear infinite;
      // }
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
      box-shadow: 0 0 6px #ddd;
      border-radius: 6px;
      right: 80px;
      bottom: 60px;
      background-color: #fff;
      z-index: 9999;
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
      content: '';
      position: absolute;
      border-width: 10px;
      right: 50%;
      bottom: 0px;
      width: 0;
      height: 0;
      transform: translateX(-50%);
      border-bottom: 10px solid transparent;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #fff;
      /* .bottom-bar .tools-box .volume-box[data-v-e14cbb8e]::after {
    content: "";
    position: absolute;
    /* border-width: 8px; */
    width: 14px;
    height: 14px;
    right: 7px;
    bottom: -6px;
    transform: rotate(45deg);
    /* width: 0; */
    z-index: -5;
    box-shadow: 0 0 3px #ccc;
    /* height: 0; */
    /* transform: translateX(-50%); */
    /* border-bottom: 10px solid transparent; */
    /* border-left: 10px solid transparent; */
    /* border-right: 10px solid transparent; */
    /* border-top: 10px solid #fff; */
} */
    }
  }
}
</style>