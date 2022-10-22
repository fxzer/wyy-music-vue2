<template>
  <div class="comment-type" v-if="comments.length">
     <div class="comment-title">{{title}}</div>
     <CommentItem v-for="comment in comments" :key="comment.commentId" :comment="comment"/>
  </div>
</template>

<script>
export default {
  name: 'Comments',
  props: {
    title:{
      type:String,
      default:'热门评论'
    },
    comments:{
      type:Array,
      default:()=>[]
    }
  },
  data () {
    return {

    }
  },
  computed: { 

  },
  watch: { 

  },
  components: { 
    CommentItem:()=>import('./CommentItem.vue')
  },
  methods: {

  },
  created () { 

  },
  mounted () { 
      
  },
}
</script>
<style scoped lang='scss'>
.comment-type{
  margin:30px 0;
  .comment-title{
  font-size: 16px;  
  color: #000;
  font-weight: 700;
  margin-bottom: 10px;
}
}

</style>