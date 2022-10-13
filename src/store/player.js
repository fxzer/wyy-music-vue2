/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-13 21:12:18
 * @FilePath: \vue-wyy-music\src\store\player.js
 * @Description: 
 * 1.点击音乐,获取到音乐的id,然后触发action根据id获取到音乐的信息
 * 2.将音乐信息存储到state中,然后将音乐信息传递给播放器组件
 * 3.播放器组件根据音乐信息,播放音乐
 */
import http from '../network/request'
let initVolume = parseInt(localStorage.getItem('volume')) || 60
export default {
  namespaced: true,
  state: {
    audio:new Audio(),//创建一个audio对象
    loopType:0,//0:列表循环 1:单曲循环 2:随机播放
    playing: false, //是否正在播放
    playList: [], //播放列表
    volume:  initVolume, //音量
    // currentTime: 0, //当前播放时间
    duration: 0, //总时长
    id: 0, //当前播放音乐的id
    song:{
      id:'',
      name:'',
      picUrl:'',
      singer:'',
      url:'',
    },//当前播放的歌曲
    songUrlData:{},//当前播放的歌曲的数据
    songDetail:{},//当前播放的歌曲的详情
    url: '', //当前播放歌曲url
  },
  getters:{
    currentTime(state){ //当前播放时间
      return state.audio.currentTime
    },
    isPlaying(state){
      return state.playing
    },
    totalDt(state){
      if(state.songDetail.songs) return state.songDetail.songs[0].dt
      return 0
    }
  },
  mutations: {
    init(state){
      state.audio.volume = state.volume / 100;
    },
    setAudioTime(state,currentTime){
      state.audio.currentTime =  currentTime ;
    },
    setPalyState(state,playing){
      state.playing = playing
      state.audio.pause()
    },
    play(state){
      
    },
    pause(state){
      state.audio.pause()
    },
    //保存歌曲url数据
    setSongData(state,data){
      state.songUrlData = data[0]
      state.id = data[0].id
      state.url = state.audio.src = data[0].url
      state.audio.play().then(()=>{
        state.playing = true
      })
    },
    //保存歌曲详情
    setSongDetail(state,data){
      state.songDetail = data 
      let {id, name, ar, al:{picUrl} ,dt,alia} = data.songs[0]
      state.song = {id,name,picUrl,ar,dt ,alia}
    },
    initPaly(state){
      // if(!state.playing){
        state.playing = true
        state.audio.play()
    }
  },
  actions: {
    //根据id获取音乐Url
    async getSongUrl({commit,dispatch},id){
      const { data } = await http(`/song/url?id=${id}`)
      const songDetail = await  http(`/song/detail?ids=${id}`)
      commit('setSongData',data)
      commit('setSongDetail',songDetail)
      commit('initPaly')
    },
  },
}