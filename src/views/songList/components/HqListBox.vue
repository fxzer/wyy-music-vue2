<template>
 <div class="hq-list-box"   @click="toSongListDetail(hqInfo.id)" >
    <div class="cover-box">
      <img   :src="coverSrc"  /> 
       <PlayBtn  position="br"  @click.native.stop="addSongToList(hqInfo.id)"  />
      <span class="rec-icon iconfont icon-xianxinghuangguan"></span>
    </div>
    <div class="list-des"  >
      <p class="list-name">
           {{hqInfo.name}}  
      </p>
      <p class="list-creator">
       <span>by</span> <span class="creator-name">{{nickname}}</span><img :src="iconSrc"> 
      </p>
      <p class="list-copy-writer text-of-multi"> {{hqInfo.copywriter}}</p>
      <p class="tag" v-if="hqInfo.tag">
        <span>{{hqInfo.tag}}</span>
      </p>
  </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'HqListBox',
  props: {
    hqInfo:{
      type:Object,
      default:()=>{}
    },
    csrc:{
      type:String,
      default:require('../../../assets/images/hq-creator.png')
    },
  },
  data () {
    return {
      defaultImg:require('../../../assets/images/highquality.jpg'),
    }
  },
  computed: { 
     coverSrc(){
      return this.hqInfo.coverImgUrl || this.defaultImg
    },
    nickname(){
      return this.hqInfo.creator?.nickname || ''
    },
    iconSrc(){
      return this.hqInfo?.creator?.avatarDetail?.identityIconUrl || this.defaultImg
    }
  },
  watch: { 

  },
  components: { 

  },
  methods: {
    ...mapMutations('player',['addSong','setCurSLId','setCurSL']),
    toHqList(){
      this.$router.push({path:'/hqList'})
    },
  },
  created () { 

  },
  mounted () { 

  },
}
</script>
<style scoped lang='scss'>
.hq-list-box{
  display: flex;
  .cover-box{
    height: 160px;
    width: 160px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .play-btn{
      opacity: 0;
    }
    &:hover{
      .play-btn{
        opacity: 1;
      }
    }
    .rec-icon{
      position:absolute;
      width: 40px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      top: -3px;
    left: -12px;
      font-size: 16px;
      color: #fff;
      background-color: #F3B068;
      transform: rotate(-45deg);
      transform-origin: center;

    }
  }
  //右侧
   .list-des{
      flex: 1;
      padding: 0 10px;
      .list-name{
        font-size: 14px;
        color: #1d1d1d;
      }
      .list-creator{
        font-size: 12px;
        display: flex;
        align-items:center;
        margin: 20px 0;
        color: #1d1d1d;
        opacity: .7;
        .creator-name{
          margin:0 5px;
        }
        img{
          width:16px;
          height:16px;
        }
      }
      .list-copy-writer{
        font-size: 12px;
         color: #1d1d1d;
          opacity: .5;
          margin-bottom:10px;

      }
      .tag{
        span{
          font-size:12px;
          color:#ce4141;
          border:1px solid #ce4141;
          border-radius: 3px;
          padding: 0px 2px;
        }
      }
    }
}
</style>