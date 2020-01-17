import React, { Component } from 'react';
import { Button } from 'antd';

export default class ResBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    clickEvent = () => {
        let { clickEvent } = {...this.props};
        
        clickEvent(() => {
            this.setState({
                loading: true
            })
        }).finally(() => {
            setTimeout(() => {
                this.setState({
                    loading: false
                })
            }, 500)
        });

    }
    render() {
        let filterProps = {...this.props};
        delete filterProps.clickEvent;

        return (
            <Button {...filterProps} onClick={this.clickEvent} loading={this.state.loading}>
                {this.props.children}
            </Button>
        );
    }
}
