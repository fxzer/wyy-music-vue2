<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-11 11:22:42
 * @FilePath: \vue-wyy-music\src\views\personalized\components\MvRecommend.vue
 * @Description: 
-->
<template>
  <div class="mv-box">
    <div class="img-box">
      <div class="banner-info" v-if="bannerShow">{{mvInfo.copywriter}}</div>
      <img :src="mvInfo.picUrl" :alt="mvInfo.name" /> 
      <span class="paly-number"  v-if="bannerShow">
        <i class="iconfont icon-paly"></i>
        <span class="number">{{mvInfo.playCount | playCountFilter}}</span>
      </span> 
      <span class="iconfont icon-playfill" v-if="palyBtnShow"></span> 
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
    palyBtnShow: {
      type: Boolean,
      default: false,
    },
    bannerShow:{
      type:Boolean,
      default:true
    },
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
      padding-bottom: 56%;
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
    .icon-playfill{
      padding:4px;
      padding-left:5px;
      border-radius: 50%;
      text-align: right;
      vertical-align: middle;
      position: absolute;
      top: 12px;
      left: 12px;
      font-size: 16px;
      color: #fff;
      border:1px solid #fff;
      transition: all 0.4s ease-in-out;
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
    .mv-name{
      width: 100%;
    }
    .artist-name{
      font-size: 14px;
      color:#747c86;
    }
  }
}

</style>