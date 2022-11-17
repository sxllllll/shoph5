<template>
  <g-body>
    <view class="flex-col align-center justify-center">
      <view class="bg-fff max-w-450">
        <view class="">
          <text class="">{{$t('login.title')}}</text>
        </view>
        <uni-forms ref="valiForm" :modelValue="formData" class="p-24">
          <uni-forms-item name="account">
            <uni-easyinput v-model="formData.account" placeholder="电子邮箱" />
          </uni-forms-item>
          <uni-forms-item name="password">
            <uni-easyinput v-model="formData.passwprd" placeholder="请输入年龄" />
          </uni-forms-item>
        </uni-forms>
        <button type="primary" @click="submit('valiForm')">提交</button>
      </view>
    </view>
  </g-body>
</template>

<script>
  export default {
    data() {
      return {
        // 校验表单数据
        formData: {
          account: '',
          password: '',
        },
      }
    },
    methods: {

    }
  }
</script>

<style>

</style>
