<template>
  <view class="border-b">
    <uni-row class="container">
      <uni-col :md="14">
        <view class="flex-row box">
          <view class="flex-row justify-center align-center m-l-4">
            <image src="../../static/logo.png" mode="" class="icon"></image>
            <uni-data-select v-model="lang" :localdata="language" @change="onLocaleChange" :clear="false">
            </uni-data-select>
          </view>
          <view class="flex-row justify-center align-center m-l-4">
            <uni-data-select id="currency" v-model="cur" :localdata="currency" @change="oncurChange" :clear="false">
            </uni-data-select>
          </view>
        </view>
      </uni-col>
      <uni-col :span="10" class="md-none">
        <view class="flex-row justify-end p-lr-15" v-if="islogin">
          <navigator url="/pages/users/login" class="p-lr-15 p-tb-8">
            {{$t('login.title')}}
          </navigator>
          <navigator url="/pages/users/register" class="p-lr-15 p-tb-8 border-l">
            {{$t('register.title')}}
          </navigator>
        </view>
        <view class="flex-row justify-end p-lr-15" v-else>
          <navigator url="/pages/notice/notice" class="p-lr-15 p-tb-8">
            <uni-icons type="notification"></uni-icons>
          </navigator>
          <navigator url="/pages/mine/dashboard" class="p-lr-15 p-tb-8 border-l">
            {{$t('dashboard.title')}}
          </navigator>
          <view class="p-lr-15 p-tb-8 border-l" @click="logout">
            {{$t('login.logout')}}
          </view>
        </view>
      </uni-col>
    </uni-row>
  </view>
</template>

<script>
  export default {
    name: "g-topbar",
    data() {
      return {
        lang: "",
        cur: "",
        islogin: false,
      };
    },
    created() {
      let systemInfo = uni.getSystemInfoSync();
      this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
      let code = uni.getLocale();
      this.lang = code
      let cur = uni.getStorageSync('cur')
      this.cur = cur ? cur : code
    },
    computed: {
      language() {
        return [{
            text: this.$t('locale.en'),
            value: 'en'
          },
          {
            text: this.$t('locale.zh-hans'),
            value: 'zh-Hans'
          },
          {
            text: this.$t('locale.zh-hant'),
            value: 'zh-Hant'
          },
          {
            text: this.$t('locale.ja'),
            value: 'ja'
          }
        ]
      },
      currency() {
        return [{
            text: this.$t('currency.cny'),
            value: 'zh-Hans',
          },
          {
            text: this.$t('currency.usd'),
            value: 'en',
          }
        ]
      }
    },
    methods: {
      onLocaleChange(e) {
        if (this.isAndroid) {
          uni.showModal({
            content: this.$t('index.language-change-confirm'),
            success: (res) => {
              if (res.confirm) {
                uni.setLocale(e);
              }
            }
          })
        } else {
          uni.setLocale(e);
          this.$i18n.locale = e;
        }
      },
      oncurChange(e) {
        uni.setStorageSync('cur', e)
      },
    }
  }
</script>

<style scoped>
  .icon {
    width: 16px;
    height: 11px;
  }

  .box {
    justify-content: space-between;
  }

  @media (min-width: 992px) {
    .box {
      justify-content: flex-start;
    }
  }

  /deep/ .uni-select {
    border: none;
  }

  /deep/ .uni-select__selector {
    min-width: 300rpx;
  }

  /deep/ #currency .uni-select__selector {
    right: 0;
    left: unset;
  }

  /deep/ #currency .uni-popper__arrow {
    right: 10%;
    left: unset;
  }
</style>
