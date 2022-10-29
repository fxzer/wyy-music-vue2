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
      :cell-style="{
        padding: '2px 0',
        fontSize: '12px',
        borderColor: 'transparent',
      }"
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
          <el-slider :value="progress(row.id)" disabled></el-slider>
        </template>
      </el-table-column>
       <el-table-column label="大小" width="120px">
        <template slot-scope="{ row }">
          <span> {{total(row.id)}}</span>
        </template>
      </el-table-column>
      <el-table-column   label="下载时间" width="120px">
        <template slot-scope='{row}'>
          {{row.dlTime | formatTime('yyyy-MM-dd')}} 
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import songTable from '@/mixins/songTable'
export default {
  name: 'index',
  props: {
  },
  mixins: [songTable],
  data () {
    return {
      loading: false,
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
    progress(id){
      if(Object.keys(this.dlProgress).length){
        return this.dlProgress[id] && this.dlProgress[id].progress
      }else {
        return 0
      }
    },
    total(id){
      if(Object.keys(this.dlProgress).length){
        //格式化文件大小转为M
        if(this.dlProgress[id] && this.dlProgress[id].total){
          return (this.dlProgress[id].total / 1024 / 1024).toFixed(2) + 'M'
        }else {
          return '0M'
        }
      }else {
        return '0M'
      }
    }
  },
  created () { 

  },
  mounted () { 
    console.log(' this.downloadList: ',  this.downloadList);
  },
}
</script>
<style scoped lang='scss'>
  @import'@/views/searchResult/style/song.scss';
    .el-slider ::v-deep .el-slider__runway.disabled {
    .el-slider__bar {
      background-color: #44b985 !important;
    }
  }
</style>