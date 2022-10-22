<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 16:54:57
 * @FilePath: \vue-wyy-music\src\views\latestMusic\components\NewSongList.vue
 * @Description: 
-->
<template>
  <div class="new-song-list">
    <!-- 筛选面板 -->
    <div class="filter-wrap">
      <!-- 国家选择 -->
      <div class="area-type-wrap">
        <div
          class="area-type-item"
          v-for="(type, areaName) in areaTypes"
          :key="areaName"
          :class="{ active: type == activeArea }"
          @click="changeArea(type)"
        >
          {{ areaName }}
        </div>
      </div>
    </div>
    <!-- 新歌速递 -->
    <el-table
      :data="newSongList"
      :show-header="false"
      highlight-current-row
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="载入中..."
      :row-style="rowStyle"
      :cell-style="cellStyle"
      @row-dblclick="playSong"
    >
      <el-table-column >
        <template slot-scope='{row,$index:index}'>
          <p class="index-box">
            <span v-if="row.id == id" class="iconfont" :class="playing ? 'icon-laba':'icon-zero-volume'"></span>
            <span v-else > {{index  < 10 ? '0'+parseInt(1+index) :parseInt(1+index)}} </span>
          </p>
        </template>
      </el-table-column>
      <el-table-column min-width="340px">
        <template slot-scope="{ row }">
          <SongCover :song="row"  @click.native="playSong(row)"/>
        </template>
      </el-table-column>
      <el-table-column min-width="200px">
        <template slot-scope="{ row }">
          <p class="singers-name text-of-single">
            {{ row.artists.map((item) => item.name).join("/") }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="name" min-width="200px">
        <template slot-scope="{ row }">
          <div class="song-name text-of-single" :title="row.name">
            {{ row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="duration" fixed="right" width="100">
        <template slot-scope="{ row }">
          {{ row.duration | formatDuration }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
export default {
  name: "NewSongList",
  props: {},
  data() {
    return {
      loading: false,
      activeArea: 0,
      areaTypes: {
        全部: 0,
        华语: 7,
        欧美: 96,
        日本: 8,
        韩国: 16,
      },
      newSongList: [],
    };
  },
  computed: {
    ...mapState('player', ['id','playing']),
  },
  watch: {},
  components: {
    SongCover: () => import("./SongCover.vue"),
  },
  methods: {
    ...mapActions('player', ['getSongUrl']),
    playSong(row){
      console.log('row: ', row);
      this.getSongUrl(row.id)
    },
    changeArea(type) {
      let { query } = this.$route;
      this.$router.push({ query: Object.assign({}, query, { type }) });
      this.activeArea = type;
      this.getNewSongs()
    },
    async getNewSongs() {
      this.loading = true;
      let { activeArea } = this
      let { data } = await this.$http("/top/song?type=" + activeArea);
      this.newSongList = data.slice(0, 10);
      this.loading = false;
    },
    // 行样式
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return {
          overflow: "hidden",
          background: "#FAFAFA",
        };
      }
      return {
        borderRadius: "5px",
        overflow: "hidden",
      };
    },
    // 单元格样式
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
      } else if (columnIndex == 4) {
        return {
          ...baseStyle,
          borderRadius: "0 5px 5px 0",
          textAlign: "center",
          color: "#999",
        };
      } else {
        return baseStyle;
      }
    },
  },
  created() {
    let { type = 0 } = this.$route.query;
    this.activeArea = type;
    this.getNewSongs()

  },
  mounted() {},
};
</script>
<style scoped lang='scss'>
.new-song-list {
  .filter-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //国家地区
    .area-type-wrap {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .area-type-item {
        color: #666;
        font-size: 14px;
        cursor: pointer;
        margin-left: 30px;
        &:hover {
          color: #444;
        }
        &.active {
          color: #333;
          font-weight: 700;
        }
      }
    }
  }
  .el-table .song-name {
    color: #888;
  }
  .index-box .iconfont{
    color: #EC4141;
    font-size: 18px;
  }
}
</style>