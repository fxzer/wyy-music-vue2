<template>
  <div class="sounds-result"
  v-loading="loading"
  element-loading-spinner="el-icon-loading"
  element-loading-text="载入中..."
  >
    <el-table
      :data="soundList"
      :show-header="false"
      highlight-current-row
      :row-style="rowStyle"
      :cell-style="cellStyle"
    >
      <el-table-column min-width="340px">
        <template slot-scope="{ row }">
          <div class="sound-box">
            <div class="sound-cover">
              <img :src="row.coverUrl" :alt="row.name" />
               <PlayBtn size="small" />
            </div>
            <div class="sound-name" v-html="row.name"></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" min-width="200px">
        <template slot-scope="{ row }">
          <div class="nickname text-of-single" style="display:flex;align-items:center;">
            <span style="color:#bbb;margin-right:3px;">by</span>{{row.dj.nickname}}</div>
        </template>
      </el-table-column>
      <el-table-column   width="150">
        <template slot-scope="{ row }">
         <p class="listen-count">
          <span class="iconfont icon-paly"></span>
          <span>  {{ row.listenerCount | playCountFilter }}</span>
         </p>
        </template>
      </el-table-column>
      <el-table-column prop="duration" fixed="right" width="150">
        <template slot-scope="{ row }">
          {{ row.mainSong.duration | formatDuration }}
        </template>
      </el-table-column>
    </el-table>
    <Pagination v-bind="pageOption" @current-change="handleCurrentChange" />

  </div>
</template>

<script>
import page from "@/mixins/page";
import search from "@/mixins/search";
// import soundsData from "@/mock/kw-sounds";
// let sounds = soundsData.data.resources.map((item) => item.baseInfo);
export default {
  name: "Sounds",
  props: {},
  mixins: [page, search],
  data() {
    return {
      // filterList: sounds,
    };
  },
  computed: {
    soundList(){
      let reg = new RegExp(this.kw,'gi')
      return this.filterList.map((item) => {
          item.baseInfo.name =  item.baseInfo.name.replace(reg,`<span class="kw-highlight">${this.kw}</span>`)
          return item.baseInfo
      })
    }
  },
  watch: {},
  components: {},
  methods: {
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
         return {
          ...baseStyle,
          borderRadius: "5px 0 0 5px",
        }
      } else if (columnIndex == 3) {
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
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.sounds-result {
  padding-bottom: 100px;
  .sound-box{
    display: flex;
    align-items: center;
    .sound-cover{
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 6px;
      position: relative;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
      }
    }
     .sound-name{
        margin-left: 10px;
        font-size: 14px;
        color: #333;
    }
  }
  .listen-count{
    color:#bbb;
  }
}
</style>