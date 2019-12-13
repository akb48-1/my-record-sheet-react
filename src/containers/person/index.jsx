import React, { Component } from 'react';
import { Table, Form, Input, Button, Icon, Modal } from 'antd';
import { queryPersonList } from '../../axios'
import ModalForm from './modalForm'
import moment from 'moment';

class PersonCon extends Component {
    
    constructor(prop){
        super(prop);

        this.state = {
            dataSource: [],
            visible: false,
            confirmLoading: false,
            edit: ''
        }
    }

    query = () => {

    }
    

    columns = [
        {
          title: '姓名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '生日',
          dataIndex: 'birthday',
          key: 'birthday',
        },
        {
          title: '描述',
          dataIndex: 'desc',
          key: 'desc',
        },
      ]
    queryPersonList = () => {
        queryPersonList().then(res => {
            this.setState({
                dataSource: res.data.list
            })
        })
    }
    submit = () => {
        this.props.form.validateFields((err, values) => {
            console.log(values)
            console.log(err)
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleOk = () => {
        this.modalForm.props.form.validateFields((err, values) => {
            
            values.birthday && (values.birthday = values.birthday.format('YYYY-MM-DD'))
            console.log(err)
            console.log(values)
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    componentDidMount() {
        this.queryPersonList();
    }
    modalForm = null;
    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div>
                    <Form layout="inline" >
                        <Form.Item label="用户名">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item label="密码">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={() => this.submit()}>
                                search
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={() => this.setState({visible: true, edit: 'add'})}>
                                新增
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <Table dataSource={this.state.dataSource} columns={this.columns} rowKey={(record) => record.uid}/>;

                <Modal
                    title={(this.state.edit === 'add'? '新增' : '修改') + '用户'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={() => this.setState({visible: false})}
                    >
                    <ModalForm wrappedComponentRef={(modalForm) => this.modalForm = modalForm}/>
                </Modal>
            </div>
        );
    }
}
const Person = Form.create({})(PersonCon);
export default Person;
