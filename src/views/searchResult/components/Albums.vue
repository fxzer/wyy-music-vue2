<template>
  <div
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
    style="padding:10px 0 0px;"
  >
    <div class="albums-result">
      <SongListBox
        v-for="item in albumList"
        :key="item.id"
        :algInfo="item"
        size="large"
        showCreator
      />
    </div>
    <Pagination v-bind="pageOption" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import page from "@/mixins/page";
import search from "@/mixins/search";
export default {
  name: "Albums",
  props: {},
  mixins: [page, search],
  data() {
    return {};
  },
  computed: {
    albumList() {
      let reg = new RegExp(this.kw, "gi");
      return this.filterList.map(item => {
        item.name = item.name.replace(reg, `<span class="kw-highlight">${this.kw}</span>`);
        return item;
      });
    }
  },
  watch: {},
  components: {
    SongListBox: () =>
      import("@/views/personalized/components/SongListBox.vue"),
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
//歌单列表
.albums-result {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
}
</style>