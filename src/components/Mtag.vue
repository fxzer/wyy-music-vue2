<template>
   <span class="m-tag">{{content}}</span>
</template>

<script>
export default {
  name: 'Mtag',
  props: {
    content: {
      type: String,
      default: 'SQ'
    },
  },
  data () {
    return {

    }
  },
}
</script>
<style scoped lang='scss'>
.m-tag{
  display: inline-block;
  vertical-align:middle;
  text-align: center;
  height: 16px;
  line-height: 16px;
  font-size: 10px;
  border:1px solid #EC4141;
  color: #EC4141;
  border-radius: 3px;
  transform: scale(.9);
  margin-right:4px;
}
 
</style>