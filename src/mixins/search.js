export default {
  data() {
    return {
      loading: false,

    }
  },
  methods: {
  },
  created(){
    //输出组件名
    console.log('this: ', this);
    console.log('name:',this.$options.name)
    console.log(this.pageOption)
  }
}