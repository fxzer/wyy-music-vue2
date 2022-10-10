<template>
  <div>
    <Header />
    <LeftMenu />
    <div class="main-wrap"><RouterView class="content-wrap" /></div>
    <BottomBar />
  </div>
</template>

<script>
import Header from "@/components/layout/Header";
import LeftMenu from "@/components/layout/LeftMenu";
import BottomBar from "@/components/layout/BottomBar";
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
  },
  methods: {},
  mounted() {},
  watch: {},
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
    border:1px solid red;
  }
}
</style>