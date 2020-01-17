import React, { Component } from 'react';
import { Layout, Button, Modal } from 'antd';
import { withRouter, Route } from 'react-router-dom';
import axios from 'axios';

import { accountInfo } from './http';
import LeftMenu from './components/leftMenu';
import Container from './components/container';
import './App.scss';

import { writeAccount, ACCOUNT } from './redux/action';
import {connect} from 'react-redux';
import StoreTable from 'antd/lib/table';

class App extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  loginout = () => {
    let that = this;
    Modal.confirm({
      title: `确定注销吗?`,
      okText: '注销',
      okType: 'danger',
      cancelText: '关闭',
      confirmLoading: false,
      onOk() {
          return new Promise((resolve, reject) => {
              localStorage.setItem('token', '')
              localStorage.setItem('userInfo', '')

              that.props.history.push('/login');
              resolve();
          })
          
      }
  });
  }
  componentDidMount() {
    console.log(this.props.children)
    console.log(process.env)
    if(localStorage.getItem('userInfo')) {

        try {
            let dataObj = {
                username: JSON.parse(localStorage.getItem('userInfo')).username
            }
            accountInfo(dataObj).then(res => {
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                
                this.props.writeAccount({
                  type: ACCOUNT,
                  userInfo: res.data
                })
            })
        } catch(e) {
            console.error(e)
        }
    }
  }

  render() {
    let { name } = this.props.userInfo;

    return (
      <div className="App">
        <header id="header">
          <div id="logo" >
            <a href="aaa">
              <img src={'img/logo.svg'} alt=""/>
            </a>
              React
          </div>
          <div id="nav" >
            <div className="userInfo">
              <span>欢迎:<strong style={{color: '#ffe58f'}}>{name}</strong></span>
              <Button onClick={this.loginout} style={{marginLeft: '8px'}} size="small">注销</Button>
            </div>
          </div>
        </header>
        <Layout id="Layout" style={{ padding: '10px 15px' }}>
          <LeftMenu collapsed={this.state.collapsed} />
          <Container toggle={this.toggle} collapsed={this.state.collapsed} children={this.props.children} />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  };
};
const mapDispatchToProps = dispatch => ({
  writeAccount: payload => dispatch(writeAccount(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
