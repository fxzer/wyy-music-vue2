<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-14 17:56:48
 * @FilePath: \vue-wyy-music\src\components\common\Pagination.vue
 * @Description: 
-->
<template>
  <div class="wyy-pagination">
    <el-pagination
      small
      v-bind="$attrs"
      class="wyy-pagination"
      hide-on-single-page
      @current-change="$emit('current-change', $event)"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  components: {},
  methods: {
    
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.wyy-pagination {
  margin: 20px 0;
  font-weight: 400;
  ::v-deep .el-pagination {
    text-align: center;
    &.is-background .el-pager li:not(.disabled).active {
      background-color: #ec4141 !important;
    }
    .el-pagination__total {
      margin-left: 10px;
    }
    .el-pager li.number:not(.active):hover {
      color: #ec4141;
    }
    .el-pagination__jump .el-input__inner:focus {
      border-color: #f84e4e;
    }
  }
}
</style>