export default {
  namespaced: true,
  state: {
    kw: '', //搜索关键字
  },
  getters:{
  },
  mutations: {
    setKw(state,kw){
      state.kw = kw
    }
  },
  actions: {
  },
}