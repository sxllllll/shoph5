<template>
  <view>
    <g-header></g-header>
    <slot></slot>
    <g-footer></g-footer>
    <g-tabbar></g-tabbar>
  </view>
</template>

<script>
  export default {
    name: "g-body",
    props: {

    },
    data() {
      return {

      };
    }
  }
</script>

<style>

</style>
