import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import ResBtn from '@/components/ResBtn'

import { toLogin } from '@/http';

class LoginCom extends Component {
    componentWillMount = () => {
    }
    toLogin = (fn) => {
        return this.props.form.validateFields((err, values) => {
            console.log(err, values)
            if(!err) {
                typeof fn === "function" && fn();
                toLogin(values).then(res => {
                    console.log(res)
                    Promise.resolve(res)
                }).catch((err) => {
                    Promise.reject(err)
                })
            }
        })
    }
    render() {

        let { getFieldDecorator } = this.props.form
        return (
            <div style={{width: "380px", margin: '50vh auto 40% auto'}}>
                <Form>
                    <Form.Item >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入账号!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <ResBtn type="primary" htmlType="submit" disabled={false} clickEvent={this.toLogin} style={{width: '100%'}}>登录</ResBtn>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const Login = Form.create({})(LoginCom);
export default Login;
