<template>
  <view class="relative h-50" v-if="ad&&show">
    <navigator url="/pages/home/home" open-type="reLaunch">
      <image src="https://chsoop.robinhoodproz.com/public/uploads/all/NTXFciMMYNxoYhJJggI7wnKQ3laRlnUPQbGRTTW5.png"
        mode="center" class="h-47 w"></image>
    </navigator>
    <uni-icons type="closeempty" class="absolute-top-right z-1 center p-10" color="#fff" size="28" @click="close">
    </uni-icons>
  </view>
</template>

<script>
  export default {
    name: "g-ad",
    props: {
      ad: {
        type: Boolean,
        default: true
      }
    },
    created() {
      this.show = uni.getStorageSync('ad') > new Date().getTime() ? false : true
    },
    data() {
      return {
        show: null
      };
    },
    methods: {
      close() {
        this.show = false
        uni.setStorageSync('ad', (new Date().getTime() + 3600 * 1000))
      }
    },
  }
</script>

<style>

</style>
