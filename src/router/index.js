/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-10 21:50:38
 * @FilePath: \vue-wyy-music\src\router\index.js
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import DiscoverMusic from '../views/discoverMusic'
import PersonalRecommend from '../views/personalRecommend'
Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/discoverMusic/personalRecommend' },
    {
        path: '/discoverMusic',
        // name: 'DiscoverMusic',
        component: DiscoverMusic,
        children: [
            // 二级路由重定向
            { path: '/', redirect: { name: 'PersonalRecommend' } },
            {
                path: 'personalRecommend',
                name: 'PersonalRecommend',
                component: PersonalRecommend,
            },
            {
                path: 'customMusic',
                name: 'CustomMusic',
                component: () =>
                    import ('@/views/customMusic'),
            },
            {
                path: 'songList',
                name: 'SongList',
                component: () =>
                    import ('@/views/songList'),
            },
            {
                path: 'leaderBoard',
                name: 'LeaderBoard',
                component: () =>
                    import ('@/views/leaderBoard'),
            },
            {
                path: 'singers',
                name: 'Singers',
                component: () =>
                    import ('@/views/singers'),
            },
            {
                path: 'latestMusic',
                name: 'LatestMusic',
                component: () =>
                    import ('@/views/latestMusic'),
            },

        ]
    },
    {
        path: '/discoverVideo',
        name: 'DiscoverVideo',
        component: () =>
            import ('@/views/discoverVideo')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router