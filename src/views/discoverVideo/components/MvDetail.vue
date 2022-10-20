<template>
  <div class="mv-detail">
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
          <img :src="mvDetail.cover" class="art-avatar" />
          <p class="art-name">{{ artStr(mvDetail) }}</p>
        </div>
        <div class="follow-btn">
          <i class="el-icon-plus"></i><span>关注</span>
        </div>
      </div>

      <h2 class="mv-title">{{ mvDetail.name }}</h2>
      <p class="mv-info">
        发布: <span class="mv-publish"></span>{{ mvDetail.publishTime }}
        <span class="paly-count">{{
          mvDetail.playCount | playCountFilter
        }}</span>
      </p>
      <div class="tags-mv">
        <span class="tag-item" v-for="tag in mvDetail.videoGroup" :key="tag.id">{{ tag.name }}</span>
      </div>
    </div>
    <div class="right-wrap">
      <h2 class="detail-header">相关推荐</h2>
      <div class="recomend-list">
        <MvRcmdItem v-for="mv in recdMvs" :key="mv.id" :mv="mv"/>
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
      urlData: {},
      mvDetail: {},
      recdMvs: [],
    };
  },
  components: {
    MvRcmdItem: () => import("./MvRcmdItem.vue"),
  },
  methods: {
    artStr(mvDetail) {
      if (!mvDetail?.artists) return "";
      return mvDetail?.artists.map((item) => item.name).join("/") || "";
    },
    async getMvUrl(id) {
      let { data = {} } = await this.$http(`/mv/url?id=${id}`);
      return data;
    },
    async getMvDetail(id) {
      let { data = {} } = await this.$http(`/mv/detail?mvid=${id}`);
      return data;
    },
    // 获取推荐mv
    async getRecdMvs() {
      let { result = {} } = await this.$http(`/personalized/mv`);
      return result;
    },

  },
  created() {
    this.volume = parseFloat(window.localStorage.volume);
    let id = this.$route.params.id;
    let promistList = [this.getMvUrl(id), this.getMvDetail(id),this.getRecdMvs()];
    Promise.all(promistList).then((res) => {
      this.urlData = res[0];
      this.mvDetail = res[1];
      this.recdMvs = res[2];
    });
  },
  mounted() {},
};
</script>
<style scoped lang='scss'>
.mv-detail {
  display: flex;
  flex-direction: row;
  padding-bottom:100px;
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
    .mv-title {
      font-size: 20px;
      font-weight: 700;
      margin: 10px 0;
    }
    .mv-info {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #bbb;
      .mv-publish {
        margin-left: 20px;
      }
      .paly-count {
        margin-left: 20px;
      }
    }
    .tags-mv{
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .tag-item{
        margin-right:10px;
        margin-bottom:10px;
        height: 20px;
        padding:0 6px;
        line-height: 20px;
        text-align: center;
        border-radius:10px;
        background-color:#f5f5f5;
        color:#666;
        font-size:12px;
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
}
.video-player {
  background-color: black;
  height: 400px;
  width: 800px;
}
</style>