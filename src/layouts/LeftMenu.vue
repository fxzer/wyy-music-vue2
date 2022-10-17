<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-13 20:20:18
 * @FilePath: \vue-wyy-music\src\components\layout\LeftMenu.vue
 * @Description: 
-->
<template>
  <div id='LeftMenu'  class='LeftMenu'>
  <el-menu  :default-active="menuList[0].path" router  >
      <el-menu-item v-for="(item, index) in menuList"
        :index="item.path"
        :key="item.path">
          {{item.title}}
      </el-menu-item>
  </el-menu>
  
  </div>
</template>

<script>
export default {
  name: 'LeftMenu',
  props: {
  },
  data () {
    return {
      menuList:[
        {
          title:'发现音乐',
          path:'/discoverMusic',
        },
        {
          title:'视频',
          path:'/discoverVideo',
        },

      ]

    }
  },
  created () { 

  },
  computed: { 

  },
  components: { 

  },
  methods: {

  },
  mounted () { 

  },
  watch: { 

  }
}
</script>
<style scoped lang='scss'>
 .LeftMenu{
    position: fixed;
    left:0;
    top: 60px;
    left:0;
    z-index: 99;
    width: 200px;
    height: calc(100vh - 60px - 80px);
    padding:10px 0px 10px 10px;
    border-right:1px solid #e0e0e0;
    .el-menu{
      border:none;
      overflow: hidden;
      .el-menu-item{
        height: 36px;
        font-size: 16px;
        padding:0 6px;
        margin: 2px 2px;
        line-height: 36px;
        border-radius: 8px 0 0 8px;
        transition: all 0.3s;
        transform-origin: left top;
        &.is-active{
            color:#313131;
            font-weight: 600;
            background-color:#f6f6f7;
        }
        &:hover{
            color:#313131;
            background-color:#f6f6f7;
        }
      }
    }
 
 }
</style>