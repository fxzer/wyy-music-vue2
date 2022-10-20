/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 20:52:08
 * @FilePath: \vue-wyy-music\src\main.js
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './network/request'
import vuescroll from 'vuescroll'
import { registerFilters } from './utils/filters'
import  registerComponents  from './utils/components'
//视频播放
// import VueCoreVideoPlayer from 'vue-core-video-player'
// Vue.use(VueCoreVideoPlayer,{
//         lang: 'zh-CN'
// })
import VueDPlayer from 'vue-dplayer'
import "vue-dplayer/dist/vue-dplayer.css";
//关闭开发提示
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueDPlayer);
Vue.use(vuescroll, {
    ops: {
        bar: {
            background: '#E0E0E0'
        }
    },
    name: 'vuescroll'
})
registerFilters(Vue)
registerComponents(Vue)
Vue.prototype.$http = http
new Vue({
    router,
    store,
    //$bus
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    render: h => h(App)
}).$mount('#app')