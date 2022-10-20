export default {
  namespaced: true,
  state: {
    kw: '', //搜索关键字
    historyList: [], //关键字历史记录
    searchPanelVisible: false, //是否显示搜索面板
  },
  getters:{
    getKw(state){
      return state.kw
    }
  },
  mutations: {
    setKw(state,kw){
      state.kw = kw
    },
    addOne(state,kw){
      let index = state.historyList.indexOf(kw)
      if(index > -1){
        state.historyList.splice(index,1)
      }
      state.historyList.unshift(kw)
    },
    deleteOne(state,index){
      state.historyList.splice(index,1)
    },
    deleteAll(state){
      state.historyList = []
    },
    setSearchPanel(state,value){
      state.searchPanelVisible = value
    }
  },
  actions: {
  },
}