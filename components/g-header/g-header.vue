<template>
  <view class="bg-fff">
    <g-ad></g-ad>
    <g-topbar></g-topbar>
    <g-search></g-search>
    <g-tabs ref="tab" tipType="none" class="bg-fff container w-auto" @change="change" :tabs="tabs" v-model="tabIndex"
      :isScroll="true" />
  </view>
</template>

<script>
  export default {
    name: "g-header",
    data() {
      return {
        tabIndex: 0,
      };
    },
    computed: {
      tabs() {
        return [
          this.$t('home.title'), this.$t('flash-deals.title'), this.$t('blog.title'),
          this.$t('brands.title'), this.$t('category.all')
        ];
      },
    },
    methods: {
      change(e) {
        console.log(e)
      }
    }
  }
</script>

<style>

</style>
