<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 21:09:17
 * @FilePath: \vue-wyy-music\src\components\common\Panel.vue
 * @Description: 通用面板
-->
<template>
  <div class="panel-wrap" :style="style"  v-if="visible" >
     <h2 class="panel-title" @click.stop="$emit('titleClick')" v-if="showTitle">
       <slot name="title"></slot>
     </h2>
     <div class="panel-content">
        <slot name="content"></slot>
     </div>
     <div class="defaul">
        <slot></slot>
     </div>
  </div>
</template>

<script>
//TODO: 1. 点击外部隐藏
export default {
  name: 'Panel',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    styleObj:{
      type:Object,
      default:()=>{}
    },
  },
  data () {
    return {
      defaultStyle:{
        width:'100%',
        padding:'20px',
        top:'40px',
        left:'5px',
      }
    }
  },
  computed: { 
    style(){
      return {...this.defaultStyle,...this.styleObj}
    }
  },
  watch: { 

  },
  components: { 

  },
  methods: {
    hidePanel(){
      this.$emit('update:visible',false)
    }
  },
  created () { 
  },
  mounted () { 
    //获取父元素,设置父元素的position为relative
    this.$el.parentNode.style.position='relative'
    //设置分割线定位
    // if(this.$el){
    //   this.$el.style?.setProperty('--pdl','-'+this.style.padding)
    //   let pdr =  -parseInt(this.style.padding) * 2 + 'px'
    //   this.$el.style?.setProperty('--pdr',  pdr)
    // }
  },
  beforeDestroy(){
  }
}
</script>
<style scoped lang='scss'>
.panel-wrap{
  position: absolute;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0 4px #E0E0E0;
  z-index: 99;
  .panel-title{
    padding: 0  20px 10px 0;
    font-size: 16px;
    color: #333;
    position: relative;
    margin-bottom: 16px;
    border-bottom: 1px solid #E0E0E0;
    &:hover{
      color:#EC4141;
      cursor:pointer;
    }
    // &::after{
    //   position: absolute;
    //   bottom: 0;
    //   left:var(--pdl);
    //   right:var(--pdr);
    //   content: '';
    //   display: block;
    //   height: 1px;
    //   border-bottom: 1px solid #E0E0E0;
    // }
  }
  .panel-content{
    height: 100%;
  }
}
</style>