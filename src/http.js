import axios from './axios';
import qs from 'qs';


export function queryNavList() {
    return axios({
        method: 'post',
        url: '/queryNavList',
        data: JSON.stringify({
        })
      });
}

export function queryPersonList() {
  return axios({
    method: 'post',
    url: '/queryAllPerson',
    data: JSON.stringify({
    })
  });
}

export function addPerson(params = {}) {

  return axios({
    method: 'post',
    url: '/addPerson',
    data: params
  });
}