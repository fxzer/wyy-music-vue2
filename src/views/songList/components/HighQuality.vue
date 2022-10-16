<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 17:14:28
 * @FilePath: \vue-wyy-music\src\views\songList\components\HighQuality.vue
 * @Description: 
-->
<template>
  <div class="hq-list-wrap"
      v-loading="loading" 
      element-loading-spinner="el-icon-loading"
      element-loading-text="载入中..."
  >
    <div class="hq-header">
      <h2 class="title">
        <span>精品歌单</span> <i class="el-icon-question" title="如何成为精品歌单" @click="showHqIssues"></i>
       <Panel :visible="hqIssuesShow" :styleObj="issuesStyle">
        <template #content>
          <iframe src="https://music.163.com/#/topic?id=202001" frameborder="0" style="width:1000px;height:800px;"></iframe>
        </template>
      </Panel>
      </h2>
      <div class="cate-btn" @click="selectPanelChange">
        <i class="iconfont icon-filter"></i>
        <span>{{activeName || '全部歌单'}}</span>
         <CatePanel  @selectCate="handleCateClick"  :visible.sync="panelShow" :activeCate="activeName"
         :showLevel1="false" :subGroup="subGroup"  :panelStyle="panelStyle" :categories="categories"/>
      </div>
    </div>
    <div class="hq-list-body">
      <HqListBox v-for="hqInfo in highQualitys" :key="hqInfo.id"   
      :hqInfo="hqInfo"/>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "HighQuality",
  props: {},
  data() {
    return {
      highQualitys: [],
      activeName:'',
      subGroup:[],
      categories:{0:'全部'},
      loading: false,
      panelShow: false,
      hqIssuesShow: false,
      panelStyle:{
        width:'640px',
        left:'-565px'
      },
      issuesStyle:{
        width:'1040px',
        height:'900px',
      }
    };
  },
  computed: {},
  watch: {},
  components: {
    HqListBox: () => import("./HqListBox.vue"),
    CatePanel:() => import('./CatePanel.vue')
  },
  methods: {
       //精品歌单
    async getHighQuality(cat,limit = 9){
      this.loading = true
      let baseUrl = '/top/playlist/highquality'
      let catStr = cat ? `&cat=${cat}` : ''
      let url = `${baseUrl}?limit=${limit}${catStr}` 
      let { playlists } = await this.$http(url)
      this.highQualitys = playlists || []
      this.loading = false
    },
    async getHqCates(){
      let url  = '/playlist/highquality/tags'
      let {tags} = await this.$http(url)
      this.subGroup = [tags]
    },
    //点击分类筛选hq歌单
    handleCateClick({name=''}){
      this.panelShow = false
      this.activeName = name
      this.getHighQuality(name)
    },
    //显示与隐藏筛选面板
     selectPanelChange(){
      
      this.panelShow = !this.panelShow
      this.getHqCates()
    },
    showHqIssues(){
      this.hqIssuesShow =  !this.hqIssuesShow
    }
    
  },
  created() {
    let {cat} = this.$route.query
    this.activeName = cat
    this.getHighQuality(cat)
  },
  mounted() {},
};
</script>
<style scoped lang='scss'>
.hq-header {
  margin: 30px 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 600;
    color: #1d1d1d;
    .el-icon-question{
      color:#ccc;
      font-size: 18px;
      cursor: pointer;
      &:hover{
        color:#EC4141;
        opacity: 0.8;
      }
    }
  }
  .cate-btn {
    color:#666;
    height: 30px;
    line-height:30px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    border:1px solid #ddd;
    padding: 0 15px;
    cursor: pointer;
  }
}

.hq-list-body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
</style>