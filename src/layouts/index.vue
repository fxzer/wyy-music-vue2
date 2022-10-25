<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-11 14:23:31
 * @FilePath: \vue-wyy-music\src\components\layout\index.vue
 * @Description: 
-->
<template>
  <div>
    <Header />
    <LeftMenu />
    <div class="main-wrap">
      <RouterView class="content-wrap" />
      <MusicDetail :visible.sync="musicLyVisible" />
      </div>
    <BottomBar />
  </div>
</template>

<script>
import Header from "@/layouts/Header";
import LeftMenu from "@/layouts/LeftMenu";
import BottomBar from "@/layouts/BottomBar";
import MusicDetail from "@/layouts/components/MusicDetail";
import { mapState ,mapMutations } from 'vuex'
export default {
  name: "Layout",
  props: {},
  data() {
    return {};
  },
  created() {},
  components: {
    Header,
    LeftMenu,
    BottomBar,
    MusicDetail,
  },
  computed:{
    ...mapState('player',['musicLyVisible'])
  },
  methods: {
    ...mapMutations('player',['setMusicLyric'])
  },
  mounted() {},
  watch: {},
  beforeDestroy(){
     this.setMusicLyric(false)
  }
};
</script>
<style scoped lang='scss'>
.main-wrap {
  position: absolute;
  left: 200px;
  top: 60px;
  height: calc(100vh - 60px - 80px);
  width: calc(100vw - 200px);
  .content-wrap{
    width: 90%;
    margin: auto;
    height: 100%;
  }
}
</style>