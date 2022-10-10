<template>
  <div    class='bottom-bar'>
    <div class="song">
      <img src="https://p1.music.126.net/dkD6oVl5Vlky3mStxUFpHA==/109951167015368904.jpg?param=34y34" alt="" class="song-img">
      <div class="song-info">
        <div class="song-info-top">
          <div class="song-name text-overflow">暗藏深海</div>
          <span class="iconfont icon-heart"></span>
        </div>
        <div class="singer-name">戴雨桐</div>
      </div>
    </div>
    <div class="paly-opt"></div>
    <div class="tool"></div>
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
  props: {
  },
  data () {
    return {

    }
  },
  created () { 

  },
  computed: { 

  },
  components: { 

  },
  methods: {

  },
  mounted () { 

  },
  watch: { 

  }
}
</script>
<style scoped lang='scss'>
 .bottom-bar{
   position: fixed;
   left:0;
   bottom:0;
   height: 80px;
   width:100%;
   border-top:1px solid #e0e0e0;
   display: flex;
   background-color: #fff;
   justify-content: space-between;
   .song{
      padding:10px;
      display: flex;
      cursor: pointer;
      .song-img{
        width: 52px;
        height: 52px;
        border-radius:5px;
        margin-right:12px;
      }
      .song-info{
         color:#373737;
         .song-info-top{
           padding:4px 0;
           display: flex;
           align-items: center;
           flex-wrap: nowrap;
           .song-name{
             max-width: 300px;
             font-size: 16px;
           }
           .iconfont{
            margin-left:5px;
            font-size: 18px;
          }
         }
        .singer-name{
          font-size: 12px;
          color:#373737;
        }
      }
   }

 }
</style>