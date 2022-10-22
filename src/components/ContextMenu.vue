<template>
  <div class="menu-wrap"  v-if="visible" :style="{left:left,top:top}">
    <div class="menu-item"  >
        <i class="iconfont icon-paly"  ></i>
        <span class="item-text">播放(Enter)</span>
    </div>
    <div class="menu-item"  >
        <i class="iconfont icon-paly"  ></i>
        <span class="item-text">下一首播放</span>
    </div>
    <div class="menu-item"  >
        <i class="iconfont icon-paly"  ></i>
        <span class="item-text">查看评论</span>
    </div>
    <div class="menu-item"  >
        <i class="iconfont icon-xiazai"  ></i>
        <span class="item-text">下载</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    visible:{
      type:Boolean,
      default:false
    },
    left:{
      type:Number,
      default:0
    },
    top:{
      type:Number,
      default:0
    }
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

  },
  created () { 

  },
  mounted () { 

  },
}
</script>
<style scoped lang='scss'>
.menu-wrap{
  background-color: #fff;
  z-index: 99;
  border-radius: 6px;
  box-shadow: 0 0 6px #ddd;
  width: 240px;
  padding:8px 0;
  position: fixed;

  .menu-item{
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    cursor: pointer;
    &:hover{
      background-color: #f5f5f5;
    }
    .iconfont{
      font-size: 16px;
      margin-right: 12px;
    }
    .item-text{
      font-size: 14px;
      color:#1d1d1d;
    }
  }
}
</style>