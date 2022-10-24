<template>
  <div class="detail-box">
    <img :src="detailObj.coverImgUrl" class="list-cover" />
    <div class="info-wrap">
      <div class="title-wrap">
        <h2><span class="song-list-tag">歌单</span>{{ detailObj.name }}</h2>
      </div>

      <div class="creator-wrap">
        <img :src="src" class="creator-avatar" />
        <el-link class="creator-name" :underline="false">{{
          detailObj.name
        }}</el-link>
        <p class="creator-time">{{ detailObj.createTime | formatTime }}</p>
      </div>
      <div class="opts-wrap">
        <div class="play-all btn-item" @click="palyAll">
          <i class="iconfont icon-playfill"></i>
          <span>播放全部</span>
        </div>
      </div>
      <div class="desc-wrap">
        <p v-if="hasTag">
          <span class="label">标签 :</span>
          <el-link
            :underline="false"
            type="primary"
            v-for="tag in detailObj.tags"
            :key="tag"
            >{{ tag }}</el-link
          >
        </p>
        <p>
          <span class="label">歌曲 :</span> {{ detailObj.trackCount }}
          <span class="label play">播放 :</span>
          {{ detailObj.playCount | playCountFilter }}
        </p>
        <p>
          <span class="label">简介 :</span>
          <span class="desc-text text-of-single">
            {{ detailObj.description || "..." }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import playSong from "@/mixins/playSong";
export default {
  name: "detailObjHeader",
  props: {},
  mixins: [playSong],
  data() {
    return {
      detailObj: {},
    };
  },
  computed: {
    src() {
      return this.detailObj?.creator?.avatarUrl || "";
    },
    hasTag() {
      return this.detailObj?.tags?.length > 0;
    },
  },
  watch: {},
  components: {},
  methods: {
    async getDetailObj(id) {
      const { playlist } = await this.$http(`/playlist/detail?id=${id}`);
      this.detailObj = playlist;
    },
  },
  created() {
    let id = this.$route.params.id;
    this.getDetailObj(id);
  },
  mounted() {},
};
</script>
<style scoped lang='scss'>
.detail-box {
  display: flex;
  margin-bottom: 10px;
  .list-cover {
    width: 200px;
    height: 200px;
    margin-right: 12px;
    border-radius: 8px;
  }
  .info-wrap {
    flex: 1;
    //标题
    .song-list-tag {
      font-weight: 400;
      color: #ec4141;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 12px;
      margin-right: 8px;
      background-color: #fff;
      border: 1px solid #ec4141;
    }
    .title-wrap {
      h2 {
        font-size: 20px;
        color: #1d1d1d;
        font-weight: 800;
        display: flex;
        align-items: center;
      }
    }
    //作者
    .creator-wrap {
      display: flex;
      align-items: center;
      margin: 10px 0;
      .creator-avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      .creator-name {
        margin: 0 8px 0 4px;
        font-size: 12px;
        color: #427bbd;
        &:hover {
          color: #223ee0;
        }
      }
      .creator-time {
        font-size: 12px;
        color: #999;
      }
    }
    .desc-wrap {
      p {
        margin: 0;
        font-size: 13px;
        color: #999;
        display: flex;
        align-items: center;
        margin: 8px 0;
        .label {
          color: #333;
          margin-right: 4px;
          &.play {
            margin-left: 10px;
          }
        }
        .el-link {
          margin-right: 4px;
          font-size: 13px;
          color: #427bbd;
          &:hover {
            color: #223ee0;
          }
          &::after {
            content: "/";
            margin: 0 2px;
            display: inline-block;
            color: #666;
          }
          &:last-child::after {
            content: "";
          }
        }
        .desc-text {
          display: inline-block;
          max-width: 400px;
        }
      }
    }
  }
  .opts-wrap {
    margin: 20px 0;
    display: flex;
    .btn-item {
      margin-right: 20px;
      cursor: pointer;
    }
    .play-all {
      width: 100px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      padding: 0 10px;
      border-radius: 15px;
      background: #ec4141;
      color: #fff;
      cursor: pointer;
      &:hover {
        background: #da3d3d;
      }
    }
  }
}
</style>