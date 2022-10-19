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
        :src="src"
      ></vue-core-video-player>
      <div class="artist-info">
        <img src="" alt="" class="art-avatar" />
        <p class="art-name">dddd</p>
      </div>
      <h2 class="mv-title">dddd</h2>
      <p class="mv-info">
        发布: <span class="mv-publish"></span>ddddd
        <span class="paly-count">dddd</span>
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
  props: {
    mv: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      src: "http://vodkgeyttp8.vod.126.net/cloudmusic/JWEhZCQgMDcwMCQiMDAgNA==/mv/410100/e3220d00575accac793b440ad91ac643.mp4?wsSecret=33b2bbe03b8d489262a303e54361e6a0&wsTime=1666181794",
    };
  },
  computed: {},
  watch: {},
  components: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.mv-detail {
  display: flex;
  flex-direction: row;
  .left-wrap{
    width: 800px;
    border:1px solid #ccc;
    .video-player {
      width: 800px;
      height: 450px;
    }
  }
  .right-wrap{
    width:400px;
    min-width: 360px;
    margin-left:36px;
    border:1px solid red
  }
  
}
</style>