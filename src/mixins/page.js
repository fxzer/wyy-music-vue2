/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-14 16:48:49
 * @FilePath: \vue-wyy-music\src\mixins\page.js
 * @Description: 
 */
export default {
  data() {
    return {
      pageOption: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        background:true,
        pageSizes: [10, 20, 30, 50],
        layout: 'prev, pager, next,jumper,total',
     },
     offset:0,
    }
  },
  methods: {
    currentChange(current) {
      this.pageOption.currentPage = current
      this.offset = (current - 1) * this.pageOption.pageSize
    },
  }
}