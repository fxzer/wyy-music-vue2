<template>
  <div 
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中..."
   style="padding-bottom: 100px;"
  >
    <div class="dj-radio-result">
      <SongListBox v-for="item in radioList" :key="item.id" :algInfo="item"/>
    </div>
    <Pagination v-bind="pageOption" @current-change="handleCurrentChange" />

  </div>
</template>

<script>
// import DjRadios from '@/mock/kw-radio'
// let djRadios = DjRadios.result.djRadios
import page from '@/mixins/page'
import search from '@/mixins/search'
export default {
  name: 'DjRadios',
  props: {
  },
  mixins:[page,search],
  data () {
    return {
      // filterList:djRadios
    }
  },
  computed: { 
    radioList(){
      let reg = new RegExp(this.kw,'gi')
      return this.filterList.map(item => {
        item.name = item.name.replace(reg,`<span class="kw-highlight">${this.kw}</span>`)
        return item
      })
    }
  },
  watch: { 

  },
  components: { 
    SongListBox : () => import('@/views/personalized/components/SongListBox.vue')
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
.dj-radio-result{
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  margin-top: 10px;
  justify-content: space-between;
  width: 100%;
  .song-list-box{
    width: calc(20% - 16px); 
    margin-bottom: 20px;
    &:nth-of-type(5n) {
      margin-right: 0;
    }
  }
}
</style>