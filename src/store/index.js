/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-11 21:50:24
 * @FilePath: \vue-wyy-music\src\store\index.js
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import player from './player'
import search from './search'
import { Notification } from 'element-ui';
import createPersistedState  from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    copyText(state,text){//复制文本 
      const textarea = document.createElement('textarea')
      textarea.readOnly = 'readonly'
      textarea.style.display = 'absolute'//display:none会导致复制失败
      textarea.style.left = '-9999px'
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      const result = document.execCommand('Copy')
      if(result){
        Notification.success('复制成功')
      }
      document.body.removeChild(textarea)
    },
  },
  actions: {
  },
  modules: {
    player,
    search
  },
  plugins: [createPersistedState({
      // 本地存储的key
      key: 'v-store',
      // 指定需要存储的模块
      paths: ['player', 'search']
  })]
})
