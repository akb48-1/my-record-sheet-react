import axios from './axios';
import qs from 'qs';

/* 登录 */
export function toLogin(params = {}) {
  return axios({
    method: 'post',
    url: '/toLogin',
    data: params
  });
}

/* 菜单列表 */
export function queryAllMenuList() {
    return axios({
        method: 'post',
        url: '/menu/queryAllMenuList',
        data: JSON.stringify({
        })
      });
}

/* 成员列表 */
export function queryMemberList(params = {}) {
  return axios({
    method: 'post',
    url: '/user/queryUserList',
    data: params
  });
}

/* 新增成员 */
export function addMember(params = {}) {
  return axios({
    method: 'post',
    url: '/user/addUser',
    data: params
  });
}

/* 修改成员信息 */
export function modifyMember(params = {}) {
  return axios({
    method: 'post',
    url: '/user/updateUser',
    data: params
  });
}

/* 删除成员 */
export function deleteMember(params = {}) {
  return axios({
    method: 'post',
    url: '/user/deleteUserById',
    data: params
  });
}

