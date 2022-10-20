<template>
  <div class="recomend-item">
    <div class="recomend-img">
      <img :src="item.picUrl" alt="" />
    </div>
    <div class="info-wrap">
      <div class="info-title">
       {{ item.name }}
      </div>
      <div class="info-des">
       {{ item.des }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoRecommendItem',
  props: {
  },
  data () {
    return {

    }
  },
  computed: { 

  },
  watch: { 

  },
  components: { 

  },
  methods: {

  },
  created () { 

  },
  mounted () { 

  },
}
</script>
<style scoped lang='scss'>
.recomend-item{
  display: flex;
  align-items: center;
  padding: 10px 0;
  .recomend-img{
    width: 100px;
    height: 60px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .info-wrap{
    flex:1;
    margin-left: 10px;
    .info-title{
      font-size: 14px;
      color: #333;
      font-weight: 700;
    }
    .info-des{
      font-size: 12px;
      color: #999;
    }
  }
}
</style>