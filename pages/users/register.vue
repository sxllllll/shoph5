<template>
  <g-body>
    <view class="flex-col align-center justify-center p-tb-50">
      <view class="bg-fff card">
        <view class="flex-col align-center justify-center p-t-20 m-b-10">
          <text class="text-24 font-bold">{{$t('register.title')}}</text>
        </view>
        <view class="p-24">
          <uni-forms ref="valiForm" :modelValue="formData">
            <uni-forms-item name="firstname">
              <uni-easyinput v-model="formData.firstname" :placeholder="$t('placeholder.firstname')" />
            </uni-forms-item>
            <uni-forms-item name="email">
              <uni-easyinput v-model="formData.email" :placeholder="$t('placeholder.email')" />
            </uni-forms-item>
            <uni-forms-item name="password">
              <uni-easyinput type="password" v-model="formData.password" :placeholder="$t('placeholder.password')" />
            </uni-forms-item>
            <uni-forms-item name="repassword">
              <uni-easyinput type="password" v-model="formData.repassword"
                :placeholder="$t('placeholder.confirm-password')" />
            </uni-forms-item>
            <uni-forms-item name="checkbox">
              <view class="flex-row align-center">
                <checkbox :checked="remember" color="#e62e04" style="transform:scale(0.7)" />
                <text class="text-14 color-6c757d">{{$t('register.clause')}}</text>
              </view>
              <view class="flex-col justify-center align-center">
                <navigator url="/pages/users/register" class="color-e62e04 text-14">《Terms & conditions》</navigator>
              </view>
            </uni-forms-item>
          </uni-forms>
          <button type="warn" @click="submit">{{$t('register.title')}}</button>
          <view class="flex-row justify-center align-center m-t-20">
            <view class="m-r-4 flex-col justify-center">
              <text class="text-12 color-6c757d">{{$t('register.account')}}</text>
            </view>
            <navigator url="/pages/users/login" class="color-e62e04 text-12">{{$t('login.title')}}</navigator>
          </view>
        </view>
      </view>
    </view>
  </g-body>
</template>

<script>
  import {
    register
  } from '@/api/index.js'
  export default {
    data() {
      return {
        formData: {
          firstname: '',
          email: '',
          password: '',
          repassword: '',
        },
        remember: true,
      }
    },
    onReady() {
      this.$refs.valiForm.setRules(this.rules)
    },
    computed: {
      rules() {
        let errorMessage = this.$t('placeholder.password') + this.$t('placeholder.atypism')
        return {
          firstname: {
            rules: [{
              required: true,
              errorMessage: this.$t('placeholder.please') + this.$t('placeholder.firstname'),
            }],
          },
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
              },
              {
                minLength: 6,
                errorMessage: this.$t(
                  'placeholder.password_errorLength', {
                    minLength: 6
                  }),
              }
            ],
          },
          repassword: {
            rules: [{
              required: true,
              errorMessage: this.$t('placeholder.please') + this.$t('placeholder.confirm-password'),
            }, {
              validateFunction: (rule, value, data, callback) => {
                if (value != data.password) {
                  callback(errorMessage)
                }
                return true
              }
            }],
          }
        }
      }
    },
    methods: {
      submit() {
        this.$refs.valiForm.validate().then(formData => {
          delete formData.repassword
          // console.log('表单数据信息：', formData);
          register(formData).then(res => {
            console.log(res);
          })
        })
      }
    }
  }
</script>

<style scoped>
  /deep/uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
    border-color: #d1d1d1 !important;
  }
</style>
