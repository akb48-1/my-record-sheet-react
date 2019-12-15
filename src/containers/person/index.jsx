import React, { Component } from 'react';
import { Table, Form, Input, Button, Icon, Modal, DatePicker } from 'antd';
import NewForm from '../../components/newForm'
import { queryPersonList, addPerson } from '../../http'
import moment from 'moment';

class PersonCon extends Component {
    
    constructor(prop){
        super(prop);

        this.state = {
            dataSource: [],
            visible: false,
            confirmLoading: false,
            edit: '',
            items: [
                {
                    element: 'input',
                    label: 'id',
                    key: 'id',
                    style: { display: "none" },
                    initialValue: '',
                },
                {
                    element: 'input',
                    label: '姓名',
                    rules: [{ required: true, message: '请输入姓名' }],
                    placeholder: '姓名',
                    key: 'username',
                    initialValue: '',
                },
                {
                    element: 'input',
                    label: '年龄',
                    rules: [{ required: true, message: '请输入年龄' }],
                    placeholder: '年龄',
                    key: 'age',
                    initialValue: '',
                },
                {
                    element: 'input',
                    label: '手机号',
                    rules: [{ required: false, message: '请输入手机号' }],
                    placeholder: '手机号',
                    key: 'phone',
                    initialValue: '',
                },
                {
                    element: 'input',
                    label: '地址',
                    rules: [{ required: true, message: '请输入地址' }],
                    placeholder: '地址',
                    key: 'address',
                    initialValue: '',
                },
                {
                    element: 'datePicker',
                    label: '出生日期',
                    rules: [{ required: true, message: '请输入出生日期' }],
                    placeholder: '',
                    key: 'birthday',
                    initialValue: '',
                },
                {
                    element: 'textArea',
                    label: '描述',
                    rules: [{ required: false, message: '请输入描述' }],
                    placeholder: '',
                    key: 'remark',
                    initialValue: '',
                }
            ],
            items2: [
                {
                    element: 'input',
                    label: '姓名',
                    placeholder: '姓名',
                    key: 'username',
                    initialValue: '',
                },
                {
                    element: 'input',
                    label: '年龄',
                    placeholder: '年龄',
                    key: 'age',
                    initialValue: '',
                },
                {
                    element: 'button',
                    type: 'primary',
                    onClick: this.search,
                    key: 'search',
                    text: '搜索',
                },
                {
                    element: 'button',
                    type: 'danger',
                    onClick: this.openModal,
                    key: 'add',
                    text: '新增',
                },
            ]
        }
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
          dataIndex: 'remark',
          key: 'remark',
        },
    ]

    
    queryPersonList = () => {
        queryPersonList().then(res => {
            this.setState({
                dataSource: res.data.list
            })
        })
    }
    search = () => {
        this.queryPersonList();
    }

    handleOk = () => {
        this.modalForm.props.form.validateFields((err, values) => {
            
            values.birthday && (values.birthday = values.birthday.format('YYYY-MM-DD'))
            values.a = {b : 3}
            values.age != undefined && (values.age = Number(values.age))
            console.log(err)
            console.log(values)
            if (!err) {
                console.log('Received values of form: ', values);
                addPerson(values).then(res => {
                    if (res.data.code === 200) {
                        this.setState({
                            visible: false
                        }, () => {
                            this.modalForm && this.modalForm.props.form.resetFields()
                            this.queryPersonList();
                        })
                    }
                })
            }
        });
    }
    openModal = () => {
        this.setState({
            visible: true,
            edit: 'add'
        }, () => {
            this.modalForm && this.modalForm.props.form.resetFields()
        })
    }

    componentDidMount() {
        this.search();
    }

    searchForm = null;
    modalForm = null;
    render() {
        
        return (
            <div>
                <NewForm items={this.state.items2} wrappedComponentRef={(searchForm) => this.searchForm = searchForm} layout="inline" />
                <Table dataSource={this.state.dataSource} columns={this.columns} rowKey={(record) => record.uid}/>;

                <Modal
                    title={(this.state.edit === 'add'? '新增' : '修改') + '用户'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={() => this.setState({visible: false})}
                    >
                        <NewForm labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}  
                        items={this.state.items} wrappedComponentRef={(modalForm) => this.modalForm = modalForm} /
                        >
                </Modal>
            </div>
        );
    }
}
const Person = Form.create({})(PersonCon);
export default Person;
