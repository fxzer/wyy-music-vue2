<template>
  <div class="count-info" v-if="showBtns" >
    <div class="count-item">
      <i class="iconfont icon-dianzan"></i>
      <span class="text">赞</span>
      <span class="count">({{ countInfo.likedCount }})</span>
    </div>
    <div class="count-item">
      <i class="iconfont icon-pinglun-c"></i>
      <span class="text">评论</span>
      <span class="count">({{ countInfo.commentCount }})</span>
    </div>
    <div class="count-item">
      <i class="iconfont icon-share"></i>
      <span class="text">分享</span>
      <span class="count">({{ countInfo.shareCount }})</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountInfo",
  props: {
    countInfo: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    showBtns(){
      return Object.keys(this.countInfo).length
     }
  },
  watch: {},
  components: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.count-info {
  display: flex;
  align-items: center;
  margin-top: 10px;
  .count-item {
    height: 32px;
    padding: 12px;
    border-radius: 18px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    margin-right: 15px;
    cursor: pointer;
    .icon {
      margin-right: 3px;
      font-size: 16px;
    }
    .text,
    .count {
      font-size: 12px;
      color: #666;
      margin-right: 2px;
    }
    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>