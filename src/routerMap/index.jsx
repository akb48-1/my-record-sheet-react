import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect  } from 'react-router-dom';
import App from '../App';
import Home from '../containers/home'
import Page1 from '../containers/person'
import Page2 from '../containers/task'
import Page3 from '../containers/user'
import Page4 from '../containers/other'
// import Page5 from '../containers/hobby'
import Err from '../containers/ErrorPage'


class RouterMap extends Component {

    render() {
        return (
            <BrowserRouter >
                <App >
                    <Route path="/home" component={Home} tab="首页" />
                    <Route path="/person" component={Page1} tab="人物" />
                    <Route path="/task" component={Page2} tab="任务" />
                    <Route path="/income-expenditure " component={Page3} tab="收入/支出" />
                    {/* <Route path="/other" component={Page4} tab="其他" /> */}
                    <Route path="/other/hobby" component={Home} tab="喜欢" />
                    <Route path="/other/loathe" component={Home} tab="讨厌" />
                </App>
            </BrowserRouter>
        );
    }
}

export default RouterMap;
