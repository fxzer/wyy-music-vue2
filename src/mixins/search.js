export default {
  data() {
    return {
      kw: "",
      loading: false,
      filterList: [],
      compMap: {
        songs: {
          type:1,
          limit:10
        },
        artists:{
          type:100,
          limit:30,
        },
        playlists:{
          type:1000,
          limit:12,
        },
        lyrics:{
          type:1006,
          limit:10,
        },//歌词(返回结构/字段名和歌曲一样)
        albums: {
          type:10,
          limit:12,
        },
        videos: {
          type:1014,
          limit:10,
        },
        djradios: {
          type:1009,
          limit:10,
        },//电台
        sounds:{
          type:2000,
          limit:10,
        },//声音
        mvs:{
          type:1004,
          limit:10,
        },
        userprofiles: {
          type:1002,
          limit:20,
        },
      },
      // typeToLimit: {
      //   songs: 10,
      //   artists: 30,
      //   playlists: 12,
      //   lyrics:10,//歌词(返回结构/字段名和歌曲一样)
      //   albums: 12,
      //   videos: 10,
      //   djradios: 10,//电台
      //   sounds:10,//声音
      //   mvs:10,
      //   userprofiles: 20,
      // },
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
        compMap,
        $options: { name },
      } = this;
      let { kw } = this.$route.query;
      //用组价名字作为key,获取对应的type值,和对应的数据
      let lname = name.toLowerCase();
      let type = compMap[lname].type;
      if (kw && type) {
        this.kw = kw
        let limit = compMap[lname].limit;
        if(type === 2000){// 声音 
          let { data:{resources=[],totalCount=0}} = await this.$http(`/search?keywords=${kw}&type=${type}&limit=${limit}&offset=${offset}`);
          this.filterList = resources ;
          this.pageOption.total = totalCount
        }else{
          let {  result ={} } = await this.$http(`/cloudsearch?keywords=${kw}&type=${type}&limit=${limit}&offset=${offset}`);
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
        
      
      }
      this.loading = false;
    },
  },
  created() {
    //输出组件名
    this.search();
  },
};
