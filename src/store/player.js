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
let initVolume = parseInt(localStorage.getItem('audioVolume')) || 60
export default {
  namespaced: true,
  state: {
    audio:null,// audio对象
    volume:  initVolume, //音量
    id: 0, //当前播放音乐的id
    url: '', //当前播放歌曲url
    duration: 0, //总时长

    loopType:0,//0:列表循环 1:单曲循环 2:随机播放
    playing: false, //是否正在播放
    playList: [], //播放列表
    // currentTime: 0, //当前播放时间

    song:{
      id:'',
      name:'',
      picUrl:'',
      singer:'',
      url:'',
    },//当前播放的歌曲
    songUrlData:{},//当前播放的歌曲的数据
    songDetail:{},//当前播放的歌曲的详情
   
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
    },
    
  },
  mutations: {
    init(state,audioDom){
      state.audio = audioDom
      state.audio.volume = state.volume / 100;
      state.playing = false
      state.audio.loop = state.loopType === 1 ? true : false;
    },
    setVolume(state, volume) {
      state.volume = volume;
      state.audio.volume = volume / 100;
      localStorage.setItem('audioVolume', volume);
    },
    setAudioTime(state,currentTime){
      state.audio.currentTime =  currentTime ;
    },
    setPalyState(state,playState){
      state.playing = playState
      if(playState){
        if(!state.audio.src){
          state.audio.src = state.url
        }
        state.audio.play()
      }else{
        state.audio.pause()
      }
    },
    setLoopType(state,type){
      state.loopType = type
      if(type === 1){
        state.audio.loop = true
      }else{
        state.audio.loop = false
      }
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
    startPlay(state){
      if(!state.playing){
        state.playing = true
        state.audio.play()
      }
    },
    // 添加歌曲到播放列表
    addSong(state,songs) {
      if(Array.isArray(songs)){
        state.playList.unshift(...songs)
      }else{
        let isExist = state.playList.some(item=>item.id === songs.id) 
        if(!isExist){//不存在
          state.playList.unshift(songs)
        }
      }
      let first = state.playList[0]
      if(state.id === first.id){
        state.playing = true
        state.audio.play()
      } 
  },
  clearPlayList(state){
    state.playList = []
    state.audio.pause()
    state.playing = false
  }
},
  actions: {
    //根据id获取音乐Url
    async getSongUrl({commit,dispatch},id,songDetail= {}){
      const { data } = await http(`/song/url?id=${id}`)
      if(!Object.keys(songDetail).length){
        songDetail = await  http(`/song/detail?ids=${id}`)
      }
      commit('setSongData',data)
      commit('setSongDetail',songDetail)
      commit('startPlay')
      commit('addSong',songDetail.songs[0])
    },
  },
}