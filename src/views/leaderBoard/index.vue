<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 17:06:38
 * @FilePath: \vue-wyy-music\src\views\leaderBoard\index.vue
 * @Description: 
-->
<template>
  <div
    class="leader-board"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
  >
    <h2 class="area-title">官方榜</h2>
    <div
      class="board-top5"
      v-for="(board, index) in officialBoards"
      :key="board.id"
    >
      <!-- 榜单封面 -->
      <div class="cover-box">
        <img :src="board.coverImgUrl" :alt="board.name" class="board-cover" />
        <p class="update-time">
          {{ board.updateTime | formatTime("MM月dd日") }}更新
        </p>
        <PlayBtn :bgFilter="true" size="large" />
      </div>
      <!-- 前五歌曲 -->
      <div class="top5-songs">
        <el-table
          :data="songsTop5List[index]"
          :show-header="false"
          :row-style="rowStyle"
          :cell-style="cellStyle"
          @row-dblclick="playSong"
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name" show-overflow-tooltip> </el-table-column>
          <el-table-column >
            <template slot-scope="{ row }" show-overflow-tooltip >
              <!-- {{row.ar}} -->
              {{ row.ar.map((item) => item.name).join("/") }}
            </template>
          </el-table-column>
        </el-table>
        <el-link :underline="false" type="info"
          >查看全部 <i class="el-icon-arrow-right"></i
        ></el-link>
      </div>
    </div>
    <h2 class="area-title">全球榜</h2>
    <div class="global-board">
      <SongListBox
        v-for="board in globalBoards"
        :key="board.id"
        position="center"
        size="large"
        :algInfo="{
          ...board,
          picUrl: board.coverImgUrl,
        }"
      />
    </div>
  </div>
</template>

<script>
import playSong from '@/mixins/playSong'
export default {
  name: "LeaderBoard",
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      artistToplist: [],
      officialBoards: [], //官方榜
      globalBoards: [], //全球榜
      songsTop5List: [], //前五歌曲
    };
  },
  mixins: [ playSong],
  computed: {},
  components: {
    SongListBox: () =>
      import("@/views/personalized/components/SongListBox.vue"),
  },
  methods: {
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return {
          borderRadius: "5px",
          overflow: "hidden",
          background: "#FAFAFA",
        };
      }
      return {
        borderRadius: "5px",
        overflow: "hidden",
      };
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let baseStyle = {
        padding: "9px 0",
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
            color: "#EC4141",
            opacity: ".9",
          };
        } else if (rowIndex == 2) {
          return {
            ...bs,
            color: "#EC4141",
            opacity: ".7",
          };
        } else {
          return {
            ...bs,
            color: "#9C9C9C",
          };
        }
      } else if (columnIndex == 2) {
        return {
          ...baseStyle,
          borderRadius: "0 5px 5px 0",
          textAlign: "right",
          color: "#999",
        };
      } else {
        return baseStyle;
      }
    },
    async getTopList() {
      this.loading = true;
      const { list, artistToplist } = await this.$http("/toplist");
      this.list = list;
      this.artistToplist = artistToplist;
      this.officialBoards = list.slice(0, 4);
      this.globalBoards = list.slice(4);
      //通过id获取每个官方榜单的前五歌曲
      let promistList = this.officialBoards.map(async (board) => {
        return this.getOfficialTop5(board.id);
      });
      let top5List = await Promise.all(promistList);
      this.songsTop5List = top5List;
      this.loading = false;
    },
    async getOfficialTop5(id) {
      let { songs } = await this.$http(`/playlist/track/all?id=${id}&limit=5`);
      return songs;
    },
  },
  created() {
    this.getTopList();
  },
  mounted() {},
  watch: {},
};
</script>
<style scoped lang='scss'>
.leader-board {
  .board-top5 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    //封面
    .cover-box {
      width: 210px;
      height: 210px;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      margin-right: 40px;
      .board-cover {
        width: 100%;
        height: 100%;
      }
      .play-btn {
        opacity: 0;
      }
      &:hover {
        .play-btn {
          opacity: 1;
        }
      }
      .update-time {
        position: absolute;
        bottom: 60px;
        font-size: 12px;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
        padding: 0 5px;
      }
    }
    .top5-songs {
      flex: 1;
      height: 210px;
      .el-table {
        height: 100%;
      }
      .el-table::before {
        background-color: transparent !important;
      }
      .el-link {
        margin-top: 10px;
        ::v-deep .el-link--inner {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        &:hover {
          color: #666;
        }
      }
    }
  }
  .global-board {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
  }
}
</style>