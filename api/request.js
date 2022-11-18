import i18n from '../locale/index.js'
export default {
  url: 'https://store.metscompany.com',
  isLoading: false,
  loadingTimer: null,
  // 加载中
  showLoading() {
    if (this.isLoading) return;
    this.isLoading = true;
    uni.showLoading({
      mask: true
    });
  },
  // 隐藏加载
  hideLoading() {
    uni.hideLoading();
    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
      this.loadingTimer = null;
    }
    this.loadingTimer = setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  showToast(type = "success") {
    if (type == "success") {
      return uni.showToast({
        icon: "success",
        title: i18n.t('api.success')
      })
    } else {
      return uni.showToast({
        icon: 'none',
        duration: 3000,
        title: i18n.t(`api.${type}`)
      })
    }
  },
  // url是否完整
  durl(url) {
    if (url.indexOf("https://") == -1 && url.indexOf("http://") == -1) {
      url = this.url + url;
    }
    return url;
  },
  // 用户登录凭证
  dparam() {
    let token = uni.getStorageSync('access-token')
    let header = {
      'access-token': token ? token : ''
    }
    return header;
  },
  request({ method, url, data }) {
    let _this = this;
    _this.showLoading()
    return new Promise((resolve, reject) => {
      uni.request({
        url: _this.durl(url),
        data: data,
        header: _this.dparam(),
        method: method,
        success: (response) => {
          _this.hideLoading()
          if (!_this.checkAuthFaild(response.statusCode)) {
            return false;
          }
          if (response.statusCode == 200) {
            let result = response.data
            if (result && result.code) {
              _this.showToast(result.code)
            }
            if (result.code != 200) return false
            resolve(result.data)
          } else {
            console.log(response);
            _this.showToast('error')
          }
        },
        fail: (error) => {
          _this.hideLoading()
          reject(error);
          _this.showToast('request_error')
          console.error(error);
        },
      })
    })
  },
  upload({ url, file }) {
    let _this = this;
    _this.showLoading()
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        header: _this.dparam(),
        url: _this.durl(url),
        filePath: file,
        name: 'file',
        success: (response) => {
          _this.hideLoading()
          if (!_this.checkAuthFaild(response.statusCode)) {
            return false;
          }
          if (response.statusCode == 200) {
            if (response.data && response.data.code) {
              _this.showToast(response.data.code)
            }
            if (result.code != 0) return false
            resolve(JSON.parse(result.data))
          } else {
            console.log(response);
            _this.showToast('error')
          }
        },
        fail: (error) => {
          _this.hideLoading()
          reject(error);
          _this.showToast('upload_error')
          console.error(error);
        },
      })
    })
  },
  checkAuthFaild(code) {
    if (code && code == 401) {
      // todo 退出登录
      uni.navigateTo({
        url: "/pages/users/login"
      });
      return false;
    }
    return true;
  },
  // code处理
  responseDecode(data) {}
}
