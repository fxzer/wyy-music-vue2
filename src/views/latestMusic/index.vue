<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 16:51:37
 * @FilePath: \vue-wyy-music\src\views\latestMusic\index.vue
 * @Description: 
-->
<template>
  <div class="latest-music">
    <div class="type-radio-wrap">
      <div class="type-radio-body">
        <div
          class="radio-button"
          v-for="(value, typeName) in newTypes"
          :key="value"
          :class="{ active: value == activeType }"
          @click="changeType(value)"
        >
          {{ typeName }}
        </div>
      </div>
      <!-- 新碟速递 -->
      <NewSongList v-if="!activeType" />
      <!-- 新碟上架 -->
      <NewDiscList v-else />
    </div>
  </div>
</template>

<script>
// import newSongs from '@/mock/newsongs'
// let newSongList = newSongs.data.slice(0,10)
export default {
  name: "LatestMusic",
  props: {},
  data() {
    return {
      activeType: 0,
      newTypes: {
        新歌速递: 0,
        新碟上架: 1,
      },
    };
  },
  computed: {},
  components: {
    NewSongList: () => import("./components/NewSongList.vue"),
    NewDiscList: () => import("./components/NewDiscList.vue"),
  },
  methods: {
    changeType(value) {
      let { query } = this.$route;
      this.$router.push({
        query: Object.assign({}, query, { newType: value }),
      });
      this.activeType = value;
    },
  },
  created() {
    let { newType = 0 } = this.$route.query;
    this.activeType = parseInt(newType);
  },
  mounted() {},
  watch: {},
};
</script>
<style scoped lang='scss'>
.latest-music {
  // 新歌速递/新碟上架
  .type-radio-wrap {
    width: 100%;
    height: 32px;
    text-align: center;
    .type-radio-body {
      width: 270px;
      display: flex;
      overflow: hidden;
      align-items: center;
      border-radius: 16px;
      border: 1px solid #ddd;
      margin: 20px auto;
      .radio-button {
        flex: 1;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: #ec4141;
        font-size: 14px;
        cursor: pointer;
        border-radius: 16px;
        border: none;
        vertical-align: middle;
        &:hover {
          background-color: #feeeee;
        }
        &.active {
          background-color: #ec4141;
          opacity: 0.8;
          color: #fff;
        }
      }
    }
  }
  .filter-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //国家地区
    .area-type-wrap {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .area-type-item {
        color: #666;
        font-size: 14px;
        cursor: pointer;
        margin-left: 30px;
        &:hover {
          color: #444;
        }
        &.active {
          color: #333;
          font-weight: 700;
        }
      }
    }
    //推荐/全部
    .recommend-wrap {
      display: flex;
      align-items: center;
      .recommend-item {
        color: #666;
        font-size: 14px;
        cursor: pointer;
        margin-left: 30px;
        &:hover {
          color: #444;
        }
        &.active {
          color: #ec4141;
        }
      }
    }
  }
}
</style>