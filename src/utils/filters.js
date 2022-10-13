/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-12 15:18:39
 * @FilePath: \vue-wyy-music\src\utils\filters.js
 * @Description: 
 */
import { playCount,formatTime } from './filtersFn'
export function registerFilters(Vue){
  Vue.filter('playCountFilter',playCount )
  Vue.filter('formatTime',formatTime )
}