export default {
  data() {
    return {
      loading: false,
      filterList: [],
      compToType: {
        songs: 1,
        artists: 100,
        albums: 10,
        playlists: 1000,
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
      //用组价名字作为key,获取对应的type值,和对应的数据
      let lname = name.toLowerCase();
      let type = compToType[lname];
      if (kw) {
        let {  result ={} } = await this.$http(`/cloudsearch?keywords=${kw}&type=${type}&limit=10&offset=${offset}`);
        this.filterList = result[lname];
        this.pageOption.total = result[lname.slice(0,-1) + "Count"];
      }
      this.loading = false;
    },
  },
  created() {
    //输出组件名
    this.search();
  },
};
