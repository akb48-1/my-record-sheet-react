import React, { Component } from 'react';
import { Form, Input, DatePicker } from 'antd';

class ModalFormCom extends Component {

    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} >
                <Form.Item label="id" style={{display: "none"}}>
                    {getFieldDecorator('uid', {
                    })(
                        <Input />,
                    )}
                </Form.Item>
                <Form.Item label="姓名">
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入姓名' }],
                    })(
                        <Input placeholder="姓名"/>,
                    )}
                </Form.Item>
                <Form.Item label="年龄">
                    {getFieldDecorator('age', {
                        rules: [{ required: true, message: '请输入年龄' }],
                    })(
                        <Input placeholder="年龄" />,
                    )}
                </Form.Item>
                <Form.Item label="手机号">
                    {getFieldDecorator('phone', {
                        rules: [{ required: false, message: '请输入手机号' }],
                    })(
                        <Input placeholder="手机号" />,
                    )}
                </Form.Item>
                <Form.Item label="地址">
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: '请输入地址' }],
                    })(
                        <Input placeholder="地址" />,
                    )}
                </Form.Item>
                <Form.Item label="出生日期">
                    {getFieldDecorator('birthday', {
                        rules: [{ required: true, message: '请输入出生日期' }],
                    })(
                        // <Input placeholder="出生日期" />,
                        <DatePicker />,
                    )}
                </Form.Item>
                <Form.Item label="描述">
                    {getFieldDecorator('desc', {
                        rules: [{ required: false, message: '请输入描述' }],
                    })(
                        <Input.TextArea placeholder="描述" />,
                    )}
                </Form.Item>
            </Form>
        );
    }
}
const ModalForm = Form.create({})(ModalFormCom);
export default ModalForm;
