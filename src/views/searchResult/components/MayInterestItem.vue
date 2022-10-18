<template>
  <div class="may-interest-item" :class="'is-'+type">
    <img
      :src="coverImgUrl"
      class="item-cover"
      alt=""
    />
    <div class="item-info">
      <p class="item-name text-of-single">
       {{typeMap[type]}} : {{dataObj.name}} <span class="alias" v-if="type==='artist'" >{{alias}}</span>
      </p>
      
      <p class="item-desc text-of-single" v-if="type==='artist'" >粉丝:{{dataObj.fansSize | playCountFilter}}, 歌曲:{{dataObj.musicSize}}</p>
      <p class="item-desc text-of-single" v-else-if="type==='playlist'" >歌曲:{{dataObj.trackCount}}, 播放:{{dataObj.playCount | playCountFilter}}</p>
      <p class="item-desc text-of-single" v-else>{{dataObj.resourceName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MayInterestItem",
  props: {
    dataObj: {
      type: Object,
      default: () => {},
    },
    type:{
      type: String,
      default: "artist",
      validate: function (value) {
        console.log('this.typeMap: ', this.typeMap);
        return Object.keys(this.typeMap).indexOf(value) !== -1;
        // return ["artist", "playlist", "album",'vedio'].indexOf(value) !== -1;
      },
    }
  },
  data() {
    return {
      typeMap: {
        artist: "歌手",
        playlist: "歌单",
        album: "专辑",
        'new_mlog': "视频",
      },
    };
  },
  computed: {
    alias() {
      return this.dataObj?.alias?.join("/") || "";
    },
    coverImgUrl() {
      if(this.type ==='artist'){
        return this.dataObj?.picUrl || this.dataObj?.img1v1Url;
      }else if(this.type ==='playlist'){
        return this.dataObj?.coverImgUrl;
      }else if(this.type ==='album'){
        return this.dataObj?.picUrl;
      }else if(this.type ==='new_mlog'){
        return this.dataObj?.baseInfo.resource?.mlogBaseData?.coverUrl || this.dataObj?.baseInfo.resource?.userProfile?.avatarUrl;
      }
    },
  },
  watch: {},
  components: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.may-interest-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  width: calc(25% - 8px);
  margin-right:10px;
  margin-bottom:10px;
  .item-cover {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
  &.is-artist {
    .item-cover {
      border-radius: 50%;
    }
    .item-info {
      width: calc(100% - 60px);
    }
  }

  &.is-new_mlog {
    .item-cover {
      width: 80px;
      height: 50px;
    }
    .item-info {
      width: calc(100% - 90px);
    }
  }
  .item-info {
    margin-left: 10px;
    .item-name {
      font-size: 14px;
      color: #333;
      display: flex;
      align-items: center;
      .alias{
        font-size: 14px;
        color: #999;
      }
    }
    .item-desc {
      margin-top: 6px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>