import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


import LeftMenu from './components/leftMenu';
import Container from './components/container';
import './App.scss';



class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  componentDidMount() {
    console.log(this.props.children)
    console.log(process.env)
  }

  render() {
    return (
      <div className="App">
        <header id="header">
          <div id="logo" >
            <a href="aaa">
              <img src={'img/logo.svg'} alt=""/>
            </a>
              React
          </div>
          <div id="nav" >nav</div>
        </header>
        <Layout id="Layout" style={{ padding: '10px 15px' }}>
          <LeftMenu collapsed={this.state.collapsed} />
          <Container toggle={this.toggle} collapsed={this.state.collapsed} children={this.props.children} />
        </Layout>
      </div>
    );
  }
}

export default App;
