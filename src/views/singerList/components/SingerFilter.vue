<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-15 22:39:55
 * @FilePath: \vue-wyy-music\src\views\singerList\components\SingerFilter.vue
 * @Description: 
-->
<template>
  <div class="filter-wrap"> 
    <div class="cate-kind" v-for="kind in filterData" :key="kind.name">
       <div class="cate-title">{{kind.name}}：</div>
       <div class="cate-group">
          <span class="cate-item"  v-for="cate in kind.list" :key="cate.name"
           :class="{'active':activeFn(cate.value,kind.value)}"
           @click="handleCateClick(cate.value,kind.value)"
          >{{cate.name}}</span>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingerFilter",
  props: {},
  data() {
    return {
      filterData: [],
      area: -1,
      type: -1,
      initial: -1,
    };
  },
  computed: {
    // filterQuery(){
    //   this.$emit('filterChange','?area='+this.area+'&type='+this.type+'&initial='+this.initial)
    //   return '?area='+this.area+'&type='+this.type+'&initial='+this.initial
    // }
  },
  watch: {},
  components: {},
  methods: {
    //生成字符过滤器
    generateData() {
      let filterData = [
        {
          name: "语种",
          value:'area',
          list: [
            {
              name: "全部",
              value: -1,
            },
            {
              name: "华语",
              value: 7,
            },
            {
              name: "欧美",
              value: 96,
            },
            {
              name: "日本",
              value: 8,
            },
            {
              name: "韩国",
              value: 16,
            },
            {
              name: "其他",
              value: 0,
            },
          ],
        },
        {
          name: "分类",
          value:'type',
          list: [
            { name: "全部", value: -1 },
            { name: "男歌手", value: 1 },
            { name: "女歌手", value: 2 },
            { name: "乐队", value: 3 },
          ],
        },
      ]
      let letterFilter = [];
      let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      //生成26个字母
      letterFilter = letters.map((item) => {
        return {
          name: item,
          value: item,
        };
      });
      letterFilter.unshift({
        name: "热门",
        value: -1,
      });
      letterFilter.push({
        name: "#",
        value: 0,
      });
      filterData[2] = {
        name:'筛选',
        value:'initial',
        list:letterFilter
      };
      return filterData
    },
    //判断激活状态
    activeFn(cateValue,kindValue) {
      switch(kindValue){
        case 'area':
          return cateValue  == this.area 
        case 'type':
          return cateValue ==this.type
        case 'initial':
          return cateValue ==this.initial
      }
    },
    //点击分类
    handleCateClick(cateValue,kindValue){
      let  { query } = this.$route
       switch(kindValue){
        case 'area':
          this.$router.push({
            query:Object.assign({},query,{ area:cateValue})
          })
          return  this.area = cateValue
        case 'type':
          this.$router.push({
            query:Object.assign({},query,{ type:cateValue})
          })
          return this.type  = cateValue
        case 'initial':
          this.$router.push({
            query:Object.assign({},query,{ initial:cateValue})
          })
          return  this.initial = cateValue
      }
    },
    //刷新页面时，从路由中获取重新初始化分类  
    initFilter(){
      let { query } = this.$route
      let { area,type,initial } = query
      this.area = typeof area !== 'undefined' ? area : -1
      this.type =  typeof type !== 'undefined' ? type  : -1
      this.initial =  typeof initial !== 'undefined' ? initial  : -1
    }
  },
  created() {
    this.initFilter()
    this.filterData =  this.generateData()
  },
  mounted() {},
};
</script>
<style scoped lang='scss'>
.filter-wrap{
  margin:20px 0;
  .cate-kind{
    display: flex;
    flex-wrap: nowrap;
    font-size: 12px;
    .cate-title{
      color:#666;
      margin-right: 10px;
      width: 40px;
      line-height: 24px;
    }
     .cate-group{
        flex:1;
        display: flex;
        flex-wrap: wrap;
        align-items:center;
        justify-content:flex-start;
        color:#888;
        .cate-item{
          padding:0 14px;
          height:24px;
          line-height: 24px;
          border-radius:12px ;
          margin-right:10px;
          margin-bottom:10px;
          cursor: pointer;
          &:hover{
            color:#666;
          }
          &.active{
            color:#EC4141;
            background-color: #FEF5F5;
          }
        }
      }
  }
}
</style>