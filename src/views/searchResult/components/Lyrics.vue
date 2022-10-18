<template>
  <div
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
     style="padding-bottom: 100px;"
  >
  <div class="lyrics-result">
      <el-table :data="songList"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :header-cell-style="headerRowStyle"
      highlight-current-row 
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column width="80px">
      <template slot-scope='{row}'>
        <p class="song-opts">
           <span class="iconfont icon-heart"></span>
           <span class="iconfont icon-xiazai"></span>
           </p>
      </template>
         </el-table-column>
      <el-table-column prop="name" label="音乐标题" min-width="240"> 
        <template slot-scope='{row}'>
          <div class="name-wrap">
            <span class="song-name">{{row.name}}</span>
             <Mtag content="Hi-Res" v-if="isHr(row)"/>
             <Mtag content="SQ" v-if="isSq(row)"/>
             <Mtag content="MV" v-if="row.mv" />
             <Mtag content="原唱" v-if="!row.originSongSimpleData" />
            </div> 
        </template>
      </el-table-column>

      <el-table-column prop="name" label="歌手" show-overflow-tooltip   > 
        <template slot-scope='{row}'>
          {{ arStr(row) }} 
        </template>
      </el-table-column>
      <el-table-column    width="36px"> 
        <template slot-scope='{row}'>
            <span class="iconfont icon-copy" @click="copyLyrics(row)"></span>
        </template>
      </el-table-column>
      <!-- 展开歌词 -->
      <el-table-column type="expand" width="36px" >
        <template slot-scope="{row}">
            <div class="lyrics-wrap">
              <div class="ly-col" v-for="(lyItem,index) in row.lyGroup" 
              :key="index" v-html="handleLyrics(lyItem)"></div>
            </div>
        </template>
      </el-table-column>
      <el-table-column  label="匹配歌词" min-width="220px">
        <template slot-scope="{ row }">
            <div class="lyrics" v-html="row.lyrics[0]"></div>
        </template>
      </el-table-column>
      <el-table-column   label="专辑" min-width="220px">
        <template slot-scope="{ row }">
          {{ alStr(row) }}
        </template>
      </el-table-column>
      <el-table-column prop="dt"   label="时长"  width="100px">
        <template slot-scope="{ row }">
          {{ dtStr(row) | formatDuration }}
        </template>
      </el-table-column>
      <el-table-column prop="pop" label="热度" fixed="right" width="120px">
        <template slot-scope="{ row }">
          <el-slider v-model="row.pop" disabled></el-slider>
        </template>
      </el-table-column>  
    </el-table>
    <Pagination v-bind="pageOption" @current-change="handleCurrentChange" />
  </div>
  </div>
</template>

<script>
// import kwLyrics from "@/mock/kw-lyrics";
// let songs = kwLyrics.result.songs;
import { mapMutations } from "vuex"
//  songs = songs.map(song => {
//    song.height = '90px';
//    if(song.lyrics){
//       //把歌词数组分为10个一组
//       song.lyGroup = song.lyrics.reduce((pre,cur,index) => {
//         if(index % 10 == 0){
//           pre.push([cur])
//         }else{
//           pre[pre.length-1].push(cur)
//         }
//         return pre
//       },[])
          
//    }
//    return song
// })
   
// let total = kwLyrics.result.songCount;
import page from "@/mixins/page";
import songTable from "@/mixins/songTable";
import search from "@/mixins/search";
export default {
  name: "Lyrics",
  props: {},
  mixins: [songTable,page, search],
  data() {
    return {
      // filterList:songs,
    };
  },
  computed: {
    songList(){
     let reg = new RegExp(this.kw,'gi')
     return this.filterList.map(song => {
        song.height = '90px';
        if(song.lyrics){
            //把歌词数组分为10个一组
            song.lyGroup = song.lyrics.reduce((pre,cur,index) => {
              cur = cur.replace(reg,`<span class="ly-highlignt">${this.kw}</span>`)
              if(index % 10 == 0){
                pre.push([cur])
              }else{
                pre[pre.length-1].push(cur)
              }
              return pre
            },[])
                
        }
        return song
      })
    }
  },
  watch: {},
  components: {},
  methods: {
    ...mapMutations(['copyText']),
      isHr(song){//Hi-Res音乐
      return song?.hr?.br > 320000
    },
    isSq(song){//SQ音乐
      return song?.sq?.br > 320000
    },
    extendLy(row) {
      if(row.height ==='auto') {
         row.height = '90px'
        }else{
          row.height = 'auto'
        }
    },
    handleLyrics(lyrics){
      return lyrics?.join('<br>') || ''
    },
    copyLyrics(row){
      //去除<b>标签
      let lyrics1 = row.lyrics[0].replace(/<b>/g,'').replace(/<\/b>/g,'')+ '\n'
      let text = lyrics1 + row.lyrics.slice(1).join('\n')
      //复制到剪切板
      this.copyText(text)
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
      }else if (columnIndex == 2) {
        return {
          ...baseStyle,
          color: "#444",
        };
      }  else if (columnIndex == 8) {
        return {
          ...baseStyle,
          fontSize: "13px",
          color: "#999",
        };
      } else if (columnIndex == 9) {
        return {
          ...baseStyle,
          borderRadius: "0 5px 5px 0",
        };
      } else {
        return baseStyle;
      }
    },
  },
  created() {
  },
  mounted() {},
};
</script>
<style scoped lang='scss'>
  @import '../style/song.scss';
.lyrics-result{
  .el-table{
    .name-wrap{
      display: flex;
      align-items: center;
      .song-name{
        margin-right: 4px;
      }
    }
    //操作按钮
     .icon-copy{
      color: #aaa;
      cursor: pointer;
      &:hover{
        color: #333;
      }
     }
    //歌词
    .lyrics-wrap{
      background-color: #fff;
      padding:10px ;
      padding-left: 140px;
      display: flex;
      color:#999;
      line-height: 1.4;
      font-weight: 500;
      .ly-col{
        flex:1;
      }
    }
  }
}

</style>