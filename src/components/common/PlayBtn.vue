<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-15 18:55:21
 * @FilePath: \vue-wyy-music\src\components\common\PlayBtn.vue
 * @Description: 
-->
<template>
  <span class="play-btn" 
  :class="[
        size ? 'play-btn--' + size : 'play-btn--normal',
        position ?  'is-'+ position : 'is-center',
        bgFilter ?  'is-bg-filter': '',
      ]" >
    <i class="iconfont icon-playfill"></i>
  </span>
</template>

<script>
export default {
  name: "PlayBtn",
  props: ['size','position','bgFilter'],
  data() {
    return {
    };
  },
  computed: {},
  watch: {},
  components: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.play-btn {
  border-radius: 50%;
  background-color: #fff;
  vertical-align: middle;
  color: #ec4141;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease-in-out;
  position: absolute;
  cursor: pointer;
  z-index:2;
  &.is-bg-filter{
    backdrop-filter: blur(1px);
    background-color: rgba(255,255,255,0.6);
  }
  //位置
  &.is-center{
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  &.is-br{
    bottom: 12px;
    right: 12px;
  }
  //尺寸
  &.play-btn--large {
    width: 40px;
    height: 40px;
    .icon-playfill {
      font-size: 22px;
      margin-bottom: 3px;
      margin-left: 1px;
    }
  }
  &.play-btn--normal {
    width: 32px;
    height: 32px;
    .icon-playfill {
      font-size: 20px;
      margin-bottom: 3px;
      margin-left: 1px;
    }
  }
  &.play-btn--medium {
    width: 28px;
    height: 28px;
    .icon-playfill {
      font-size: 16px;
      margin-bottom: 3px;
      margin-left: 1px;
    }
  }
  &.play-btn--small {
    width: 24px;
    height: 24px;
    .icon-playfill {
      font-size: 15px;
      margin-bottom: 2px;
      margin-left: 1px;
    }
  }
}
</style>