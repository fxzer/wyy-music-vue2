<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 00:15:42
 * @FilePath: \vue-wyy-music\src\views\singerList\components\SingerCover.vue
 * @Description: 
-->
<template>
  <div class="singer-box">
    <div class="cover-box">
        <img :src="singer.img1v1Url" :alt="singer.name" class="singer-cover" />
    </div>
    <p class="singer-info">
      <span class="singer-name text-of-single">{{singer.name}}</span>
      <!-- <span class="singer-alias" :title="singer.alias[0]" 
       v-if="showAlias && singer.alias[0]">({{singer.alias[0]}})</span> -->
      <i class="iconfont icon-user" @click="toSingerInfo(singer.id)"></i>
    </p>
  </div>
</template>

<script>
export default {
  name: 'SingerCover',
  props: {
    singer:{
      type:Object,
      default:()=>{}
    },
    // showAlias:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data () {
    return {

    }
  },
  computed: { 

  },
  watch: { 

  },
  components: { 

  },
  methods: {
    toSingerInfo(id){
      this.$router.push({path:'/singerInfo',query:{id}})
    },
    toSingerArts(id){
      this.$router.push({path:'/singerArts',query:{id}})
    }
  },
  created () { 

  },
  mounted () { 

  },
}
</script>
<style scoped lang='scss'>
.singer-box{
  overflow: hidden;
  width: 100%;
  .cover-box{
    border-radius: 8px;
    width: 100%;
    overflow: hidden;
    position: relative;
    cursor:pointer;
    border:1px solid #ddd;
    img{
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
    }
    &::after{
      content: "";
      display: block;
      padding-bottom: 100%;
    }
  }
  .singer-info{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    margin-top:8px;
    .singer-name{
      white-space: nowrap;
      width: calc(100% - 20px);
      font-size: 14px;
      color: #666;
      cursor: pointer;
      &:hover{
        color: #333;
      }
    }
    .singer-alias{
      white-space: nowrap;
      font-size: 12px;
      color: #999;
      margin-left: 3px;
    }
    .icon-user{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      font-size: 14px;
      color: #fff;
      text-align: center;
      background-color: #EC4141;
      cursor: pointer;
      &:hover{
        opacity: .8;
      }
    }
  }
}
</style>