<template>
    <el-drawer
    append-to-body
    close-on-press-escape
    wrapperClosable
    :visible.sync="visible"
    :before-close="handleClose"
    :modal="false"
    size="540px"
    class="playlist-drawer" 
    :with-header="false">
    <h2 class="title">当前播放</h2>
    <div class="play-list-des">
       <span class="list-count">总{{playList.length}}首</span>
       <el-button type="text" :disabled="!playList.length"  @click="clearPlayList">清空列表</el-button>
    </div>
    <el-table
      :data="playList"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :show-header="false"
      height="calc(100% - 80px)"
      empty-text="您还没添加任何歌曲!"
      highlight-current-row
      @row-dblclick="playSong"
    >
      <el-table-column prop="name" label="音乐标题" show-overflow-tooltip> 
        <template slot-scope='{row}'>
         <div class="name-box">
           <span class="play-state iconfont" :class="handleIcon(row)"></span>
           <span style="font-size:12px;margin-right:3px;">{{row.name}}</span>
           <Mtag content="Hi-Res" v-if="isHr(row)"/>
           <Mtag content="SQ" v-if="isSq(row)"/>
         </div>
        </template>
      </el-table-column>
      <el-table-column label="歌手" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <p style="color:#666;font-size:12px;">{{ arStr(row) }}</p>
        </template>
      </el-table-column>
      <el-table-column  width="40px">
        <template slot-scope="{ row }">
          <span class="el-icon-link"></span>
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="时长" width="94px">
        <template slot-scope="{ row }">
         <p style="color:#ccc;font-size:12px;"> {{ ( row.duration || row.dt ) | formatDuration }}</p>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>

<script>
import {  mapState,mapMutations } from "vuex";
import playSong from '@/mixins/playSong'
export default {
  name: "PlayList",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  mixins:[playSong],
  data() {
    return {};
  },
  computed: {
    ...mapState('player', ['id','playList','playing']),
  },
  watch: {},
  methods: {
    ...mapMutations('player', ['clearPlayList']),
    handleIcon(row){
      //正在播放此歌曲
      if(row.id == this.id) {
        return this.playing ? 'icon-laba' : 'icon-zero-volume'
      }else {
        return ''
      }
    },
    arStr(row){
      if(row?.artists){
        return row.artists.map(item=>item.name).join('/')
      }else if(row.ar){
        return row.ar.map(item=>item.name).join('/')
      }else{
        return ''
      }
    },
     isHr(song){//Hi-Res音乐
      if(song?.hMusic){
        return song?.hMusic?.bitrate > 320000
      }else if (song.hr){
        return song.hr.br > 320000
      }else{
        return false
      }
    },
    isSq(song){//SQ音乐
      return song?.lMusic?.bitrate > 320000
    },
    isSq(song){//SQ音乐
      if(song?.hMusic){
        return song?.lMusic?.bitrate > 320000
      }else if (song.sq){
        return song.sq.br > 320000
      }else{
        return false
      }
    },
    handleClose(){
      this.$emit('update:visible', false)
    },
     rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 == 0) return { background: "#FAFAFA" };
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return  {
        padding: "2px 0",
        borderColor: "transparent",
      };
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.el-drawer{
  .title{
    padding: 20px 20px 10px;
    font-size: 20px;
    font-weight: 800;
    
  }
  .name-box{
    display: flex;
    align-items:center;
  }
  .play-list-des{
    padding:  0px 40px 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list-count{
      color: #ccc;
      font-size: 13px;
    }
    .el-button{
      padding: 0;
      font-size: 12px;
    }
  }
  .play-state{
    display: inline-block;
    min-width: 16px;
    height: 20px;
    border-radius: 50%;
    margin: 0 2px;
    text-align: center;
    color:#EC4141;
    font-size: 12px;
    transform: translateY(-3px);
  }
  .el-table ::v-deep .cell.el-tooltip{
    padding: 0;
  }
}
</style>