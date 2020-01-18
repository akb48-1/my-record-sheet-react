import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
// import img from '../logo.svg';
// import Loadable from 'react-loadable';
import { panes, toPath } from '../util/map';
// import axios from 'axios';
import { withRouter, Route } from 'react-router-dom';
import Err from '../containers/ErrorPage'

const TabPane = Tabs.TabPane;


class Panle extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;

        
        this.state = {
            panes: panes
        };
        this.div = null
    }

    onChange = (path) => {
        
        toPath(this.props.history, path)
    }

    onEdit = (path) => {
        let newPanes = this.state.panes.filter(item => item.props.path !== path)
        let index = this.state.panes.indexOf(this.state.panes.find(item => item.props.path === path))

        this.setState({
            panes: newPanes
        }, () => {
            if (this.props.location.pathname === path) {
                this.props.history.push(this.state.panes[index - 1 < 0 ? 0 : index - 1].props.path)
            }
        })
    }

    redirect = () => {
        if(this.props.location.pathname === '/') {
            this.props.history.push('/home');
        } else if (this.state.panes.find((item) => this.props.location.pathname === item.props.path) == null) {
            this.props.history.push(this.props.location.pathname);
        }
    }
    componentDidMount() {
        let newPanes = this.props.children.find(item => item.props.path === this.props.location.pathname)

        if (newPanes) {
            this.setState({
                panes: [newPanes]
            })
        }
        
        this.props.history.listen((a,b) => {
            console.log(this.props.children)
            this.setState({}, () => {
                if (!this.state.panes.map(item => item.props.path).includes(this.props.location.pathname)) {
                    console.log(this.props.location.pathname)
                    console.log(this.props.children.find((item) => this.props.location.pathname === item.props.path))
                    console.log(this.props.children)
                    let pane = this.props.children.find((item) => this.props.location.pathname === item.props.path) || <Route  path={this.props.location.pathname} component={Err} tab="找不到该页面" />
                    this.state.panes.push(pane)
                    
                    this.setState({
                        panes: this.state.panes
                    })
                    
                }
            })
        })

        this.redirect();
    }


    render() {
        let panes = this.state.panes;
        return (
            <div ref={(div)=> this.div = div}>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.props.location.pathname}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {
                        renderPanes(panes)
                    }
                </Tabs>
            </div>
        );
    }
}


const renderPanes = (panes) => {
    return panes.map((pane, idx) => 
        <TabPane tab={pane.props.tab} key={pane.props.path} closable={panes.length > 1}>
            <pane.props.component />
        </TabPane>
    )
}

export default withRouter(Panle)