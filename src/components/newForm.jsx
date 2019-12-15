import React, { Component } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';

class NewFormCom extends Component {
    componentWillMount() {
        console.log(this.props)
    }

    renderDatePicker = (item, getFieldDecorator, index) => {
        return (
            <Form.Item label={item.label || ''} key={index} style={item.style || {}}>
                {getFieldDecorator(item.key, {
                    rules: item.rules || [],
                    initialValue: item.initialValue
                })(
                    <DatePicker placeholder={item.placeholder || ''} />,
                )}
            </Form.Item>
        )
    }
    renderInput = (item, getFieldDecorator, index) => {
        return (
            <Form.Item label={item.label || ''} key={index} style={item.style || {}}>
                {getFieldDecorator(item.key, {
                    rules: item.rules || [],
                    initialValue: item.initialValue
                })(
                    <Input placeholder={item.placeholder || ''} />,
                )}
            </Form.Item>
        )
    }
    renderTextArea = (item, getFieldDecorator, index) => {
        return (
            <Form.Item label={item.label || ''} key={index} style={item.style || {}}>
                {getFieldDecorator(item.key, {
                    rules: item.rules || [],
                    initialValue: item.initialValue
                })(
                    <Input.TextArea placeholder={item.placeholder || ''} />,
                )}
            </Form.Item>
        )
    }
    renderButton = (item, getFieldDecorator, index) => {
        return (
            <Form.Item key={index}>
                <Button type={item.type || 'primary'} onClick={() => item.onClick && item.onClick()}>{item.text}</Button>
            </Form.Item>
        )
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;

        return <Form
                    layout={this.props.layout || 'horizontal'}
                    labelCol={this.props.labelCol}
                    wrapperCol={this.props.wrapperCol}>
                {
                    this.props.items.map((item, index) => {
                        if (item.element === 'input') {
                            return this.renderInput(item, getFieldDecorator, index)
                        }
                        if (item.element === 'textArea') {
                            return this.renderTextArea(item, getFieldDecorator, index);
                        }
                        if (item.element === 'datePicker') {
                            return this.renderDatePicker(item, getFieldDecorator, index);
                        }
                        if (item.element === 'button') {
                            return this.renderButton(item, getFieldDecorator, index);
                        }
                    })
                }
                
            </Form> 
    }
}

const NewForm = Form.create({})(NewFormCom);
export default NewForm;