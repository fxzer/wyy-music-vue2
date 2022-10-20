<template>
  <div class="mv-detail">
    <div class="left-wrap">
      <h2 class="detail-header">
        <span class="el-icon-arrow-left"></span>MV详情
      </h2>
      <!-- <vue-core-video-player
        class="video-player"
        controls="auto"
        autoplay
        v-if="urlData.url"
        :src="urlData.url"
      ></vue-core-video-player> -->
      <d-player ref="player   class="video-player  id="player" :options="options"></d-player>

      <div class="artist-info">
        <div class="art-name-box">
          <img :src="mvDetail.cover" class="art-avatar" />
          <p class="art-name">{{artStr(mvDetail)}}</p>
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
  data() {
    return {
      urlData: {},
      mvDetail: {},
      options: {
        container: document.getElementById("dplayer"), //播放器容器
        mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
        theme: "#FF4E4E", // 风格颜色，例如播放条，音量条的颜色
        loop: false, // 是否自动循环
        lang: "zh-cn", // 语言，'en', 'zh-cn', 'zh-tw'
        screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
        hotkey: true, // 是否支持热键，调节音量，播放，暂停等
        preload: "auto", // 自动预加载
        volume: 0.7, // 初始化音量
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
        logo: "https://qczh-1252727916.cos.ap-nanjing.myqcloud.com/pic/273658f508d04d488414fd2b84c9f923.png", // 在视频左上角上打一个logo
        video: {
          url: "", // 播放视频的路径
          pic: "", // 视频封面图片
          // thumbnails:  "", // 进度条上的缩略图,需要通过dplayer-thumbnails来生成
        },
        contextmenu: [
          //  自定义上下文菜单
          // 右键菜单
          {
            text: "b站",
            link: "https://www.bilibili.com",
          },
          {
            text: "选项二",
            click: (player) => {
              console.log('player: ', player);
            },
          },
        ],
        highlight: [
          // 进度条时间点高亮
          {
            text: "10M",
            time: 6,
          },
          {
            text: "20M",
            time: 12,
          },
        ],
      },
    };
  },
  methods: {
    artStr(mvDetail){
      console.log('this.mvDetail: ',  mvDetail);
      if(!this.mvDetail?.artists) return ''
      return this.mvDetail?.artists.map(item=>item.name).join('/') || ''
    },
    async getMvUrl(id) {
      let { data = {} } = await this.$http(`/mv/url?id=${id}`);
      return  data;
    },
    async getMvDetail(id) {
      let { data = {} } = await this.$http(`/mv/detail?mvid=${id}`);
      return data;
    },
  },
  created() {
    let id = this.$route.params.id;
    let promistList = [this.getMvUrl(id), this.getMvDetail(id)];
    Promise.all(promistList).then((res) => {
      this.urlData = res[0];
      this.mvDetail = res[1];
      this.options.video.url = this.urlData.url;
      this.options.video.pic = this.mvDetail.cover;
    });
  },
  mounted() {
  },
};
</script>
<style scoped lang='scss'>
.mv-detail {
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
</style>