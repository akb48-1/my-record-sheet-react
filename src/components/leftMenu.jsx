import React, { Component } from 'react';

import { Layout } from 'antd';
import Tree from './tree';

const { Sider } = Layout;

class LeftMenu extends Component {
    render() {
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
            >
                <div className="logo" />
                <Tree />
            </Sider>
        );
    }
}

export default LeftMenu;
