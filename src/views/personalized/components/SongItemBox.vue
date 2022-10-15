<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-15 12:17:42
 * @FilePath: \vue-wyy-music\src\views\personalized\components\SongItemBox.vue
 * @Description: 
-->
<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-13 21:22:51
 * @FilePath: \vue-wyy-music\src\views\personalized\components\SongItemBox.vue
 * @Description: 
-->
<template>
  <div class="song-box" :class="'song-box--'+size" >
    <div class="img-box" @click="getSongUrl(songInfo.id)">
      <img :src="songInfo.picUrl" :alt="name" /> 
      <PlayBtn  :size="size"  />
    </div>
    <div class="song-des"  @click.stop="$emit('bgClick', songInfo.id)">
      <p class="song-name">
        {{name}} 
       <span  class="song-alias"  v-if="alias.length">(</span> 
       <span class="song-alias" v-for="alia in alias" :key="alia">{{alia}}</span>
       <span  class="song-alias"  v-if="alias.length">)</span> 
      </p>
      <!-- <p class="song-tags"><span class="tag-item">歌曲翻唱</span></p> -->
      <p class="artist-name text-of-multi">
        <Mtag content="Hi-Res" v-if="isHr"/>
        <Mtag content="SQ" v-if="isSq"/>
        <span v-for="artist in artists" :key="artist.id" class="name-item">{{artist.name}}</span>
      </p>
  </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongItemBox',
  props: {
    size:{
      type:String,
      default:'small',
      validate:(value)=>{
        return ['small','medium','large'].includes(value)
      }
    },
    songInfo:{
      type:Object,
      default:()=>{}
    }
  },
  data () {
    return {
      isFocus:false,
    }
  },
  created () { 

  },
  computed: { 
    name(){
      return this.songInfo?.song?.name || ''
    },
    artists(){
      return this.songInfo?.song?.artists || []
    },
    alias(){
      return this.songInfo?.song?.alias || []
    },
    isHr(){//Hi-Res音乐
      return this.songInfo?.song?.hrMusic?.bitrate > 320000
    },
    isSq(){//SQ音乐
      return this.songInfo?.song?.sqMusic?.bitrate > 320000
    },
  },
  components: { 

  },
  methods: {
    ...mapActions('player',['getSongUrl']),
  },
  mounted () { 

  },
  watch: { 

  }
}
</script>
<style scoped lang='scss'>
.song-box{
  display: flex;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  .img-box{
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .song-des{
    margin-left: 10px;
    flex: 1;
    .song-name{
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      margin-bottom: 5px;
      .song-alias{
        font-size: 12px;
        color: #999;
        &:nth-child(1){
          margin-left: 5px;
        }
      }
    }
    .song-tags{
      font-size: 12px;
      color: #999;
      margin-bottom: 5px;
      .tag-item{
        display: inline-block;
        padding: 2px 4px;
        vertical-align: middle;
        border-radius: 4px;
        border:1px solid #eee;
      }
    }
    .artist-name{
      font-size: 12px;
      color: #999;
      line-height: 1.5;
      vertical-align: middle;
      display: flex;
      align-items:center;
      .name-item{
        margin-right: 5px;
        cursor: pointer;
        &:hover{
          color:#333;
        }
      }
    }
  }
  &.song-box--small .img-box{
    width: 60px;
    height: 60px;
  }
  &.song-box--medium .img-box{
    width: 90px;
    height: 90px;
    .song-name{
      font-size: 18px;
    }
  }
  &:hover{
    background-color: #EBEBEB;
  }
  &.is-foucs{
    background-color: #EBEBEB;
  }
}
</style>