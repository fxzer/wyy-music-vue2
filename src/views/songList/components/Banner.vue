<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-13 23:08:14
 * @FilePath: \vue-wyy-music\src\views\songList\components\Banner.vue
 * @Description: 
-->
<template>
<!--   -->
  <div class="top-banner"  >
    <div class="bg-filter">  </div>
    <div class="banner-content">
      <img :src="picSrc" class="left-img" >
      <div class="right-info">
        <div class="opt-box"> 
           <span class="high-btn"><i class="el-icon-star-off"></i> <span>精品歌单</span></span>
        </div>
        <div class="info-desc">
          <p class="title">{{banner.title}} </p>
          <p class="desc">{{banner.desc}} </p>
        </div>
      </div>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'Banner',
  props: {
    banner: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      defaultImg:require('../../../assets/images/highquality.jpg')
    }
  },
  computed: { 
    picSrc(){
      return this.banner.picUrl || this.defaultImg
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
.top-banner{
  height: 200px;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  .bg-filter{
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    border-radius: 6px;
    background-image: url(../../../assets/images/highquality.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    filter:blur(20px);
  }
  .banner-content{
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    z-index: 2;
    display: flex;
    align-items:center;
    padding:15px;
    .left-img{
    width: 170px;
    height: 100%;
    border-radius: 6px;
    margin-right:12px;
  }
  .right-info{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    //操作按钮
    .opt-box{
      flex:1;
      display: flex;
      align-items: center;
      .high-btn{
        display: inline-block;
        box-sizing: border-box;
        height: 36px;
        padding: 0px 10px;
        border-radius: 18px;
        color: #E7AA5A;
        border:1px solid #E7AA5A;
        font-size: 14px;
        cursor: pointer;
        line-height: 32px;
        i{
          font-size: 14px;
          margin-right: 2px;
          color: #E7AA5A;
        }
      }
    }
    //描述
    .info-desc{
      flex:1;
      .title{
        font-size: 18px;
        color: #fff;
        margin-bottom: 6px;
      }
      .desc{
        font-size: 12px;
        color: #fff;
        opacity: 0.8;
      }
    }
  }
  }
}
</style>