import http from "@/api/request.js"

// 注册
export function register(data) {
  return http.request({
    method: 'post',
    url: '/customer/register/account',
    data
  })
}
// 登录
export function login(data) {
  return http.request({
    method: 'post',
    url: '/customer/login/account',
    data
  })
}
// 退出登录
export function logout(data) {
  return http.request({
    method: 'get',
    url: '/customer/user/logout',
    data
  })
}
// 获取个人信息
export function info(data) {
  return http.request({
    method: 'get',
    url: '/customer/user/info',
    data
  })
}
// 上传文件
export function upload(data) {
  return http.upload({
    url: 'customer/user/upload',
    file: data
  })
}
// 消息通知
export function notices(data) {
  return http.request({
    method: 'get',
    url: '/customer/user/notices',
    data
  })
}
// 设置消息已查看
export function notices_read(data) {
  return http.request({
    method: '/customer/user/notices-read',
    url: 'get',
    data
  })
}
// 商家申请
export function apply_seller(data) {
  return http.request({
    method: '/customer/user/apply-seller',
    url: 'post',
    data
  })
}
