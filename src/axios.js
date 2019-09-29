import axios from 'axios'

var instance = axios.create({
  baseURL: 'http://127.0.0.1:8888',
  timeout : 500
})

instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token')
  console.log(token)
  config.headers.Authorization =  token
  // config.params = {
  //   ...config.params,
  // }
  // 在发送请求之前做些什么
  return config
}, function (error) {
// 对请求错误做些什么
  return Promise.reject(error)
})

export default instance
