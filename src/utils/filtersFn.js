/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-12 15:49:37
 * @FilePath: \vue-wyy-music\src\utils\filtersFn.js
 * @Description: 
 */
// 将播放量转为万/亿
export  function playCount(count) {
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万'
  } else {
    return Math.floor(count / 10000000) / 10 + '亿'
  }
}
//转化时长
export function formatTime (duration,isMs=true) {
    if(!duration) return '00:00'
    if(isMs) duration = duration / 1000
    const min = Math.floor(duration / 60)
    const sec = Math.floor(duration % 60)
    let minStr = min < 10 ? '0' + min : min
    let secStr = sec < 10 ? '0' + sec : sec
    return  minStr + ':' + secStr
}