<template>
  <div 
  v-loading="loading"
  element-loading-spinner="el-icon-loading"
  element-loading-text="载入中...">
    <div class="user-result">
      <UserItem v-for="user in userList" :key="user.userId" :user="user" />
    </div>
    <Pagination v-bind="pageOption" @current-change="handleCurrentChange" />

  </div>
</template>

<script>
import page from '@/mixins/page'
import search from '@/mixins/search'
export default {
  name: 'Userprofiles',//第二个字母小写方便mixins取返回值
  props: {
  },
  mixins:[page,search],
  data () {
    return {
    }
  },
  computed: { 
    userList(){
      let reg = new RegExp(this.kw,'gi')
      return this.filterList.map(user => {
        user.nickname = user.nickname.replace(reg,`<span class="kw-highlight">${this.kw}</span>`)
        return user
      })
    }
  },
  watch: { 

  },
  components: { 
    UserItem:()=> import('./UserItem.vue')
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
.user-result{
  display:grid;
  margin-top: 10px;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  cursor: pointer;

}
</style>