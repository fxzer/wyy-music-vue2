<template>
  <div  class="mv-item-box">
    <div class="cover-box">
      <img :src="mv.cover" :alt="mv.name" class="cover-img">
      <span class="play-number">
        <i class="iconfont icon-play"></i>
        <span class="number" v-if="mv.playTime">
          {{mv.playCount | playCountFilter}}</span>
      </span>
      <span class="mv-dt">{{mv.duration | formatDuration}}</span>
    </div>
    <div class="mv-desc">
      <p class="mv-title text-of-single">
        <Mtag content="MV" /> <span v-html="mv.name"></span></p> 
     <p class="mv-artist text-of-single"> {{mv.artistName}}</p> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvItemBox',
  props: {
    mv:{
      default:()=>{},
      type:Object
    }
  },
}
</script>
<style scoped lang='scss'>
.mv-item-box{
  .cover-box{
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    overflow: hidden;
    border-radius: 5px;
    .cover-img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
    .play-number{
      position: absolute;
      top: 8px;
      right: 8px;
      color: #fff;
      font-weight: 500;
      display: flex;
      align-items: center;
      vertical-align:middle;
      .icon-play{
        font-size: 14px;
      }
      .number{
        font-size: 10px;
      }
    }
    .mv-dt{
      position: absolute;
      bottom: 8px;
      right: 8px;
      color:#fff;
      font-size: 12px;
    }
  .mv-desc{
    margin-top: 8px;
    width:calc(100% - 16px);
    .mv-title{
      font-size: 14px;
      display: flex;
      align-items: center;
      color: #555;
      &:hover{
        color: #222;
      }
    }
    .mv-artist{
     margin-top: 2px;
      font-size: 12px;
      color: #999;
      &:hover{
        color: #777;
      }
    }
  }
}
</style>