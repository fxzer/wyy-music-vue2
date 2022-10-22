<template>
  <div class="commment-item">
    <img :src="comment.user.avatarUrl" />
    <div class="info">
      <div class="top-box ">
        <el-link :underline="false" class="user-name"
          >{{ comment.user.nickname }}:</el-link
        >
        {{ comment.content }}
      </div>

      <div class="bottom-box">
        <div class="time">{{ comment.timeStr }}</div>
        <div class="opts-box">
          <p class="btn-item jubao">举报</p>
          <p class="btn-item">
            <span class="iconfont icon-dianzan"></span
            ><span>{{ comment.likedCount }}</span>
          </p>
          <p class="btn-item"><span class="iconfont icon-share"></span></p>
          <p class="btn-item"><span class="iconfont icon-pinglun-c"></span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
  },
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
.commment-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    align-self:flex-start;
    border:1px solid #f5f5f5;
  }
  .info {
    flex: 1;
    margin-left: 10px;
    .top-box {
      font-size: 14px;
      color: #666;
      .user-name {
        color: #4278b4;
        margin-right: 4px;
        align-self: flex-start;
        display: inline-block;
      }
    }
    .bottom-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .time {
        font-size: 12px;
        color: #999;
        margin-top: 6px;
      }
      .opts-box {
        display: flex;
        align-items: center;
        .btn-item {
          font-size: 12px;
          color: #999;
          padding: 0 10px;
          cursor: pointer;
          vertical-align: top;
          &:hover {
            color: #333;
          }
        }
         .btn-item.jubao{
          opacity:0;
          transition:all .2s ease-in-out;
        }
        .btn-item:nth-of-type(3)::after,
        .btn-item:nth-of-type(3)::before {
          content: "|";
          color: #ccc;
        }
        .btn-item:nth-of-type(3)::before {
          padding-right: 10px;
        }
        .btn-item:nth-of-type(3)::after {
          padding-left: 10px;
        }
      }
    }
  }
  &:hover{
    .btn-item.jubao{
      opacity:1 !important;
    }
  }
}
</style>