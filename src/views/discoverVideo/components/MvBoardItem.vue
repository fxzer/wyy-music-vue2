<template>
  <div class="mv-board-item" @click="toMvDetail(mv.id)">
     <div class="left-index">{{ index+1 }} <i class="iconfont" :class="indexIcon"></i></div>
     <div class="cover-box">
       <img :src="mv.cover"  >
       <span class="iconfont icon-Fire"></span>
       <span class="play-count">{{mv.playCount |  playCountFilter}}</span>
     </div>
     <div class="mv-info">
      <div class="mv-name text-of-mutil">{{mv.name}}</div>
      <div class="mv-artist text-of-mutil">{{mv.artistName}}</div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'MvBoardItem',
  props: {
     index: Number,
     mv:Object
  },
  data () {
    return {
    }
  },
  computed: { 
    indexIcon(){
      let { index,mv } = this
      if(index+1 > mv.lastRank){
        return 'el-icon-top'
      }else if (index+1 < mv.lastRank) {
        return 'el-icon-bottom'
      }else{
        return 'el-icon-minus'
      }
    }
  },
  watch: { 

  },
  components: { 

  },
  methods: {
    toMvDetail(id){
      this.$router.push({path:`/discoverVideo/mvDetail/${id}`})
    }
  },
  created () { 

  },
  mounted () { 

  },
}
</script>
<style scoped lang='scss'>
.mv-board-item{
    display: flex;
    align-items: center;
    padding: 10px;
    height: 120px;
    cursor: pointer;
  .left-index{
    height: 100%;
    width: 40px;
    color:#949494;
    font-family: fangsong;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    position: relative;
    //斜体
    font-style: italic;
    .iconfont{
      position: absolute;
      top: calc(50% + 16px);
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      &.el-icon-top{
        color:#EC4141;
      }
      &.el-icon-bottom{
        color:#4DBF4D;
      }
      &.el-icon-minus{
        color:#888;
      }
    }
  }
  .cover-box{
    width: 160px;
    height: 100%;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
    .icon-Fire{
      position: absolute;
      left: 106px;
      top: 7px;
      color: #fff;
      font-size: 12px;
    }
    .play-count{
      position: absolute;
       left: 118px;
      top: 6px;
      color: #fff;
      font-size: 12px;
    }
  }
  .mv-info{
    flex:1;
    min-width: 100px;
    max-width: 160px;
    margin-left: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .mv-artist{
      color: #9F9F9F;
      font-size: 14px;
    }
  }
}

</style>