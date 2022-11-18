<template>
  <view class="bg-fff">
    <view class="border-t border-b">
      <uni-row class="container">
        <navigator :url="item.url" v-for="(item,index) in group" :key="index">
          <uni-col :sm="12" :md="6" class="p-24 flex-col justify-center align-center border">
            <uni-icons custom-prefix="iconfont" :type="item.icon" size="40" color="#e62e04"></uni-icons>
            <text class="m-tb-8">{{item.title}}</text>
          </uni-col>
        </navigator>
      </uni-row>
    </view>
    <view class="bg-111723">
      <view class="p-tb-50">
        <uni-row class="container">
          <uni-col :md="10" :lg="8" class="m-t-20 flex-col justify-center align-center">
            <image src="https://chsoop.pfthvas.club/public/uploads/all/zfmZgNkxeckruBw7QzaNQZaccPosBhcWEZAqoOJW.png"
              mode="" class="logo"></image>
            <view class="max-w-300 flex-row align-center m-tb-20">
              <view class="p-10 min-w-150 bg-fff radius-4 h-20">
                <input type="text" class="" :value="word" :placeholder="$t('placeholder.email')" @input="input"
                  @blur="isinput=false" @focus="input" />
              </view>
              <view class="bg-e62e04 w-69 center radius-4 line-40">
                <text class="color-fff">{{$t('login.subscribe')}}</text>
              </view>
            </view>
            <view class="">
              <image src="https://chsoop.pfthvas.club/public/assets/img/play.png" mode="" class="brand m-r-10"></image>
              <image src="https://chsoop.pfthvas.club/public/assets/img/app.png" mode="" class="brand m-l-4"></image>
            </view>
          </uni-col>
          <uni-col :sm="4" :md="2" class="m-t-20 text-sm-center"></uni-col>
          <uni-col :sm="8" :md="6" class="m-t-20 text-sm-center">
            <view class="m-b-20">
              <text class="color-fff">
                {{$t('mine.detail')}}
              </text>
            </view>
            <view class="m-b-10" v-for="(item,index) in detail" :key="index">
              <view class=""><text class="color-f-5">{{item.title}}:</text></view>
              <text class="color-f-7">{{item.value}}</text>
            </view>
          </uni-col>
          <uni-col :sm="4" :md="2" class="m-t-20 text-sm-center"></uni-col>
          <uni-col :sm="8" :md="4" class="m-t-20 text-sm-center">
            <view class="m-b-20">
              <text class="color-fff">
                {{$t('mine.account')}}
              </text>
            </view>
            <view class="m-b-10" v-for="(item,index) in account" :key="index">
              <navigator :url="item.url" v-if="item.show">
                <text class="m-tb-8 color-f-5">{{item.title}}</text>
              </navigator>
            </view>
          </uni-col>
        </uni-row>
      </view>
      <view class="text-end p-15 text-sm-center">
        <image src="https://chsoop.pfthvas.club/public/uploads/all/2pa1XwhAPf2KPeCw45Xxyv1M6aZo1ZfsJP2YZOvR.png" mode=""
          class="h-30"></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "g-footer",
    data() {
      return {
        islogin: false,
        word: '',
      };
    },
    computed: {
      group() {
        return [{
            icon: "icon-file-text",
            url: "/pages/terms/terms",
            title: this.$t('terms.title')
          },
          {
            icon: "icon-reply",
            url: "/pages/policy/return",
            title: this.$t('policy.return')
          },
          {
            icon: "icon-support",
            url: "/pages/policy/support",
            title: this.$t('policy.support')
          },
          {
            icon: "icon-exclamation-circle",
            url: "/pages/policy/privacy",
            title: this.$t('policy.privacy')
          }
        ]
      },
      account() {
        return [{
            url: "/pages/users/login",
            title: this.$t('login.title'),
            show: !this.islogin,
          },
          {
            title: this.$t('login.logout'),
            show: this.islogin,
          },
          {
            url: "/pages/history/purchase",
            title: this.$t('history.purchase'),
            show: true,
          },
          {
            url: "/pages/mine/wishlists",
            title: this.$t('wishlists.mine'),
            show: true,
          },
          {
            url: "/pages/order/track",
            title: this.$t('order.track'),
            show: true,
          },
        ]
      },
      detail() {
        return [{
            title: this.$t('login.address'),
            value: "qwe"
          },
          {
            title: this.$t('login.phone'),
            value: "185123"
          },
          {
            title: this.$t('login.email'),
            value: "123@gmail.com"
          }
        ]
      }
    },
  }
</script>

<style scoped>
  .logo {
    width: 270px;
    height: 44px;
  }

  .brand {
    width: 135px;
    height: 40px;
  }
</style>
