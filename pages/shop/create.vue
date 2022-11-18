<template>
  <g-body>
    <view class="flex-col align-center justify-center p-tb-50">
      <view class="bg-fff card">
        <view class="flex-col justify-center p-15">
          <text class="text-15 font-bold">{{$t('login.title')}}</text>
        </view>
        <view class="p-15">
          <uni-forms ref="valiForm" :modelValue="formData" :rules="rules" labelPosition="top">
            <uni-forms-item name="shop" :label="$t('placeholder.shop')" :required="true">
              <uni-easyinput v-model="formData.shop" :placeholder="$t('placeholder.shop')" />
            </uni-forms-item>
            <uni-forms-item name="email" :label="$t('placeholder.email')" :required="true">
              <uni-easyinput v-model="formData.email" :placeholder="$t('placeholder.email')" />
            </uni-forms-item>
            <uni-forms-item name="id_front" :label="$t('placeholder.id_front')" :required="true">
              <uni-file-picker v-model="formData.id_front" :auto-upload="false" returnType="object" :limit="1"
                file-mediatype="all" :list-styles="liststyle" @select="select" />
              <!-- <uni-easyinput v-model="formData.id_front" :placeholder="$t('placeholder.id_front')" /> -->
              <!-- <view class="">
                <button type="default">{{$t('create.choice')}}</button>
              </view> -->
            </uni-forms-item>
            <uni-forms-item name="id_back" :label="$t('placeholder.id_back')" :required="true">
              <!-- <uni-easyinput type="file" v-model="formData.id_back" :placeholder="$t('placeholder.id_back')" /> -->
              <uni-file-picker v-model="formData.id_back" :auto-upload="false" returnType="object" :limit="1"
                file-mediatype="all" :list-styles="liststyle" @select="select" />
            </uni-forms-item>
            <uni-forms-item name="username" :label="$t('placeholder.username')" :required="true">
              <uni-easyinput v-model="formData.username" :placeholder="$t('placeholder.username')" />
            </uni-forms-item>
            <uni-forms-item name="address" :label="$t('placeholder.address')" :required="true">
              <uni-easyinput v-model="formData.address" :placeholder="$t('placeholder.address')" />
            </uni-forms-item>
          </uni-forms>
          <button type="warn" @click="submit()">{{$t('login.title')}}</button>
        </view>
      </view>
    </view>
  </g-body>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          shop: '',
          email: '',
          id_front: {},
          id_back: {},
          username: '',
          address: ''
        },
        liststyle: {
          "dividline": false
        }
      }
    },
    computed: {
      rules() {
        return {}
      }
    },
    methods: {
      select(e) {
        console.log(e);
      },
      submit() {}
    }
  }
</script>

<style>

</style>
