/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 15:23:36
 * @FilePath: \vue-wyy-music\src\router\index.js
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import DiscoverMusic from '../views/discoverMusic'
import PersonalRecommend from '../views/personalized'
Vue.use(VueRouter)


const routes = [
    { path: '/', redirect: '/discoverMusic/personalized' },
    // { path: '/', redirect: '/videoTest' },
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
        component: () => import ('@/views/discoverVideo'),
        children: [
            { path: '/', redirect: { name: 'MvList' } },
            {
                path: 'mvList',
                name: 'MvList',
                component: () => import ('@/views/discoverVideo/components/MvList'),
            },
            {
                path:'mvDetail/:id',
                name:'MvDetail',
                component:()=>import('@/views/discoverVideo/components/MvDetail')
            },
            {
                path:'allMvList',
                name:'AllMvList',
                component:()=>import('@/views/discoverVideo/components/AllMvList')
            },
            {
                path:'mvRankList',
                name:'MvRankList',
                component:()=>import('@/views/discoverVideo/components/MvRankList')
            }
        ]
    },
    {
        path:'/searchResult',
        name:'SearchResult',
        component:()=>import('@/views/searchResult'),
        children:[
            {
                path: 'songs',
                name: 'Songs',
                component: () => import('@/views/searchResult/components/Songs'),
            },
            {
                path: 'artists',
                name: 'Artists',
                component: () => import('@/views/searchResult/components/Artists'),
            },
            {
                path: 'albums',
                name: 'Albums',
                component: () => import('@/views/searchResult/components/Albums'),
            },
            {
                path: 'playlists',
                name: 'Playlists',
                component: () => import('@/views/searchResult/components/Playlists'),
            },
            {
                path: 'videos',
                name: 'videos',
                component: () => import('@/views/searchResult/components/Videos'),
            },
            {
                path: 'djRadios',
                name: 'DjRadios',
                component: () => import('@/views/searchResult/components/DjRadios'),
            },
            {
                path: 'sounds',
                name: 'Sounds',
                component: () => import('@/views/searchResult/components/Sounds'),
            },
            {
                path: 'userProfiles',
                name: 'UserProfiles',
                component: () => import('@/views/searchResult/components/UserProfiles'),
            },
            {
                path: 'lyrics',
                name: 'Lyrics',
                component: () => import('@/views/searchResult/components/Lyrics'),
            },
            {
                path: 'mvs',
                name: 'Mvs',
                component: () => import('@/views/searchResult/components/Mvs'),
            },

        ]
    },
    {
        path: '/videoTest',
        name: 'VideoTest',
        component: () => import('@/views/videoTest'),
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default router