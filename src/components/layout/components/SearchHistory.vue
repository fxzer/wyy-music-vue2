<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-17 00:19:36
 * @FilePath: \vue-wyy-music\src\components\layout\components\SearchHistory.vue
 * @Description: 
-->
<template>
  <div class="history-wrap" >
    <div class="history-title">
      <span style="user-select:none">搜索历史</span> 
      <span class="el-icon-delete" @click="$emit('deleteAll')"></span>
    </div>
    <div class="history-list">
      <div class="history-item" v-for="(item,index) in reverseList" :key="index">
        <span class="history-name" @click="$emit('select',{searchWord:item})">{{item}}</span>
        <span class="el-icon-close" @click="$emit('deleteOne',index)"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      
    }
  },
  computed: { 
    //翻转历史
    reverseList () {
      return this.list?.slice().reverse()
    }
  },
  watch: { 

  },
  components: { 

  },
  methods: {

  },
  created () { 

  },
  mounted () { 

  },
}
</script>
<style scoped lang='scss'>
.history-wrap{
  color:#666;
  padding:10px 24px;
  .history-title{
    font-size: 16px;
    display: flex;
    align-items: center;
    color:#888;
    margin-bottom: 10px;
    .el-icon-delete{
      margin-left: 4px;
      cursor: pointer;
      &:hover{
        color:#EC4141;
      }
    }
  }
  //历史列表
  .history-list{
    display: flex;
    flex-wrap: wrap;
    .history-item{
      display: flex;
      align-items: center;
      vertical-align: middle;
      margin-bottom: 10px;
      height: 26px;
      line-height: 24px;
      padding-left:12px;
      padding-right: 16px;
      text-align: center;
      border-radius: 16px;
      border:1px solid #ddd;
      margin-right:10px;
      position: relative;
      &:hover{
           background-color: #f2f2f2;
           .el-icon-close{
             opacity: 1;
        }
      }
      .history-name{
        font-size: 13px;
        color:#666;
        cursor: pointer;
        
      }
      .el-icon-close{
        position: absolute;
        right: 2px;
        top:4px;
        opacity: 0;
        cursor: pointer;
        font-size: 14px;
        &:hover{
          color:#EC4141;
        }
      }
    }
  }
}
</style>