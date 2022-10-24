/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-14 21:43:26
 * @FilePath: \vue-wyy-music\src\utils\components.js
 * @Description: 
 */
import Mtag from '@/components/Mtag.vue'
import Panel from '@/components/Panel.vue'
import PlayBtn from '@/components/PlayBtn.vue'
import Pagination from '@/components/Pagination.vue'
import PlayerVideo from '@/components/PlayerVideo.vue'
import ContextMenu from '@/components/ContextMenu.vue'
import FirstColState from '@/components/FirstColState.vue'
export default (Vue) => {
  Vue.component(Mtag.name, Mtag)
  Vue.component(Panel.name, Panel)
  Vue.component(PlayBtn.name, PlayBtn)
  Vue.component(Pagination.name, Pagination)
  Vue.component(PlayerVideo.name, PlayerVideo)
  Vue.component(FirstColState.name, FirstColState)
}