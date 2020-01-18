import React, { Component } from 'react';

import { Menu, Icon } from 'antd';
import leftNav from '../util/leftNav';
import { withRouter } from 'react-router-dom';
import { queryAllMenuList } from '../http';

const SubMenu = Menu.SubMenu;

const tree = (arr, history) => {
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
        queryAllMenuList().then(res => {
            if(res.success) {
                let list = res.data.list;

                list.forEach(item => {
                    var parentUrl = '';
                    if (item.children && item.children.length) {
                        parentUrl = item.url;
                        item.children.forEach(child => {
                            child.url = parentUrl + child.url;
                        })
                    }
                })
                
                this.setState({
                    leftNav: res.data.list
                })
            }
        })
    }
    render() {
        let { leftNav } = this.state;
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[this.props.location.pathname]} defaultOpenKeys={['/' + this.props.location.pathname.split('/')[1]]}>
                {tree(leftNav, this.props.history)}
            </Menu>
        );
    }
}

export default withRouter(Tree);
