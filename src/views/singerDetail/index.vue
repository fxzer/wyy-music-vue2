<template>
  <div class="user-detail">
     <div class="detail-header">
        <img :src="singerDetail.artist && singerDetail.artist.cover"   class="user-cover">
        <div class="right-box">
          <h2 class="name">{{singerDetail.artist &&  singerDetail.artist.name}}</h2>
          <p class="alias"></p>
          <div class="detail-count">
           <span class="count-item" v-if="singerDetail.artist">单曲数:{{singerDetail.artist.musicSize}}</span>
             <span class="count-item" v-if="singerDetail.artist" >专辑数:{{singerDetail.artist.albumSize}}</span>
            <span class="count-item" v-if="singerDetail.videoCount">MV数:{{singerDetail.artist.mvSize}}
            </span>
            <span class="count-item" v-if="singerDetail.eventCount">演出数:</span>
          </div>
          <p class="desc text-of-multi" v-if="singerDetail.artist">
            {{singerDetail.artist.briefDesc}}
          </p>
        </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'SingerDetail',
  props: {
  },
  data () {
    return {
      singerDetail: {}
    }
  },
  computed: { 

  },
  components: { 

  },
  methods: {
   async getSingerDetail(id){
      const { data } = await this.$http(`/artist/detail?id=${id}`)
      console.log('data: ', data);
      this.singerDetail = data
    }
  },
  created () { 
    let { id } = this.$route.params
    console.log('id: ', id);
    this.getSingerDetail(id)
  },
  mounted () { 

  },
  watch: { 

  }
}
</script>
<style scoped lang='scss'>
.user-detail{
  .detail-header{
    display: flex;
    padding: 20px;
    .user-cover{
      width: 200px;
      height: 200px;
      border-radius: 6px;
    }
    .right-box{
      margin-left: 20px;
      .name{
        font-size: 20px;
        font-weight: 700;
      }
      .alias{
        font-size: 14px;
        color: #999;
      }
      .detail-count{
        margin-top: 20px;
        font-size: 14px;
        color:#666;
        .count-item{
          margin-right: 20px;
        }
      }
      .desc{
        color:#999;
        font-size:12px;
        line-height: 1.5;
        margin-top: 12px;
      }
    }
  }
}
</style>