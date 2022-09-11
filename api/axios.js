import axios from 'axios'
import config from '../config/index.js'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
 
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      header: {}
    }
    return config
  }
  // 拦截器函数
  interceptors(instance) {
    instance.interceptors.request.use(function (config) {
      // 在发送前请求做写什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    });
    // 添加相应拦截器
    instance.interceptors.response.use(function (response) {
      console.log(response, 'response');
      // 对相应数据做点什么
      return response;
    }, function (error) {
      console.log(error, 'error');
      // 对请求错误做些什么
      return Promise.reject(error)
    });
  }
  request(options) {
      const instance = axios.create()
      options = { ...this.getInsideConfig(), ...options }
      this.interceptors(instance)
      return instance(options)
  }
}
export default new HttpRequest(baseUrl)