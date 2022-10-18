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
  vertical-align:top;
  text-align: center;
  height: 16px;
  line-height: 14px;
  font-size: 10px;
  border:1px solid #EC4141;
  color: #EC4141;
  border-radius: 3px;
  transform: scale(.88);
  margin-right:4px;
  padding: 0 1px;
}
 
</style>