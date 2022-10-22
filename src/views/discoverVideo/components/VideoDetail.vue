<template>
  <div
    class="video-detail"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
  >
    <div class="left-wrap">
      <h2 class="detail-header" @click="$router.go(-1)">
        <span class="el-icon-arrow-left"></span>MV详情
      </h2>
      <PlayerVideo
        v-if="urlData.url"
        :src="urlData.url"
        :volume="volume"
        width="800"
        height="450"
        ref="playerVideoRef"
      />
      <div class="artist-info">
        <div class="art-name-box">
          <img :src="videoDetail.avatarUrl" class="art-avatar" />
          <p class="art-name">{{ cname }}</p>
        </div>
        <div class="follow-btn">
          <i class="el-icon-plus"></i><span>关注</span>
        </div>
      </div>

      <h2 class="video-title">{{ videoDetail.title }}</h2>
      <p class="video-info">
        发布: <span class="video-publish"></span>{{ videoDetail.publishTime }}
        <span class="paly-count">{{
          videoDetail.playTime | playCountFilter
        }}</span>
      </p>
      <div class="tags-mv">
        <span
          class="tag-item"
          v-for="tag in videoDetail.videoGroup"
          :key="tag.id"
          >{{ tag.name }}</span
        >
      </div>
      <CountInfo :countInfo="countInfo" />
      <div class="comments-wrap"  >
        <Comments  :comments="hotComments" />
        <Comments  :comments="topComments"  title="精彩评论" />
        <Comments  :comments="comments"   title="最新评论"/>
      </div>
    </div>
    <div class="right-wrap">
      <h2 class="detail-header">相关推荐</h2>
      <div class="recomend-list">
        <VideoRcmdItem
          v-for="video in recdVideos"
          :key="video.vid"
          :video="video"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VedioDetail",
  data() {
    return {
      volume: 0.5,
      loading: false,
      urlData: {},
      videoDetail: {},
      recdVideos: [],
      countInfo: {},
      topComments: [],
      hotComments: [],
      comments: [],
    };
  },
  computed: {
    cname() {
      return this.videoDetail?.creator?.nickname || "";
    },
  },
  components: {
    VideoRcmdItem: () => import("./VideoRcmdItem.vue"),
    CountInfo: () => import("./CountInfo.vue"),
    Comments: () => import("./Comments.vue"),
  },
  methods: {
    async getMvUrl(id) {
      let { urls = [] } = await this.$http(`/video/url?id=${id}`);
      return urls[0];
    },
    async getVideoDetail(id) {
      let { data = {} } = await this.$http(`video/detail?id=${id}`);
      return data;
    },
    // 获取推荐mv
    async getRecdVideos(id) {
      //随机获取推荐mv
      let { data } = await this.$http(`/related/allvideo?id=${id}`);
      return data;
    },
    async getInfoCount(id) {
      return this.$http(`/video/detail/info?vid=${id}`);
    },
    //获取视频评论
    async getVideoComment(id) {
      return  this.$http(
        `/comment/video?id=${id}`
      );
      
    },
    initData() {
      this.loading = true;
      let id = this.$route.params.id;
      this.volume = parseFloat(window.localStorage.videoVolume) || 0.5;
      let promistList = [
        this.getMvUrl(id),
        this.getVideoDetail(id),
        this.getRecdVideos(id),
        this.getInfoCount(id),
        this.getVideoComment(id),
      ];
      Promise.all(promistList).then((res) => {
        this.urlData = res[0];
        this.videoDetail = res[1];
        this.recdVideos = res[2];
        this.countInfo = res[3];
        console.log('  res[3]: ',   res );
        this.topComments =   res[4].topComments;
        this.hotComments =   res[4].hotComments;
        this.comments =   res[4].comments;
      });
      this.loading = false;
    },
  },
  created() {
    this.initData();
  },
  mounted() {},
  watch: {
    $route: {
      deep: true,
      handler(val) {
        // 还是mv详情页
        if (val.name === "VideoDetail") {
          this.initData();
        }
      },
    },
  },
};
</script>
<style scoped lang='scss'>
.video-detail {
  display: flex;
  flex-direction: row;
  .left-wrap {
    width: 800px;
    .video-player {
      width: 800px;
      height: 450px;
    }
    .artist-info {
      display: flex;
      align-items: center;
      margin: 10px 0;
      justify-content: space-between;
      .art-name-box {
        display: flex;
        align-items: center;
        .art-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .art-name {
          margin-left: 10px;
        }
      }
      .follow-btn {
        width: 100px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ec4141;
        background-color: #fdf5f4;
        border-radius: 15px;
        text-align: center;
        cursor: pointer;
        .el-icon-plus {
          margin-right: 2px;
        }
      }
    }
    .video-title {
      font-size: 20px;
      font-weight: 700;
      margin: 10px 0;
    }
    .video-info {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #bbb;
      .video-publish {
        margin-left: 20px;
      }
      .paly-count {
        margin-left: 20px;
      }
    }
    .tags-mv {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .tag-item {
        margin-right: 10px;
        margin-bottom: 10px;
        height: 20px;
        padding: 0 6px;
        line-height: 20px;
        text-align: center;
        border-radius: 10px;
        background-color: #f5f5f5;
        color: #666;
        font-size: 12px;
      }
    }
  }
  .right-wrap {
    width: 400px;
    min-width: 360px;
    margin-left: 36px;
  }
  .detail-header {
    height: 24px;
    font-size: 16px;
    font-weight: 800;
    color: #1d1d1f;
    margin: 10px 0;
    display: flex;
    cursor: pointer;
    vertical-align: middle;
    align-items: center;
    .el-icon-arrow-left {
      font-size: 18px;
      font-weight: 800;
    }
  }
  .comments-wrap{
    margin-top: 20px;
  }
}
.video-player {
  background-color: black;
  height: 400px;
  width: 800px;
}
</style>