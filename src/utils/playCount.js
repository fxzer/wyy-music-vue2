/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-10 22:10:24
 * @FilePath: \vue-wyy-music\src\utils\playCount.js
 * @Description: 将播放量转为万/亿
 */
export  function playCount(count) {
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万'
  } else {
    return Math.floor(count / 10000000) / 10 + '亿'
  }
}