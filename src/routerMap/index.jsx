import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect  } from 'react-router-dom';
import App from '../App';
import Home from '../containers/home'
import Page1 from '../containers/page1/page'
import Page2 from '../containers/page2/page'
import Page3 from '../containers/page3/page'
import Page4 from '../containers/page4/page'
import Page5 from '../containers/page5/page'


class RouterMap extends Component {

    render() {
        return (
            <BrowserRouter >
                <App >
                    <Route path="/" component={Home} tab="首页" />
                    <Route path="/page1" component={Page1} tab="页面1" />
                    <Route path="/page2" component={Page2} tab="页面2" />
                    <Route path="/page3" component={Page3} tab="页面3" />
                    <Route path="/page4" component={Page4} tab="页面4" />
                    <Route path="/page5" component={Page5} tab="页面5" />
                </App>
            </BrowserRouter>
        );
    }
}

export default RouterMap;
