<template>
  <div
    class="song-list-detail"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
    style="padding: 10px 0 0px"
  >
    <div class="detail-box">
      <img :src="listDetail.coverImgUrl" class="list-cover" />

      <div class="info-wrap">
        <div class="title-wrap">
          <h2>{{ listDetail.name }}</h2>
        </div>
        
        <div class="creator-wrap">
          <img :src="listDetail.creator.avatarUrl" class="creator-avatar" />
          <el-link class="creator-name" :underline="false">{{
            listDetail.name
          }}</el-link>
          <p class="creator-time">{{ createTime | formatTime }}</p>
        </div>

        <div class="desc-wrap">
          <p>标签: <span v-for="tag in listDetail.tags" :key="tag"></span></p>
          <p>
            歌曲: {{ listDetail.trackCount }} 播放:
            {{ listDetail.palyCount | playCountFilter }}
          </p>
          <p>简介: {{ listDetail.description }}</p>
        </div>
      </div>
    </div>
    <el-table
      :data="songList"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      highlight-current-row
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column width="80px">
        <template slot-scope="{ row }">
          <p class="song-opts">
            <span class="iconfont icon-heart"></span>
            <span class="iconfont icon-xiazai"></span>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <p v-html="row.name"></p>
        </template>
      </el-table-column>
      <el-table-column label="歌手">
        <template slot-scope="{ row }">
          {{ arStr(row) }}
        </template>
      </el-table-column>
      <el-table-column label="专辑" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <div class="album" style="color: #888">
            {{ alStr(row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="dt" label="时长" width="100px">
        <template slot-scope="{ row }">
          {{ dtStr(row) | formatDuration }}
        </template>
      </el-table-column>
      <el-table-column prop="pop" label="热度" width="120px">
        <template slot-scope="{ row }">
          <el-slider v-model="row.pop" disabled></el-slider>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import songTable from "@/mixins/songTable";

export default {
  name: "SongListDetail",
  props: {},
  mixins: [songTable],
  data() {
    return {
      loading: false,
      songList: [],
      listDetail: {},
    };
  },
  computed: {
    ...mapState("player", [
      "curSongListId",
      "curSongList",
      "curSongListDetail",
    ]),
  },
  watch: {},
  components: {},
  methods: {
    ...mapMutations("player", ["addSong", "setCurSLId", "setCurSL"]),
    //获取歌单所有歌曲
    async getSongListDetail(id) {
      this.loading = true;
      const { songs } = await this.$http(
        `/playlist/track/all?id=${id}&limit=15&offset=${this.offset}`
      );
      const { playlist } = await this.$http(`/playlist/detail?id=${id}`);
      this.songList = songs;
      this.listDetail = playlist;
      this.setCurSLId(id);
      this.setCurSL(songs);
      this.loading = false;
      return songs;
    },
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 == 0) return { background: "#FAFAFA" };
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let baseStyle = {
        padding: "2px 0",
        borderColor: "transparent",
      };
      if (columnIndex == 0) {
        //第一列排行字体颜色
        let bs = {
          ...baseStyle,
          borderRadius: "5px 0 0 5px",
          textAlign: "center",
        };
        if (rowIndex == 0) {
          return {
            ...bs,
            color: "#EC4141",
          };
        } else if (rowIndex == 1) {
          return {
            ...bs,
            color: "#F76560",
          };
        } else if (rowIndex == 2) {
          return {
            ...bs,
            color: "#F98981",
          };
        } else {
          return {
            ...bs,
            color: "#9C9C9C",
          };
        }
      } else if (columnIndex == 5) {
        return {
          ...baseStyle,
          color: "#999",
        };
      } else if (columnIndex == 6) {
        return {
          ...baseStyle,
          borderRadius: "0 5px 5px 0",
        };
      } else {
        return baseStyle;
      }
    },
  },
  created() {},
  mounted() {
    let id = this.$route.params.id;
    if (id != this.curSongListId) {
      this.getSongListDetail(id);
    } else {
      this.loading = true;
      this.songList = this.curSongList;
      this.loading = false;
    }
  },
};
</script>
<style scoped lang='scss'>
@import "../../searchResult/style/song.scss";
.detail-box {
  display: flex;
  .list-cover {
    width: 220px;
    height: 220px;
    margin-right: 20px;
    border-radius: 6px;
  }
  .info-wrap {
    flex: 1;
    .title-wrap {
      h2 {
        font-size: 18px;
        color: #1d1d1d;
        font-weight: 700;
      }
    }
    .creator-wrap{
      height: 30px;
      .creator-wrap{
        display: flex;
        align-items: center;
        .creator-avatar{
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .creator-name{
          margin:0 10px;
          color: rgb(69, 103, 212);
        }
        .creator-time{
          color: #999;
        }
      }
    }
  }
}
</style>