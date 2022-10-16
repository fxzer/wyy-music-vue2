<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 12:47:06
 * @FilePath: \vue-wyy-music\src\views\latestMusic\index.vue
 * @Description: 
-->
<template>
  <div    class='latest-music'>
     <div class="type-radio-wrap">
        <div class="type-radio-body">
          <div class="radio-button" v-for="(value,typeName) in newTypes" :key="value"
            :class="{'active':value===activeType}"
            @click="changeType(value)"
          >{{typeName}}</div>
        </div>
      <!-- 国家选择 -->
        <div class="area-type-wrap">
              <div class="area-type-item" v-for="(value,areaName) in areaTypes" :key="areaName"
                :class="{'active':value===activeArea}"
                @click="changeArea(value)"
              >{{ areaName }}</div>
        </div>
        <!-- 新歌列表 -->
        <div class="top5-songs">
         <el-table :data="newSongList" :show-header="false"   
          :row-style="rowStyle" :cell-style="cellStyle" >
            <el-table-column type="index"></el-table-column>
            <el-table-column>  
              <template slot-scope='{row}'>
                {{row.artists.map(item => item.name).join('/')}}  
              </template>  
             </el-table-column>
            <el-table-column prop="name" > </el-table-column>
            <el-table-column prop="duration" > 
              <template slot-scope='{row}'>
                {{row.duration | formatDuration}} 
              </template>
            </el-table-column>

           </el-table>
        </div>
     </div>
  </div>
</template>

<script>
import newSongs from '@/mock/newsongs'
let newSongList = newSongs.data.slice(0,10)
export default {
  name: 'LatestMusic',
  props: {
  },
  data () {
    return {
      activeType:0,
      activeArea:0,
      newTypes:{
        '新歌速递':0,
        '新碟上架':1
      },
      areaTypes:{
        '全部':0,
        '华语':7,
        '欧美':96,
        '日本':8,
        '韩国':16,
      },
      newSongList,

    }
  },
  created () { 

  },
  computed: { 

  },
  components: { 
  },
  methods: {
    changeType(value){
      let { query } = this.$route
      this.$router.push({query:Object.assign({},query,{new:value})})
      this.activeType=value
    },
    changeArea(value){
      let { query } = this.$route
      this.$router.push({query:Object.assign({},query,{type:value})})
      this.activeArea=value
    },
      rowStyle({row, rowIndex}) {
      if (rowIndex % 2 == 0) {
        return  {
         borderRadius:'5px',
         overflow:'hidden',
         background:'#FAFAFA'
      };
      }
      return {
         borderRadius:'5px',
         overflow:'hidden',
      };
    },
    cellStyle({row, column, rowIndex, columnIndex}) {
      let baseStyle = {
        padding:'9px 0',
        borderColor:'transparent',
      }
      if(columnIndex == 0 ){//第一列排行字体颜色
        let bs = {
            ...baseStyle,
            borderRadius:'5px 0 0 5px',
            textAlign:'center',
        }
          if(rowIndex == 0){
            return {
              ...bs,
              color:'#EC4141',
            }
          }else if(rowIndex == 1){
              return {
                ...bs,
                color:'#EC4141',
                opacity:'.9'
              }
          }else if(rowIndex == 2){
              return {
                ...bs,
                color:'#EC4141',
                opacity:'.7'
              }
          }else{
            return {
              ...bs,
              color:'#9C9C9C',
            }
          }
      }else if(columnIndex == 2){
        return {
          ...baseStyle,
          borderRadius:'0 5px 5px 0',
          textAlign:'right',
          color:'#999',
        }
      }else{
         return baseStyle
      }
    },
  },
  mounted () { 

  },
  watch: { 

  }
}
</script>
<style scoped lang='scss'>
 .latest-music{
  // 新歌速递/新碟上架
  .type-radio-wrap{
    width:100%;
    height:32px;
    text-align:center;
    .type-radio-body{
      width: 270px;
      display:flex;
      overflow:hidden;
      align-items:center;
      border-radius: 16px;
      border:1px solid #DDD;
      margin:20px auto;
      .radio-button{
        flex:1;
        height:30px;
        text-align:center;
        line-height:30px;
        color:#EC4141;
        font-size:14px;
        cursor:pointer;
        border-radius:16px;
        border:none;
        vertical-align:middle;  
        &:hover{
          background-color:#FEEEEE;
        }
        &.active{
          background-color:#EC4141;
          opacity: .8;
          color:#fff;
        }
      }
    }
  }
  //国家地区
  .area-type-wrap{
    display: flex;
    align-items:center;
    margin-bottom:20px;
    .area-type-item{
      color:#666;
      font-size:14px;
      cursor:pointer;
      margin-left:30px;
      &:hover{
        color:#444;
      }
      &.active{
        color:#333;
        font-weight: 700;
      }
    }
  }
 }
</style>