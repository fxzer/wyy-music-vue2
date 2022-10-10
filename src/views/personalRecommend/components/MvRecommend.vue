<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-10 23:59:00
 * @FilePath: \vue-wyy-music\src\views\personalRecommend\components\MvRecommend.vue
 * @Description: 
-->
<template>
  <div class="mv-box">
    <div class="img-box"  >
      <div class="banner-info">{{mvInfo.copywriter}}</div>
      <img :src="mvInfo.picUrl"
       :alt="mvInfo.name" /> 
        <span class="paly-number">
          <i class="iconfont icon-paly"></i>
          <span class="number">{{mvInfo.playCount | playCountFilter}}</span>
        </span> 
        <span class="iconfont icon-playfill" ></span> 
      </div>
      <div class="mv-des">
        <p class="mv-name text-of-multi">{{mvInfo.name}}</p>
        <p class="artist-name text-of-multi">{{mvInfo.artistName}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'MvRecommend',
  props: {
    mvInfo:{
      type:Object,
      default:()=>{}
    }
  },
  data () {
    return {

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
.mv-box{
  width: 100%;
  .img-box{
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    cursor:pointer;
    &::after{
      content: "";
      display: block;
      padding-bottom: 60%;
    }
    &:hover{
      .banner-info{
         top:0;
      }
      .paly-number{
        opacity: 0;
      }
    }
    img{
      position: absolute;
      width: 100%;
      height:100%;
    }
    .banner-info{
      background-color: rgba(0,0,0,0.3);
      position: absolute;
      top:-40px;
      left:0;
      width: 100%;
      height:40px;
      line-height: 40px;
      padding:0 10px;
      z-index: 2;
      color:#fff;
      transition: all 0.3s;
    }
    .paly-number{
      position: absolute;
      opacity:1;
      top: 8px;
      right: 8px;
      color: #fff;
      display: flex;
      align-items: center;
      vertical-align:middle;
      transition: all 0.3s;
      .icon-paly{
        font-size: 14px;
      }
      .number{
        font-size: 10px;
      }
    }
  }
  .mv-des{
    width: 100%;
    margin-top: 4px;
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    text-align: left;
    cursor: pointer;
    .artist-name{
      font-size: 14px;
      color:#747c86;
    }
  }
}
</style>