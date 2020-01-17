import axios from './axios';
import qs from 'qs';

/* 登录 */
export function toLogin(params = {}) {
  return axios({
    method: 'post',
    url: '/toLogin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
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
    url: '/member/queryMemberList',
    data: params
  });
}

/* 新增成员 */
export function addMember(params = {}) {
  return axios({
    method: 'post',
    url: '/member/addMember',
    data: params
  });
}

/* 修改成员信息 */
export function modifyMember(params = {}) {
  return axios({
    method: 'post',
    url: '/member/updateMember',
    data: params
  });
}

/* 删除成员 */
export function deleteMember(params = {}) {
  return axios({
    method: 'post',
    url: '/member/deleteMemberById',
    data: params
  });
}

/* 登陆人信息 */
export function accountInfo(params = {}) {
  return axios({
    method: 'post',
    url: '/account/info',
    data: params
  });
}

