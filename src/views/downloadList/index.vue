<template>
<div
    class="result-songs"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
    style="padding:10px 0 0px;"
  >
    <el-table
      :data="downloadList"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      highlight-current-row
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column width="80px">
        <template slot-scope="{ row }">
          <p class="song-opts">
            <span class="iconfont icon-heart"></span>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" show-overflow-tooltip> 
        <template slot-scope='{row}'>
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
          <div class="album" style="color:#888;">
             {{ alStr(row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="dt" label="时长" width="100px">
        <template slot-scope="{ row }">
          {{ dtStr(row) | formatDuration }}
        </template>
      </el-table-column>
       <el-table-column label="进度" width="120px">
        <template slot-scope="{ row }">
          <el-slider v-model="dlProgress[row.id].progress" disabled></el-slider>
        </template>
      </el-table-column>
      <el-table-column prop="pop" label="下载时间" width="120px">
        <template slot-scope="{ row }">
           <span>{{row.dltime | formatTime}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'index',
  props: {
  },
  data () {
    return {

    }
  },
  computed: { 
    ...mapState('player',['downloadList','dlProgress'])
  },
  watch: { 

  },
  components: { 

  },
  methods: {
     rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 == 0) return { background: "#FAFAFA" };
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let baseStyle = {
        padding: "2px 0",
        borderColor: "transparent",
      };
      return baseStyle;
    },
  },
  created () { 

  },
  mounted () { 

  },
}
</script>
<style scoped lang='scss'>
</style>