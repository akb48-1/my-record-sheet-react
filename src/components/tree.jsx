import React, { Component } from 'react';

import { Menu, Icon } from 'antd';
import leftNav from '../util/leftNav';
import { withRouter } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
console.log(leftNav)

const tree = (arr, history) => {
    return arr.map((obj, index) => {
        if (obj.children && obj.children.length) {
            return (
                <SubMenu
                    key={obj.id}
                    title={<span><Icon type="user" /> <span>{obj.label}-40</span></span>}
                >
                    {
                        tree(obj.children, history)
                    }
                </SubMenu>
            )
        } else {
            return (
                <Menu.Item key={obj.id} onClick={() => { history.push(obj.url)}}>
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
        fetch('http://localhost:8088/MySpringMvc/queryNavList').then(res => res.json()).then(data => {
            console.log(data.list)
            this.setState({
                leftNav: data.list
            })
        })
    }
    render() {
        let { leftNav } = this.state;
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                {tree(leftNav, this.props.history)}
            </Menu>
        );
    }
}

export default withRouter(Tree);
