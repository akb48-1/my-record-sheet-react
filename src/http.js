import axios from './axios';
import qs from 'qs';


export function queryNavList() {
    return axios({
        method: 'post',
        url: '/menu/queryAllMenuList',
        data: JSON.stringify({
        })
      });
}

export function queryMemberList(params = {}) {
  return axios({
    method: 'post',
    url: '/user/queryUserList',
    data: params
  });
}

export function addMember(params = {}) {
  return axios({
    method: 'post',
    url: '/user/addUser',
    data: params
  });
}

export function modifyMember(params = {}) {
  return axios({
    method: 'post',
    url: '/user/updateUser',
    data: params
  });
}

export function deleteMember(params = {}) {
  return axios({
    method: 'post',
    url: '/user/deleteUserById',
    data: params
  });
}