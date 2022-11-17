<template>
  <view class="">
    <view class="fixed w bg-fff">
      <view class="flex-row justify-center align-center h-50">
        <view class="flex-1" v-for="(item,index) in tabbar" :key="index">
          <navigator :url="item.url" class="text-center">
            <view class="flex-col justify-center align-center relative" v-if="item.isBump">
              <view class="bg-e62e04 h-40 w-40 circle flex-col justify-center align-center border-f-4">
                <uni-icons custom-prefix="iconfont" :type="item.icon" size="20" color="#fff"></uni-icons>
              </view>
              <view class="">
                <text class="text-12">{{item.title}}</text>
              </view>
            </view>
            <view class="p-tb-10" v-else>
              <uni-icons custom-prefix="iconfont" :type="item.icon" size="20"></uni-icons>
              <view class="">
                <text class="text-12">{{item.title}}</text>
              </view>
            </view>
          </navigator>
        </view>
      </view>
    </view>
    <view class="h-50"></view>
  </view>
</template>

<script>
  export default {
    name: "g-tabbar",
    data() {
      return {

      };
    },
    computed: {
      tabbar() {
        return [{
            url: "/pages/home/home",
            icon: "icon-Home",
            title: this.$t('home.title'),
            isBump: false
          },
          {
            url: "/pages/category/category",
            icon: "icon-list",
            title: this.$t('category.title'),
            isBump: false
          },
          {
            url: "/pages/cart/cart",
            icon: "icon-shopping",
            title: this.$t('cart.title'),
            isBump: true
          },
          {
            url: "/pages/notice/notice",
            icon: "icon-bell",
            title: this.$t('notice.title'),
            isBump: false
          }, {
            icon: "icon-User",
            title: this.$t('mine.title'),
            isBump: false
          }
        ]
      }
    },
  }
</script>

<style scoped>
  .fixed {
    bottom: 0;
  }

  .border-f-4 {
    border: 4px solid #fff;
    box-shadow: 0px -5px 10px rgb(0 0 0 / 15%);
  }

  .relative {
    top: -10px;
  }
</style>
