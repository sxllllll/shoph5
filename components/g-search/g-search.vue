<template>
  <view class="border-b">
    <uni-row class="flex-row justify-between align-center container">
      <uni-col :lg="6" class="flex-row justify-between align-center">
        <view class="p-tb-20">
          <image src="https://chsoop.pfthvas.club/public/uploads/all/zfmZgNkxeckruBw7QzaNQZaccPosBhcWEZAqoOJW.png"
            mode="" class="image"></image>
        </view>
      </uni-col>
      <uni-col class="md-block z-100">
        <view class="flex-row justify-end align-center" @click="show=true">
          <uni-icons type="search" size="26"></uni-icons>
        </view>
      </uni-col>
      <view class="relative search p-lr-15" :class="show?'active':''">
        <view class="flex-row justify-between align-center p-tb-20">
          <view class="flex-row justify-center align-center" @click="show=false">
            <uni-icons type="arrow-left" size="28" class="p-r-10"></uni-icons>
          </view>
          <uni-data-select class="max-w-150 h-47" v-model="value" :localdata="select" @change="change" :clear="false">
          </uni-data-select>
          <view class="h-40 flex-row justify-between align-center border radius-4">
            <view class="p-10 min-w-150">
              <input type="text" :value="word" :placeholder="$t('placeholder.buy')" @input="input" @blur="isinput=false"
                @focus="input" />
            </view>
            <view class="md-none h-40 bg-e62e04 w-69 center line-40">
              <uni-icons type="search" size="26" color="#fff"></uni-icons>
            </view>
          </view>
        </view>
        <view class="absolute w bg-fff z-100" v-show="isinput">
          <uni-load-more status="loading" v-show="isloading" />
          <view class="flex-row justify-end align-center p-tb-4 p-lr-8 bg-eef0f2">
            <text class="text-12 color-6c757d">{{$t('index.commodity')}}</text>
          </view>
          <uni-list>
            <uni-list-chat title="123" note="$2222" :isPrice="true" avatar=""></uni-list-chat>
            <uni-list-chat title="123" note="$2222" :isPrice="true" avatar=""></uni-list-chat>
          </uni-list>
          <view class="flex-row justify-end align-center p-tb-4 p-lr-8 bg-eef0f2">
            <text class="text-12 color-6c757d">{{$t('index.shop')}}</text>
          </view>
          <uni-list>
            <uni-list-chat title="123avfvtrr" note="11111" avatar=""></uni-list-chat>
            <uni-list-chat title="123" note="1235" avatar="">
            </uni-list-chat>
          </uni-list>
        </view>
      </view>
      <view class="md-none">
        <view class="flex-row w-69">
          <uni-icons type="loop" size="26"></uni-icons>
          <view class="flex-col justify-center align-center">
            <uni-badge text="0"></uni-badge>
            <text class="lg-none">{{$t('compare.title')}}</text>
          </view>
        </view>
      </view>
      <view class="md-none">
        <view class="flex-row w-69">
          <uni-icons type="heart" size="26"></uni-icons>
          <view class="flex-col justify-center align-center">
            <uni-badge text="0"></uni-badge>
            <text class="lg-none">{{$t('wishlists.title')}}</text>
          </view>
        </view>
      </view>
      <view class="md-none">
        <view class="flex-row w-69">
          <uni-icons type="cart" size="26"></uni-icons>
          <view class="flex-col justify-center align-center">
            <uni-badge text="0"></uni-badge>
            <text class="lg-none">{{$t('cart.title')}}</text>
          </view>
        </view>
      </view>
    </uni-row>
  </view>
</template>

<script>
  export default {
    name: "g-search",
    data() {
      return {
        isinput: false,
        show: false,
        isloading: false,
        value: 'commodity',
        word: '',
      };
    },
    computed: {
      select() {
        return [{
            value: 'commodity',
            text: this.$t('index.commodity')
          },
          {
            value: 'shop',
            text: this.$t('index.shop')
          },
        ]
      }
    },
    methods: {
      change(e) {
        console.log("e:", e);
      },
      input(e) {
        if (e.detail.value != "") {
          this.isinput = true
          this.isloading = true
          // todo
        } else {
          this.isinput = false
          this.isloading = false
        }
      }
    }
  }
</script>

<style scoped>
  .image {
    width: 244px;
    height: 40px;
  }

  .flex-col {
    display: flex !important;
  }

  /deep/ .uni-select__input-text {
    padding: 10px 30rpx;
  }

  /deep/ .uni-select {
    height: 40px;
  }
</style>
