<template>
  <div id="app">
    <Layout />
  </div>
</template>


<script>
import Layout from "@/layouts";
export default {
  name: "APP",
  data() {
    return {};
  },

 components:{
  Layout
 }
};
</script>
<style lang="scss">
#app {
  position: relative;
}
//隐藏滚动条
::-webkit-scrollbar {
  display: none;
}
</style>
