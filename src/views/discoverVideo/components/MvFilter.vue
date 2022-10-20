<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-15 22:39:55
 * @FilePath: \vue-wyy-music\src\views\singerList\components\SingerFilter.vue
 * @Description: 
-->
<template>
  <div class="filter-wrap">
    <div class="cate-kind" v-for="kind in filterData" :key="kind.name">
      <div class="cate-title">{{ kind.name }}：</div>
      <div class="cate-group">
        <span
          class="cate-item"
          v-for="cate in kind.list"
          :key="cate"
          :class="{ active: activeFn(cate, kind.value) }"
          @click="handleCateClick(cate, kind.value)"
          >{{ cate }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvFilter",
  props: {},
  data() {
    return {
      filterData: [
        {
          name: "地区",
          value: "area",
          list: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
        },
        {
          name: "分类",
          value: "type",
          list: ["全部", "官方版", "原声", "现场版", "网易出品"],
        },
        {
          name: "排序",
          value: "order",
          list: ["上升最快", "最新", "最热"],
        },
      ],
      area: "全部",
      type: "全部",
      order: "最新",
    };
  },
  computed: {},
  watch: {},
  components: {},
  methods: {
    //生成字符过滤器
    //判断激活状态
    activeFn(cate, kindValue) {
      switch (kindValue) {
        case "area":
          return cate == this.area;
        case "type":
          return cate == this.type;
        case "order":
          return cate == this.order;
      }
    },
    //点击分类
    handleCateClick(cate, kindValue) {
      let { query } = this.$route;
      switch (kindValue) {
        case "area":
          this.$router.push({
            query: Object.assign({}, query, { area: cate }),
          });
          return (this.area = cate);
        case "type":
          this.$router.push({
            query: Object.assign({}, query, { type: cate }),
          });
          return (this.type = cate);
        case "order":
          this.$router.push({
            query: Object.assign({}, query, { order: cate }),
          });
          return (this.order = cate);
      }
    },
    //刷新页面时，从路由中获取重新初始化分类
    initFilter() {
      let {
        query: { area = "全部", type = "全部", order = "全部" },
      } = this.$route;
      this.area = area;
      this.type = type;
      this.order = order;
    },
  },
  created() {
    this.initFilter();
  },
  mounted() {},
};
</script>
<style scoped lang='scss'>
.filter-wrap {
  margin: 20px 0;
  .cate-kind {
    display: flex;
    flex-wrap: nowrap;
    font-size: 12px;
    .cate-title {
      color: #555;
      margin-right: 10px;
      width: 40px;
      line-height: 24px;
    }
    .cate-group {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      color: #666;
      .cate-item {
        padding: 0 14px;
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover {
          color: #666;
        }
        &.active {
          color: #ec4141;
          background-color: #fef5f5;
        }
      }
    }
  }
}
</style>