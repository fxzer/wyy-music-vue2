<template>
  <div class="may-interest-item is-singer">
    <img
      src="https://p1.music.126.net/WP8O0ixZNwpm0fG6zymivQ==/109951167957001651.jpg"
      class="item-cover"
      alt=""
    />
    <div class="item-info">
      <p class="item-name text-of-single">
        singerNamesinger NamesingerNamesingerNamesingerNamesingerNamesingerName
      </p>
      <p class="item-desc text-of-single">singerNamesinger NamesingerNamesingerNamesingerNamesingerNamesingerName</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MayInterestItem",
  props: {},
  data() {
    return {};
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
.may-interest-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  width: calc(25% - 8px);
  margin-right:10px;
  margin-bottom:10px;
  .item-cover {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
  &.is-singer {
    .item-cover {
      border-radius: 50%;
    }
    .item-info {
      width: calc(100% - 60px);
    }
  }

  &.is-video {
    .item-cover {
      width: 80px;
      height: 50px;
    }
    .item-info {
      width: calc(100% - 90px);
    }
  }
  .item-info {
    margin-left: 10px;
    .item-name {
      font-size: 14px;
      color: #333;
    }
    .item-desc {
      margin-top: 6px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>