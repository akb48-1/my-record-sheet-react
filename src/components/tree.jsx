import React, { Component } from 'react';

import { Menu, Icon } from 'antd';
import leftNav from '../util/leftNav';
import { withRouter } from 'react-router-dom';
import { queryNavList } from '../axios';

const SubMenu = Menu.SubMenu;
console.log(leftNav)

const tree = (arr, history) => {
    console.log(arr)
    return arr.map((obj, index) => {
        if (obj.children && obj.children.length) {
            return (
                <SubMenu
                    key={obj.url}
                    title={<span><Icon type={obj.iconType} /> <span>{obj.label}</span></span>}
                >
                    {
                        tree(obj.children, history)
                    }
                </SubMenu>
            )
        } else {
            return (
                <Menu.Item key={obj.url} onClick={() => { history.push(obj.url)}}>
                    <Icon type={obj.iconType} />
                    <span>{obj.label}</span>
                </Menu.Item>
            )
        }
    })
}
class Tree extends Component {
    constructor(props) {
        super(props)

        this.state = {
            leftNav: []
        };
    }
    componentDidMount() {
        queryNavList().then(res => {
            console.log(res.data.list);
            if(res.status) {
                this.setState({
                    leftNav: res.data.list
                })
            }
        })
    }
    render() {
        let { leftNav } = this.state;
        console.log(this.props.location.pathname)
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[this.props.location.pathname]}>
                {tree(leftNav, this.props.history)}
            </Menu>
        );
    }
}

export default withRouter(Tree);
