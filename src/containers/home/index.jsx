import React, { Component } from 'react';

import { accountInfo } from '../../http';
class Home extends Component {

    componentDidMount() {
        console.log(accountInfo)
        accountInfo()
    }
    render() {
        return (
            <div>
                首页
            </div>
        );
    }
}

export default Home;
