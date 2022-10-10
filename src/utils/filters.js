/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-10 22:12:47
 * @FilePath: \vue-wyy-music\src\utils\filters.js
 * @Description: 
 */
import { playCount } from './playCount'
export function registerFilters(Vue){
  Vue.filter('playCountFilter',playCount )
}