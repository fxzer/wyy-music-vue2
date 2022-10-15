<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-15 09:51:48
 * @FilePath: \vue-wyy-music\src\views\personalized\components\SongListBox.vue
 * @Description: 上下结构的歌单盒子
-->

<template>
  <div class="song-list-box">
    <div class="img-box"  :class="ishover ? 'active':''"
    @mouseenter="ishover=true"  @mouseleave="ishover=false" >
    <img :src="algInfo.picUrl" :alt="algInfo.name" /> 
      <span class="play-number">
        <i class="iconfont icon-play"></i>
        <span class="number">{{algInfo.playCount | playCountFilter}}</span>
      </span> 
      <PlayBtn  position="br" />
      <!-- 歌单创建者 -->
      <p class="creator" v-if="cname">
         <i class="iconfont icon-user"></i>
         <span class="name text-of-single">{{cname}}</span>
         <i class="iconfont icon-dengji1"></i>
      </p>
    </div>
    <p class="album-des text-of-multi">{{algInfo.name}}</p>
  </div>
</template>
<script>
export default {
  name: "SongListBox",
  props: {
    algInfo: {
      type: Object,
      default: () => {},
    },
    showCreator: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ishover: false,
    };
  },
  created() {},
  computed: {
    cname(){
      return this.algInfo?.creator?.nickname || ''
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
};
</script>
<style scoped lang="scss">
.song-list-box {
  width: 100%;
  .img-box{
    //宽高相等
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    cursor:pointer;
    &::after{
      content: "";
      display: block;
      padding-bottom: 100%;
    }
    img{
      position: absolute;
      width: 100%;
      height:100%;
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
    //播放按钮
     .play-btn{
      opacity: 0;
    }
    &.active .play-btn {
     opacity: 1;
    }
    //歌单创建者
    .creator{
      position: absolute;
      bottom: 0px;
      left: 0px;
      max-width: 80%;
      overflow:hidden;
      height: 30px;
      color: #fff;
      font-size: 12px;
      display: flex;
      align-items: center;
      padding: 10px ;
      .icon-user{
        font-size:14px;
      }
      .name{
         opacity: .9;
         margin:0 4px;
         &:hover{
            opacity: 1;
         }
      }
      .icon-dengji1{
        font-size: 10px;
        background-color: #EC4141;
        opacity: 1;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        display: inline-block;
        text-align: center;
        vertical-align:middle;
        padding-top:1px;
        padding-right:.5px;
      }
    }
  }
  .album-des{
    margin-top: 4px;
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    text-align: left;
    cursor: pointer;
  }
}
</style>
