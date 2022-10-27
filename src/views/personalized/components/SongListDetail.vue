<template>
  <div
    class="song-list-detail"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
    style="padding: 10px 0 0px"
  >
    <ListDetailHeader />
    <el-table
      :data="songList"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :header-cell-style="headerRowStyle"
      @row-dblclick="playSong"
      highlight-current-row
    >
      <el-table-column type="index">
        <template slot-scope="{ row, $index: index }">
          <FirstColState :curId="row.id" :index="index" />
        </template>
      </el-table-column>
      <el-table-column width="80px">
        <template slot-scope="{ row }">
          <p class="song-opts">
            <span class="iconfont icon-heart"></span>
            <span
              class="iconfont icon-xiazai"
              @click="downloadMusic(row)"
            ></span>
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
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import songTable from "@/mixins/songTable";
import playSong from "@/mixins/playSong";
export default {
  name: "SongListDetail",
  props: {},
  mixins: [songTable, playSong],
  data() {
    return {
      loading: false,
      songList: [],
    };
  },
  computed: {
    ...mapState("player", [
      "curSongListId",
      "curSongList",
      "curSongListDetail",
      "id",
      "name",
      "playing",
    ]),
  },
  watch: {},
  components: {
    ListDetailHeader: () => import("./ListDetailHeader.vue"),
  },
  methods: {
    ...mapMutations("player", ["addSong", "setCurSLId", "setCurSL","setDownloadList","downloadList","setdlProgress"]),
    downloadMusic(song) {
      this.$http(`/song/url?id=${song.id}`).then((res) => {
        let url = res.data[0].url;
        if (url) {
          //下载音乐
          this.download(url, song);
        } else {
          this.$message.error("暂无版权");
        }
      });
    },
    download(url, song) {
      // let a = document.createElement("a");
      // a.href = url;
      // a.download = name;
      // document.body.appendChild(link);
      // a.click();
      // URL.revokeObjectURL(link.href);
      // document.body.removeChild(a);
      let dlTime = new Date().getTime();
      song.dlTime = dlTime
      this.setDownloadList(song)
      axios({
        url,
        responseType: "blob",
        onDownloadProgress: (progressEvent) =>{
          if (progressEvent.lengthComputable) {
            let dlProgress = +((progressEvent.loaded / progressEvent.total) *100).toFixed(2); //实时获取最新下载进度
            song.progress = dlProgress;
            this.setdlProgress({id:song.id,progress:dlProgress,tatal:progressEvent.total})
          }
        },
      }).then((res) => {
        let link = document.createElement("a");
        link.href = URL.createObjectURL(res.data);
        link.download = `${song.name}.mp3`;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      });
    },
    //获取歌单所有歌曲
    async getSongListDetail(id) {
      this.loading = true;
      const { songs } = await this.$http(
        `/playlist/track/all?id=${id}&limit=15&offset=${this.offset}`
      );

      this.songList = songs;
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
        padding: "1px 0",
        borderColor: "transparent",
        "font-size": "12px",
      };
      if (columnIndex == 0) {
        //第一列排行字体颜色
        let bs = {
          ...baseStyle,
          borderRadius: "5px 0 0 5px",
          textAlign: "center",
        };
        return bs;
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
</style>