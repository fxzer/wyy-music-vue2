/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-15 16:08:50
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
export function formatDuration (duration,isMs=true) {
    if(!duration) return '00:00'
    if(isMs) duration = duration / 1000
    const min = Math.floor(duration / 60)
    const sec = Math.floor(duration % 60)
    let minStr = min < 10 ? '0' + min : min
    let secStr = sec < 10 ? '0' + sec : sec
    return  minStr + ':' + secStr
}
// 将时间戳转为日期
export function formatTime(input, format = 'yyyy-MM-dd hh:mm:ss') {
  const date = new Date(input);
  if (String(date) === 'Invalid Date') {
    return '';
  }
  const makeReg = (value) => new RegExp(`${value}`);
  const keys = ['M+', 'd+', 'h+', 'm+', 's+', 'q+', 'S'];
  const values = [
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    Math.floor((date.getMonth() + 3) / 3),
    date.getMilliseconds()
  ];
  if (/(y+)/.test(format)) {
    format = format.replace(/(y+)/, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let len = 0, key, val;
  while (len < keys.length) {
    key = keys[len];
    val = values[len];
    if (makeReg(key).test(format)) {
      format = (format).replace(makeReg(key), (RegExp.$1.length === 1) ? val : ('00' + val).substr(('' + val).length));
    }
    len++;
  }
  return format;
}