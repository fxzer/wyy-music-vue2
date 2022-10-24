<template>
  <p class="index-box">
    <span
      v-if="curId == id"
      class="iconfont"
      :class="playing ? 'icon-laba' : 'icon-zero-volume'"
    ></span>
    <span v-else>
      {{ indexText }}
    </span>
  </p>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "FirstColState",
  props: {
    curId: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('player', ['id','playing']),
    indexText(){
      return this.index < 9 ? "0" + parseInt(1 + this.index) : parseInt(1 + this.index)
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
 .index-box .iconfont{
    color: #EC4141;
    font-size: 18px;
  }
</style>