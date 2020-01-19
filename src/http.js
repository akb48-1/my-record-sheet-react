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




/* 奖品配置列表 */
export function queryPrizeConfigList(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/prize/queryPrizeConfigList',
    data: params
  });
}

/* 新增奖品配置 */
export function addPrizeConfig(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/prize/addPrizeConfig',
    data: params
  });
}

/* 修改奖品配置信息 */
export function modifyPrizeConfig(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/prize/updatePrizeConfig',
    data: params
  });
}

/* 删除奖品配置 */
export function deletePrizeConfigById(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/prize/deletePrizeConfigById',
    data: params
  });
}




/* 奖品配置列表 */
export function queryPrizeIssuerList(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/prizeIssuer/queryPrizeIssuerList',
    data: params
  });
}

/* 新增奖品配置 */
export function addPrizeIssuer(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/prizeIssuer/addPrizeIssuer',
    data: params
  });
}

/* 修改奖品配置信息 */
export function modifyPrizeIssuer(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/prizeIssuer/updatePrizeIssuer',
    data: params
  });
}

/* 删除奖品配置 */
export function deletePrizeIssuerById(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/prizeIssuer/deletePrizeIssuerById',
    data: params
  });
}



/* 任务配置列表 */
export function queryLotteryTaskList(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/lotteryTask/queryLotteryTaskList',
    data: params
  });
}

/* 新增任务配置 */
export function addLotteryTask(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/lotteryTask/addLotteryTask',
    data: params
  });
}

/* 修改任务配置信息 */
export function modifyLotteryTask(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/lotteryTask/updateLotteryTask',
    data: params
  });
}

/* 删除任务配置 */
export function deleteLotteryTaskById(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/lotteryTask/deleteLotteryTaskById',
    data: params
  });
}

/* 派发红包 */
export function startLotterTask(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/lotteryTask/startLotterTask',
    data: params
  });
}

/* 派发红包 */
export function getLottery(params = {}) {
  return axios({
    method: 'post',
    url: '/lottery/lotteryTask/startLotterTask',
    data: params
  });
}
