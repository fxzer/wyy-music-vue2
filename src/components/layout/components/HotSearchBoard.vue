<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 23:42:58
 * @FilePath: \vue-wyy-music\src\components\layout\components\HotSearchBoard.vue
 * @Description: 
-->
<template>
  <div class="hot-search-board"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="载入中..."
  >
    <div class="hot-title">热搜榜</div>
      <div class="hot-item" v-for="(item, index) in hotList" :key="index"
        @click="$emit('select', item)">
        <div class="rank-number">{{ index }}</div>
        <div class="hot-detail">
          <p class="word-detail">
            <span class="search-word">{{ item.searchWord }}</span>
            <span class="hot-tag" v-if="index < 3">HOT</span>
            <span class="word-score">{{ item.score }}</span>
          </p>
          <p class="hot-content">{{ item.content }}</p>
        </div>
      </div>
  </div>
</template>

<script>
// import hotSearch from '@/mock/hotSearch'
export default {
  name: "HotSearchBoard",
  props: { },
  data() {
    return {
      loading:false,
      hotList:[],
    };
  },
  computed: {},
  watch: {},
  components: {},
  methods: {
    //热搜榜
    async getHotSearchBoard(){
      this.loading = true
      let { data } = await this.$http('/search/hot/detail') 
      this.hotList = data
      this.loading = false
    },
  },
  created() {
    this.getHotSearchBoard()
  },
  mounted() {
  //  this.hotList = hotSearch.data
  },
};
</script>
<style scoped lang='scss'>
.hot-search-board {
  width: 100%;
  height: 100%;
  color: #666;
  overflow: auto;
  .hot-title {
    font-size: 16px;
    color:#888;
    padding: 10px 24px 0 24px;
  }
  .hot-item {
    height: 60px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
    // 数字排行
    .rank-number {
      width: 60px;
      height: 60px;
      font-size: 16px;
      color: #999;
      line-height: 60px;
      text-align: center;
    }
    &:nth-child(1) {
      .rank-number {
        color: #f00;
        font-weight: 600;
      }
      .hot-detail .word-detail .search-word {
        color: #333;
      }
    }
    &:nth-child(2) {
      .rank-number {
        color: #f00;
        font-weight: 600;
        opacity: 0.8;
      }
      .hot-detail .word-detail .search-word {
        color: #333;
      }
    }
    &:nth-child(3) {
      .rank-number {
        color: #f00;
        font-weight: 600;
        opacity: 0.65;
      }
      .hot-detail .word-detail .search-word {
        color: #333;
      }
    }
    // 右侧详情
    .hot-detail {
      .word-detail {
        display: flex;
        align-items: center;
        .search-word {
          font-size: 14px;
          color: #666;
          font-weight: 600;
        }

        .hot-tag {
          margin-left: 5px;
          padding: 0 5px;
          font-size: 12px;
          color: #f00;
          //斜体
          font-style: italic;
          font-weight: 600;
          transform: scale(0.85);
        }
        .word-score {
          margin-left: 5px;
          font-size: 12px;
          color: #ccc;
        }
      }
      .hot-content {
        font-size: 12px;
        color: #999;
        margin-top: 4px;
      }
    }
  }
}
</style>