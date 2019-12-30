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
            console.log(++this.count)
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
    count = 0;
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
