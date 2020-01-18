import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch  } from 'react-router-dom';
import App from '../App';
import Home from '../containers/home'
import Page1 from '../containers/member'
import Page2 from '../containers/task'
import IncomeExpenditure from '../containers/income-expenditure'
import Page4 from '../containers/other'
import Hobby from '../containers/hobby'
import Loathe from '../containers/loathe'
// import Page5 from '../containers/hobby'
import Err from '../containers/ErrorPage'
import Login from '../containers/login'

import PrizeSetting from '../containers/lucky-draw/prize-setting'
import PrizeSponsor from '../containers/lucky-draw/prize-sponsor'
import PrizeTask from '../containers/lucky-draw/lotter-task'
import PrizeStart from '../containers/lucky-draw/lotter-start'
import PrizeResult from '../containers/lucky-draw/lotter-result'

class RouterMap extends Component {

    render() {
        return (
            <BrowserRouter >
                <Switch>
                    <Route path="/login" component={Login} tab="登录" />
                    <App >
                        <Route path="/home" component={Home} tab="首页" />
                        <Route path="/member" component={Page1} tab="人物" />
                        <Route path="/task" component={Page2} tab="任务" />
                        <Route path="/income-expenditure" component={IncomeExpenditure} tab="收入/支出" />
                        {/* <Route path="/other" component={Page4} tab="其他" /> */}
                        <Route path="/other/hobby" component={Hobby} tab="爱好" />
                        <Route path="/other/loathe" component={Loathe} tab="讨厌" />
                        <Route path="/lucky-draw/prize-setting" component={PrizeSetting} tab="奖品设置" />
                        <Route path="/lucky-draw/prize-sponsor" component={PrizeSponsor} tab="奖品赞助者" />
                        <Route path="/lucky-draw/lotter-task" component={PrizeTask} tab="抽奖任务发布" />
                        <Route path="/lucky-draw/lotter-start" component={PrizeStart} tab="抽奖" />
                        <Route path="/lucky-draw/lotter-result" component={PrizeResult} tab="抽奖结果" />
                    </App>
                </Switch>
                
            </BrowserRouter>
        );
    }
}

export default RouterMap;
