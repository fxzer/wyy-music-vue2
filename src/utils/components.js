/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-14 21:43:26
 * @FilePath: \vue-wyy-music\src\utils\components.js
 * @Description: 
 */
import Mtag from '@/components/common/Mtag.vue'
import Panel from '@/components/common/Panel.vue'
import PlayBtn from '@/components/common/PlayBtn.vue'
import Pagination from '@/components/common/Pagination.vue'
export default (Vue) => {
  Vue.component(Mtag.name, Mtag)
  Vue.component(Panel.name, Panel)
  Vue.component(PlayBtn.name, PlayBtn)
  Vue.component(Pagination.name, Pagination)
}