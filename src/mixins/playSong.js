import { mapState,mapActions,mapMutations } from "vuex";
export default { 
  data(){
     return {
     }
  },
  computed:{
    ...mapState('player',['curSongList']),
  },
  methods: {
    ...mapMutations('player', ['addSong']),
    ...mapActions('player',['getSongUrl']),
    playSong(song) {
      this.debounce(this.getSongUrl(song.id,song),500);
    },
    palyAll(){
      this.addSong(this.curSongList)
    },
    debounce(fn, delay) {
      const delays = delay || 300;
      let timer;
      return function () {
        const th = this;
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          timer = null;
          fn.apply(th, args);
        }, delays);
      };
    },
  }
}