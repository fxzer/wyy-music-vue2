/*
 * @Author: FXJ
 * @LastEditTime: 2022-10-13 21:12:18
 * @FilePath: \vue-wyy-music\src\store\player.js
 * @Description:
 * 1.点击音乐,获取到音乐的id,然后触发action根据id获取到音乐的信息
 * 2.将音乐信息存储到state中,然后将音乐信息传递给播放器组件
 * 3.播放器组件根据音乐信息,播放音乐
 */
import http from "../network/request";
let audioMuted = localStorage.getItem("audioMuted") == "false" ? false : true;
let initVolume = parseInt(localStorage.getItem("audioVolume")) || 60;
export default {
  namespaced: true,
  state: {
    audio: null, // audio对象
    volume: initVolume, //音量
    muted: audioMuted, //是否静音
    id: 0, //当前播放音乐的id
    url: "", //当前播放歌曲url
    loopType: 0, //0:列表循环 1:单曲循环 2:随机播放
    playing: false, //是否正在播放
    playList: [], //播放列表
    songList: [], //当前歌单列表
    songDetail: {}, //当前播放的歌曲的详情
    curSongListId: "", //当前歌单id
    curSongList: [], //当前歌单
  },
  getters: {
    totalDt(state) {
      return state.songDetail.dt || state.songDetail?.songs[0]?.dt || 0;
    },
  },
  mutations: {
    init(state, audioDom) {
      state.audio = audioDom; //dom
      state.audio.volume = audioMuted ? 0 : state.volume / 100; //音量
      state.playing = false; //状态
      state.audio.loop = state.loopType === 1 ? true : false; //模式
    },
    setVolume(state, volume) {
      state.volume = volume;
      state.audio.volume = volume / 100;
      localStorage.setItem("audioVolume", volume);
    },
    setMuted(state) {
      let maybeMuted = !state.muted;
      state.muted = maybeMuted;
      state.audio.muted =maybeMuted;
      state.audio.volume = maybeMuted ? 0 : state.volume / 100;
      localStorage.setItem("audioMuted", maybeMuted);
    },
    setAudioTime(state, currentTime) {
      state.audio.currentTime = currentTime;
    },
    setPalyState(state, playState) {
      state.playing = playState; //true:播放 false:暂停
      if (playState) {
        if (!state.audio.src) {
          state.audio.src = state.url;
        }
        state.audio.play();
      } else {
        state.audio.pause();
      }
    },
    setLoopType(state, type) {
      state.loopType = type;
      if (type === 1) {//单曲循环
        state.audio.loop = true;
      } else {
        state.audio.loop = false;
      }
    },
    //保存歌曲url数据
    setSongUrl(state,  data) {
      state.id = data[0].id;
      state.url = state.audio.src = data[0].url;
    },
    //保存歌曲详情
    setSongDetail(state, data) {
      state.songDetail = data;
    },
    // 添加歌曲到播放列表
    addSong(state, songs) {
      if (Array.isArray(songs)) {
        //去重
        let plids = state.playList.map((item) => item.id);
        
        songs =  songs.filter(song => plids.indexOf(song.id) === -1) 
        
        state.playList.unshift(...songs);
      } else {
        let isExist = state.playList.some((item) => item.id === songs.id);
        if (!isExist) {
          //不存在
          state.playList.unshift(songs);
        }
      }
    },
    clearPlayList(state) {
      state.playList = [];
      state.audio.pause();
      state.playing = false;
    },
    setCurSLId(state, id) {
      state.curSongListId = id;
    },
    setCurSL(state, list) {
      state.curSongList = list;
    },
  },
  actions: {
    //根据id获取音乐Url
    async getSongUrl({ commit, dispatch }, id, songDetail = {}) {
      const { data } = await http(`/song/url?id=${id}`);
      
      if (!Object.keys(songDetail).length) {
        songDetail = await http(`/song/detail?ids=${id}`);
      }
      commit("setSongUrl", data);
      commit("setSongDetail", songDetail.songs[0]);
      commit("addSong", songDetail.songs[0]);
    },
  },
};
