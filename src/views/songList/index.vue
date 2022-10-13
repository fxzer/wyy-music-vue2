<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-13 23:46:06
 * @FilePath: \vue-wyy-music\src\views\songList\index.vue
 * @Description: 
-->
<template>
  <div  class='song-list'>
      <Banner :banner="banner"/>
      <div class="cates-select-box">
        <div class="left-button">
           <span>全部歌单</span><i class="iconfont icon-icon_left_arrow"></i>
        </div>
        <div class="right-cates">
          <span class="cate-item" v-for="(cate,index) in level1Cates" :key="index" 
          :class="{'active':cate.name===activeName}" @click="handleCateClick(cate)">{{cate.name}}</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SongList',
  props: {
  },
  data () {
    return {
      all:{},//全部歌单
      categories:{},//分类
      subList:[],//歌单细类
      activeName:'',//当前选中的分类
      banner:{
          picUrl:'', 
          title:'美国乡村乐图鉴与简史',
          desc:'美国乡村乐图鉴与简史'
      }
    }
  },
  created () { 
    this.getCateList()
  },
  computed: { 
    level1Cates(){
      let hotCates = this.subList.filter(cate=> cate.hot).sort((a,b)=>b.resourceCount - b.resourceCount)
      return hotCates.slice(0,10) || []
    }
  },
  components: { 
    Banner:()=>import('./components/Banner.vue'),
  },
  methods: {
    async getCateList(){
      const {all,categories,sub} = await this.$http('/playlist/catlist')
      this.all = all
      this.categories = categories
      this.subList = sub
    },
    handleCateClick({name}){
      this.activeName =  name
    }
  },
  mounted () { 

  },
  watch: { 

  }
}
</script>
<style scoped lang='scss'>
  .song-list{
    .cates-select-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin:15px 0;
      .left-button{
        font-size: 16px;
        height: 32px;
        color:#666;
        display: flex;
        align-items:center;
        border:1px solid #d3d3d3;
        border-radius: 16px;
        padding: 2px 15px 3px;
      }
      .right-cates{
        display: flex;
        .cate-item{
          padding: 0 10px;
          font-size: 14px;
          color: #666;
          display: inline-block;
          height: 24px;
          line-height: 24px;
          &.active{
            color: #EC4141;
            background-color: #FEF5F5;
            border-radius: 12px;
            font-weight: 600;
          }
        }
      }
    }
  }
</style>