/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-15 16:34:00
 * @FilePath: \vue-wyy-music\src\router\index.js
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import DiscoverMusic from '../views/discoverMusic'
import PersonalRecommend from '../views/personalized'
Vue.use(VueRouter)

const routes = [
    // { path: '/', redirect: '/discoverMusic/personalized' },
    { path: '/', redirect: '/discoverMusic/leaderBoard' },
    {
        path: '/discoverMusic',
        // name: 'DiscoverMusic',
        component: DiscoverMusic,
        children: [
            // 二级路由重定向
            { path: '/', redirect: { name: 'PersonalRecommend' } },
            {
                path: 'personalized',
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
                path: 'singerList',
                name: 'SingerList',
                component: () =>
                    import ('@/views/singerList'),
            },
            {
                path: 'latestMusic',
                name: 'LatestMusic',
                component: () =>
                    import ('@/views/latestMusic'),
            },
            {
                path: 'songList/highQuality',
                name: 'HighQuality',
                component: () =>
                    import ('@/views/songList/components/HighQuality'),
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