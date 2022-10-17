<template>
  <div class="result-songs"
      v-loading="loading" 
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..." 
  >
    <el-table :data="songs"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :header-cell-style="headerRowStyle"
      highlight-current-row 
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column    width="80px">
      <template slot-scope='{row}'>
        <p class="song-opts">
           <span class="iconfont icon-heart"></span>
           <span class="iconfont icon-xiazai"></span>
           </p>
      </template>
         </el-table-column>
      <el-table-column prop="name" label="音乐标题"> </el-table-column>
      <el-table-column  label="歌手">
        <template slot-scope="{ row }">
          {{ row.ar.map((item) => item.name).join("/") }}
        </template>
      </el-table-column>
      <el-table-column   label="专辑">
        <template slot-scope="{ row }">
          {{ alStr(row) }}
        </template>
      </el-table-column>
      <el-table-column prop="dt"   label="时长"  width="100px">
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
       <Pagination v-bind="pageOption" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import page from '@/mixins/page'
import search from '@/mixins/search'
export default {
  name: "Songs",
  props: {},
  mixins: [page,search],
  data() {
    return {
      loading: false,
      songs: [],
      headerRowStyle: {
        color: "#666",
        fontSize: "14px",
        fontWeight: "400",
        padding:'5px 0',
        borderColor: "transparent",
      },
    };
  },
  computed: {},
  watch: {},
  components: {},
  methods: {
    alStr(song) {
      return song?.al?.name || "";
    },
    dtStr(song) {
      return song?.dt || "";
    },
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 == 0) 
        return {  background: "#FAFAFA"  };
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let baseStyle = {
        padding: "2px 0",
        borderColor: "transparent",
      };
      if (columnIndex == 0 ) {
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
      }else if (columnIndex == 5) {
        return {
          ...baseStyle,
          borderRadius: "0 5px 5px 0",
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
 
  mounted() {
  },
  
};
</script>
<style scoped lang='scss'>
.result-songs {
  color: #333;
}
.el-slider {
  width: 100px;
}
.song-opts{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  .icon-heart{
    color: #999;
    cursor: pointer;
    &:hover{
      color: #EC4141;
    }
  }
  .icon-xiazai{
    color: #999;
    cursor: pointer;
    &:hover{
      color: #EC4141;
    }
  }

}
.el-slider ::v-deep .el-slider__runway.disabled {
  .el-slider__bar{
    border-radius:3px;
  }
  .el-slider__button-wrapper {
  display: none !important;
}
}
</style>