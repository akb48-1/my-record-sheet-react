import axios from 'axios';
import qs from 'qs';

const url = process.env.NODE_ENV === "development"? 'http://localhost:8088/MySpringMvc' : '/MySpringMvc';

const instance = axios.create({
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    'token': 'one'
  },
  baseURL: url,
  timeout: 10000,
  withCredentials: true
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
  console.log(config, 'config')
  // 在发送请求之前做某事，比如说 设置token
  config.headers['token'] = 'token';
  return config;
}, error => {
  // 请求错误时做些事
  return Promise.reject(error);
});


// 添加响应拦截器
instance.interceptors.response.use(response => {
  console.log(response, 'response')
  // 对响应数据做些事
  if (response.status === 200) {
    console.log(response)
    if (response.data) {
      console.log('有数据')
    } else {
      console.log('没有数据')
    }
  }
  return response;
}, error => {
  return Promise.reject({error: '错误'}); // 返回接口返回的错误信息
})

export default instance;
