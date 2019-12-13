import React, { Component } from 'react';

class Page2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            b: 'b',
            a: 1
        };
        this.textInput = null
        this.timer = null
    }
    timeout = () => {
        
        this.timer = setTimeout(() => {
            if (this.timer !== null) {
                clearTimeout(this.timer)
            }
            this.setState((prevState, props) => ({
                a: prevState.a + 1
            }))
            this.textInput && (this.textInput.value = this.state.a)
        }, 1000);
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    
    render() {
        
        this.timeout()
        return (
            <div>
                {
                    this.state.a
                }
                <br />
                <input type="text" defaultValue={this.state.a} ref={(input) => { this.textInput = input; }}/>
            </div>
        );
    }
}

export default Page2;
