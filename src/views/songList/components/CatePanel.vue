<template>
  <Panel :visible.sync="visible" :styleObj="panelStyle" @titleClick="$emit('selectCate',{})" showTitle>
    <template v-slot:title>
      <span class="title-text">全部歌单</span>
    </template>
    <template v-slot:content>
      <div
        class="level1-cate-wrap"
        v-for="(category, key) in categories"
        :key="key"
      >
        <!-- 左侧大类 -->
        <div class="level1-name" v-if="showLevel1">
          <i class="iconfont" :class="cateIcons[key]"></i>
          <span>{{ category }}</span>
        </div>
        <!-- 右侧小类 -->
        <div class="level2-cate-wrap">
          <div
            class="cate-item"
            v-for="(cate, index) in subGroup[key]"
            :key="index"
            @click.stop="$emit('selectCate',cate)"
          >
            <span
              class="cate-name"
              :class="{ 'is-hot': cate.hot, active: activeName === cate.name }"
              >{{ cate.name }}</span
            >
          </div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
export default {
  name: "CatePanel",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    activeCate:{
      type:String,
      default:''
    },
    showLevel1: {
      type: Boolean,
      default: true,
    },
    subGroup:{
      type:Array,
      default:()=>[]
    },
    categories: {
      type: Object,
      default: () => ({}),
    },
    panelStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
       activeName:'',
       cateIcons:['icon-diqiu','icon-dianfengge','icon-changjing','icon-smiling','icon-waiguan'],
    };
  },
  computed: {},
  watch: {
    activeCate:{
      immediate:true,
      handler(cate){
        if(cate) this.activeName = cate
      }
    }
  },
  components: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
//分类选择面板
.level1-cate-wrap {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 30px;
  .level1-name {
    width: 150px;
    color: #000;
    opacity: 0.5;
    display: flex;
    align-items: flex-start;
    .iconfont {
      font-size: 18px;
      margin-right: 3px;
    }
  }
  .level2-cate-wrap {
    flex: 1;
    display: grid;
    column-gap: 10px;
    row-gap: 15px;
    grid-template-columns: repeat(6, 1fr);
    .cate-item {
      cursor: pointer;
      &:hover .cate-name {
        color: #ec4141 !important;
      }
      .cate-name {
        padding: 0 10px;
        font-size: 14px;
        color: #666;
        display: inline-block;
        height: 24px;
        line-height: 24px;
        position: relative;
        &.active {
          color: #ec4141;
          background-color: #fef5f5;
          border-radius: 12px;
          font-weight: 600;
        }
        &.is-hot::after {
          content: "HOT";
          position: absolute;
          top: -4px;
          right: -12px;
          font-size: 10px;
          transform: scale(0.6);
          color: #ec4141;
          font-weight: 600;
        }
      }
    }
  }
}

</style>