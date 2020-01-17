import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  baseURL: '/springBoot',
  timeout: 10000,
  withCredentials: true,
})

// 不用传token的接口
const filterApis = ['/toLogin']
// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做某事，比如说 设置token

  if(!filterApis.includes(config.url)) {
    config.headers['token'] = localStorage.getItem('token');
  }
  
  return config;
}, error => {
  // 请求错误时做些事
  return Promise.reject(error);
});


// 添加响应拦截器

instance.interceptors.response.use(response => {
  // 对响应数据做些事
  // console.log(response)
  if (response.status === 200) {
    var data = response.data;
    if (data.success === false) {
      message.error(data.msg)
      if(data.code === 403 || data.code === 500) {
        localStorage.setItem('token', '');
        localStorage.setItem('userInfo', '');

        window.location.replace('/login');
      }
    }
  }
  return response.data;
}, error => {
  return Promise.reject({error: '错误'}); // 返回接口返回的错误信息
})

export default instance;
