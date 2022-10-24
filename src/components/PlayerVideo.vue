<template>
  <div class="player-video">
    <!-- 自动播放 -->
    <video
      ref="videoRef"
      class="video-js vjs-default-skin vjs-big-play-centered"
      :width="width"
      :height="height"
      :muted="muted"
      controls
    >
      <!-- :muted="muted"
      autoplay="autoplay" -->
      <source :src="src" />
    </video>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "PlayerVideo",
  props: {
    src: {
      type: String,
      default: "",
    },
    muted: {
      type: Boolean,
      default: true, //静音且自动播放,没有此属性会报错
    },
    volume: {
      type: [String, Number],
      default: 0.5,
    },
    width: {
      type: [String, Number],
      default: 640,
    },
    height: {
      type: [String, Number],
      default: 360,
    },
  },
  data() {
    return {
      player: null, // 用来存储当前 video
      volumeVideo: this.volume,
    };
  },
  computed: {},
  watch: {
    src(val) {
      if (val) this.play();
    },
  },
  components: {},
  methods: {
     ...mapMutations('player',['setPalyState']),
    play() {
      this.player.src({ src: this.src });
      this.player.load(this.src);
      this.player.play(this.volumeVideo);
    },
    initPlayer() {
      const _this = this;
      this.player = this.$video(this.$refs.videoRef, this.options, function () {
        this.on("volumechange", () => {
          // 存储音量
          _this.volumeVideo = this.volume();
          window.localStorage.videoVolume = this.volume();
        });
        this.on("play", () => {
          console.log('play: ',  );
          this.volume(_this.volumeVideo);
          _this.setPalyState(false)
        });
      });
    },
  },
  created() {},
  mounted() {
    this.initPlayer();
  },
};
</script>
<style scoped lang='scss'>
.player-video {
  ::v-deep .video-js button.vjs-big-play-button {
    width: 50px !important;
    height: 50px !important;
    border-radius: 50% !important;
    overflow: hidden;
    border: 1px solid #fff;
  }
  ::v-deep .vjs-big-play-button .vjs-icon-placeholder {
    border-radius: 50% !important;
  }
  ::v-deep .vjs-paused .vjs-big-play-button,
  ::v-deep .vjs-paused.vjs-has-started .vjs-big-play-button {
    display: block !important;
  }
  ::v-deep .video-js .vjs-time-control {
    display: block !important;
    padding-right: 0 !important;
  }
  ::v-deep .video-js .vjs-remaining-time {
    display: none !important;
  }
  ::v-deep .video-js .vjs-play-progress {
    background-color: #ec4141 !important;
  }
  ::v-deep .video-js .vjs-play-progress:before {
    top: -4px;
  }
  ::v-deep .video-js .vjs-volume-level {
    background-color: #ec4141 !important;
  }
  ::v-deep .video-js .vjs-slider-horizontal .vjs-volume-level:before {
    top: -4px;
  }
  ::v-deep .video-js .vjs-duration.vjs-time-control.vjs-control {
    padding-left: 0 !important;
  }
  ::v-deep .video-js  *:not(.vjs-visible-text) > .vjs-control-text {
    display: none !important;
  }
}
</style>