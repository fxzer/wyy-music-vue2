<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-10 20:49:50
 * @FilePath: \vue-wyy-music\src\views\discoverVideo\index.vue
 * @Description: 
-->

<template>
  <div class="discover-video">
    <router-view class="videos-wrap" />
  </div>
</template>

<script>
export default {
  name: "DiscoverVideo",
  props: {},
  data() {
    return {
      secondaryMenuList: [
        {
          title: "视频",
          path: "/videoList",
        },
        {
          title: "MV",
          path: "/mvList",
        },
      ],
    };
  },
  created() {},
  computed: {},
  components: {},
  methods: {
  },
  mounted() {},
  watch: {},
};
</script>
<style scoped lang='scss'>
.discover-video {
  .videos-wrap {
    overflow: auto;
    height: 100%;
  }
}
</style>