<template>
  <div
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
    style="padding-bottom: 100px;"
  >
  <div  class="videos-result video-wrap">
    <VideoItemBox v-for="video in videoList" :key="video.vid" :video="video" class="video-item" />
  </div>
    <Pagination v-bind="pageOption" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
// import videosRes from '@/mock/kw-videos'
// let videos = videosRes.result.videos
// console.log('videos: ', videos);
import page from "@/mixins/page";
import search from "@/mixins/search";
export default {
  name: "Videos",
  props: {},
  mixins: [page, search],
  data() {
    return {
      // videos
    };
  },

  computed: {
    videoList() {
      let reg = new RegExp(this.kw, "gi");
      return this.filterList.map(video => {
        video.title = video.title.replace(
          reg,
          `<span class="kw-highlight">${this.kw}</span>`
        );
        return video;
      });
    }
  },
  watch: {},
  components: {
    VideoItemBox: () =>
      import("@/views/discoverVideo/components/VideoItemBox.vue"),
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
@import '../style/video.scss';
</style>