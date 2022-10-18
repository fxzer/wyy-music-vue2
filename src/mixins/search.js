export default {
  data() {
    return {
      kw: "",
      loading: false,
      filterList: [],
      compToType: {
        songs: 1,
        artists: 100,
        playlists: 1000,
        lyrics:1006,//歌词(返回结构/字段名和歌曲一样)
        albums: 10,
        videos: 1014,
        djradios: 1009,//电台
        sounds:2000,//声音
        mvs:1004,
        userprofiles: 1002,
      },
      typeToLimit: {
        songs: 10,
        artists: 30,
        playlists: 12,
        lyrics:10,//歌词(返回结构/字段名和歌曲一样)
        albums: 12,
        videos: 10,
        djradios: 10,//电台
        sounds:10,//声音
        mvs:10,
        userprofiles: 20,
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
      if (kw && type) {
        this.kw = kw
        let limit = this.typeToLimit[lname];
        if(type === 2000){// 声音 
          let { data:{resources=[],totalCount=0}} = await this.$http(`/search?keywords=${kw}&type=${type}&limit=${limit}&offset=${offset}`);
          console.log('totalCount: ', totalCount);
          this.filterList = resources ;
          this.pageOption.total = totalCount
        }else{
          let {  result ={} } = await this.$http(`/cloudsearch?keywords=${kw}&type=${type}&limit=${limit}&offset=${offset}`);
          console.log('result: ', result);
          if(type === 1006){ // 歌词 
            this.filterList = result.songs;
            this.pageOption.total = result.songCount
          }else if(type === 1009){// 电台 
            this.filterList = result['djRadios'] || [];
            this.pageOption.total = result.djRadiosCount 
          }else{
            this.filterList = result[lname] || [];
            this.pageOption.total = result[lname.slice(0,-1) + "Count"];
          }
        }
        console.log('this.filterList: ', this.filterList);
      
      }
      this.loading = false;
    },
  },
  created() {
    //输出组件名
    this.search();
  },
};
