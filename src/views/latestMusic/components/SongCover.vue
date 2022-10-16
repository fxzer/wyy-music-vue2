<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 14:33:37
 * @FilePath: \vue-wyy-music\src\views\latestMusic\components\SongCover.vue
 * @Description: 
-->
<template>
  <div class="song-box">
    <div class="song-cover">
      <img :src="song.album.picUrl" alt="">
      <PlayBtn   size="small"  />
    </div>
    <div class="song-info">
      <span class="song-name text-of-single" :title="song.name">{{song.name}} </span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'SongCover',
  props: {
    song:{
      type:Object,
      default:()=>{}
    }
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
.song-box{
  display: flex;
  align-items:center;
  height:72px;
  .song-cover{
    width: 72px;
    height: 72px;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .song-info{
    flex:1;
    min-width: 200px;
    margin-left:12px;
    display: flex;
    align-items:center;
  }
}
</style>