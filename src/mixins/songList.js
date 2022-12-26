import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations("player", ["addSong", "setCurSLId", "setCurSL"]),
    //获取歌单所有歌曲
    async getSongListDetail(id) {
      const { songs } = await this.$http(
        `/playlist/track/all?id=${id}&limit=15&offset=${this.offset}`
      );
      return songs;
    },
    //添加所有歌曲到播放列表
    addSongToList(id) {
      this.getSongListDetail(id).then((songs) => {
        this.setCurSLId(id);
        this.setCurSL(songs);
        this.addSong(songs);
      });
    },
    //跳转到歌单详情页
    toSongListDetail(id) {
      console.log('id: ', id);
      this.$router.push({ path: `/discoverMusic/songListDetail/${id}` });
    },
  },
};
