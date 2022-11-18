import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en.json'
import zhHans from './zh-Hans.json'
import zhHant from './zh-Hant.json'
import ja from './ja.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: uni.getLocale(),
  messages: {
    en,
    'zh-Hans': zhHans,
    'zh-Hant': zhHant,
    ja
  }
})
export default i18n
