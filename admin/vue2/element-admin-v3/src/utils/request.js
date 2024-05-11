/** +----------------------------------------------------------------------
 * | TFSHOP [ 轻量级易扩展低代码开源商城系统 ]
 * +----------------------------------------------------------------------
 * | Copyright (c) 2020~2023 https://www.dswjcms.com All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed 未经许可不能去掉TFSHOP相关版权
 * +----------------------------------------------------------------------
 * | Author: Purl <383354826@qq.com>
 * +----------------------------------------------------------------------
 */
import i18n from '@/lang/index'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 50000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {

    if (getToken('access_token')) {
      // laravel令牌验证headers
      config.headers['Authorization'] = getToken('token_type') + ' ' + getToken('access_token')
      config.headers['Accept'] = 'application/json'
    }
    config.headers['Lang'] = getToken('language') || 'zh'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    if (response.data.result === 'error') {
      Message({
        message: i18n.t('request.server_return_error'),
        type: 'error',
        duration: 5 * 1000
      })
    }
    const res = response.data.message
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.status === 50002 || res.status === 50003) {
        // to re-login
        MessageBox.confirm(i18n.t('request.no_operation_for_long_time'), i18n.t('request.definite_logout'), {
          confirmButtonText: i18n.t('request.reLogin'),
          cancelButtonText: i18n.t('common.cancel'),
          type: 'warning'
        }).then(() => {
          store.dispatch('LogOut').then()
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return {
        data: res
      }
    }
  },
  error => {
    // console.log('err' + error) // for debug
    if (error.response.data.status_code === 500 && (error.response.data.message.indexOf('The refresh token is invalid') !== -1 || error.response.data.message.indexOf('Unauthenticated') !== -1)) {
      MessageBox.confirm(i18n.t('request.no_operation_for_long_time'), i18n.t('request.definite_logout'), {
        confirmButtonText: i18n.t('request.reLogin'),
        cancelButtonText: i18n.t('common.cancel'),
        type: 'warning'
      }).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload()
        })
      })
    } else {
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
