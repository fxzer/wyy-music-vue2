export default { 
  data(){
     return {
      headerRowStyle: {
        color: "#666",
        fontSize: "14px",
        fontWeight: "400",
        padding:'5px 0',
        borderColor: "transparent",
      },
     }
  },
  methods: {
    arStr(song){//歌手名字
      return song?.ar?.map(item=>item.name).join('/') || ''
    },
    alStr(song) {//专辑名字
      return song?.al?.name || "";
    },
    dtStr(song) {//时长
      return song?.dt || "";
    },
  }
}