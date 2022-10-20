<template>
  <div >
    <!-- <PlayerVideo  :src="src" :volume="volume"    ref="playerVideoRef"/> -->
  </div>
</template>

<script>

export default {
  name: 'VideoTest',
  props: {
  },
  data () {
    return {
      volume:0.5,
      src:'http://vodkgeyttp8.vod.126.net/cloudmusic/3793/core/de43/667c55c652dbc078566ca5b4447a6e7b.mp4?wsSecret=665923e5ec15ee78a6b72a6c9cc45d8b&wsTime=1666274328'
    }
  },
  computed: { 

  },
  watch: { 

  },
  components: { 
    // PlayerVideo: () => import('./PlayerVideo.vue')
  },
  methods: {
  },  
  created () { 
    this.volume = parseFloat(window.localStorage.volume);
  },
  mounted () { 
  },
  beforeCreate() {
  },
}
</script>
<style scoped lang='scss'>
</style>