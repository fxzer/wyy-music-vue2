<template>
  <div class="user-item"> 
    <div class="user-avatar-box">
      <img  class="user-avatar":src="user.avatarUrl" :alt="user.nickname" />
      <img class="identify-icon" :src="iconUrl" v-if="iconUrl"></img>
    </div>
    <div class="user-info">
      <div class="info-name">
        <span v-html="user.nickname"></span> 
        <span class="user-gender iconfont" :class="user.gender==1?'icon-nan':'icon-nv'"></span>
     </div>
     <div class="user-type">
       {{user.userType ==4 ? '网易音乐人' :  user.description}}
     </div>
     <div class="follows">
       关注:{{user.follows}} | 粉丝:{{user.followeds | playCountFilter}}
     </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      userType:{
        4:'网易音乐人',
      }
    }
  },
  computed: { 
    iconUrl(){
      return this.user?.avatarDetail?.identityIconUrl || '';
    }
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
.user-item{
  background-color: #f5f5f7;
  border-radius: 6px;
  padding:0 10px;
  display: flex;
  height: 80px;
  align-items: center;
  box-shadow: 0 0 3px #f5f5f5;
 .user-avatar-box{
  height:60px;
  width:60px;
  position: relative;
  margin-right: 8px;
  .user-avatar{
    border-radius: 50%;
  }
  .identify-icon{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
  }
 }
 .user-info{
    font-size: 12px;
   .info-name{
    font-size: 13px;
    color:#333;
    //  display: flex;
    //  justify-content: space-around;
     .user-gender{
      margin-left: 3px;
      font-size: 12px;
      border-radius: 50%;
      padding:2px;
      &.icon-nan{
        color: #4EACD7;
        background-color: #BFF3FF;
      }
      &.icon-nv{
        color: #E95993;
        background-color: #FBC8E3;
      }
     }
   }
   .user-type{
    margin:6px 0;
    color:#999;
   }
    
  }
}

</style>