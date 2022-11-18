<template>
  <g-body>
    <view class="flex-col align-center justify-center p-tb-50">
      <view class="bg-fff card">
        <view class="flex-col align-center justify-center p-t-20 m-b-10">
          <text class="text-24 font-bold">{{$t('login.title')}}</text>
        </view>
        <view class="p-24">
          <uni-forms ref="valiForm" :modelValue="formData" :rules="rules">
            <uni-forms-item name="email">
              <uni-easyinput v-model="formData.email" :placeholder="$t('placeholder.email')" />
            </uni-forms-item>
            <uni-forms-item name="password">
              <uni-easyinput type="password" v-model="formData.password" :placeholder="$t('placeholder.password')" />
            </uni-forms-item>
            <uni-forms-item>
              <view class="flex-row justify-between">
                <view class="flex-row align-center">
                  <checkbox :checked=" remember" color="#e62e04" style="transform:scale(0.7)" />
                  <text class="text-14">{{$t('login.remember')}}</text>
                </view>
                <!-- <text class="text-14">{{$t('login.forgot')}}</text> -->
              </view>
            </uni-forms-item>
          </uni-forms>
          <button type="warn" @click="submit()">{{$t('login.title')}}</button>
          <view class="flex-row justify-center m-t-20">
            <text class="text-12 color-6c757d">{{$t('login.noaccount')}}</text>
            <navigator url="/pages/users/register" class="color-e62e04 text-12">{{$t('login.goregister')}}</navigator>
          </view>
        </view>
      </view>
    </view>
  </g-body>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        formData: {
          email: '',
          password: '',
        },
        remember: false,
      }
    },
    computed: {
      rules() {
        return {
          email: {
            rules: [{
              required: true,
              errorMessage: this.$t('placeholder.please') + this.$t('placeholder.email'),
            }, {
              format: 'email',
              errorMessage: this.$t('placeholder.please') + this.$t('placeholder.true') + this.$t(
                'placeholder.email'),
            }],
          },
          password: {
            rules: [{
              required: true,
              errorMessage: this.$t('placeholder.please') + this.$t('placeholder.password'),
            }]
          },
        }
      }
    },
    methods: {
      ...mapActions(['handleLogin']),
      submit() {
        let _this = this
        console.log(this.handleLogin);
        this.$refs.valiForm.validate().then(formData => {
          _this.handleLogin(formData).then(res => {
            console.log(res, '1111');
          })
        })
      }
    },
  }
</script>

<style scoped>
  /deep/uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
    border-color: #d1d1d1 !important;
  }
</style>
