export default {
  data() {
    return {
      loading: false,
      compToType: {
        Songs: 1,
        Artists: 100,
        Albums: 10,
        Playlists: 1000,
      },
    };
  },
  methods: {
    //当前页变化
    handleCurrentChange(current) {
      this.currentChange(current);
      this.search();
    },
    async search() {
      this.loading = true;
      let {
        offset,
        compToType,
        $options: { name },
      } = this;
      let { kw } = this.$route.query;
      let type = compToType[name];
      if (kw) {
        let {
          result: { songs = [], songCount = 0 ,artists = [], artistCount = 0,playlists = [], playlistCount = 0},
        } = await this.$http(
          `/cloudsearch?keywords=${kw}&type=${type}&limit=10&offset=${offset}`
        );
        this[name.toLowerCase()] = name === 'Songs' ? songs : name === 'Artists' ? artists : playlists;
        this.pageOption.total = songCount;
      }
      this.loading = false;
    },
  },
  created() {
    //输出组件名
    this.search();
  },
};
