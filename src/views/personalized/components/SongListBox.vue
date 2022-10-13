<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-11 13:51:25
 * @FilePath: \vue-wyy-music\src\views\personalized\components\SongListBox.vue
 * @Description: 
-->

<template>
  <div class="song-list-box">
    <div class="img-box"  :class="ishover ? 'active':''"
    @mouseenter="ishover=true"  @mouseleave="ishover=false" >
    <img :src="algInfo.picUrl"
     :alt="algInfo.name" /> 
      <span class="paly-number">
        <i class="iconfont icon-paly"></i>
        <span class="number">{{algInfo.playCount | playCountFilter}}</span>
      </span> 
      <span class="iconfont icon-playfill" ></span> 
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
  },
  data() {
    return {
      ishover: false,
    };
  },
  created() {},
  computed: {},
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
    .paly-number{
      position: absolute;
      top: 8px;
      right: 8px;
      color: #fff;
      font-weight: 500;
      display: flex;
      align-items: center;
      vertical-align:middle;
      .icon-paly{
        font-size: 14px;
      }
      .number{
        font-size: 10px;
      }
    }
    .icon-playfill{
      padding:6px;
      padding-left:7px;
      border-radius: 50%;
      background-color: #fff;
      text-align: right;
      vertical-align: middle;
      position: absolute;
      bottom: 12px;
      right: 12px;
      font-size: 18px;
      color: #EC4141;
      opacity: 0;
      transition: all 0.4s ease-in-out;
    }
    &.active .icon-playfill{
     opacity: 1;
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
