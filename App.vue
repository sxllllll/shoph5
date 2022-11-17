<script>
  export default {
    globalData: {},
    onLaunch: function() {
      uni.setStorageSync('ad', (new Date().getTime() - 1000))
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    },
    methods: {},
  }
</script>

<style lang="scss">
  @import '@/static/css/common.css';

  page {
    background-color: #f2f3f8;
  }
</style>
