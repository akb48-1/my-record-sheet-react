import React, { Component } from 'react';
import { Table, Form, Input, Button, Icon, Modal, DatePicker, message, Pagination } from 'antd';
import NewForm from '../../components/newForm'
import { queryMemberList, addMember, modifyMember, deleteMember } from '../../http'
import moment from 'moment';


class MemberCon extends Component {

    constructor(prop) {
        super(prop);

        this.state = {
            pagination: {
                pageNum: 1,
                pageSize: 10
            },
            total: 82,
            tableLoading: false,
            dataSource: [],
            visible: false,
            confirmLoading: false,
            edit: '',
            searchParams: {},
            items: [
                {
                    element: 'input',
                    label: 'uid',
                    key: 'uid',
                    style: { display: "none" },
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '姓名',
                    rules: [{ required: true, message: '请输入姓名' }],
                    placeholder: '姓名',
                    key: 'member_name',
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '年龄',
                    rules: [{ required: true, message: '请输入年龄' }],
                    placeholder: '年龄',
                    key: 'age',
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '手机号',
                    // rules: [{ required: false, message: '请输入手机号' }],
                    placeholder: '手机号',
                    key: 'phone',
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '地址',
                    rules: [{ required: true, message: '请输入地址' }],
                    placeholder: '地址',
                    key: 'address',
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'datePicker',
                    label: '出生日期',
                    rules: [{ required: true, message: '请输入出生日期' }],
                    placeholder: '',
                    key: 'birthday',
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'textArea',
                    label: '描述',
                    // rules: [{ required: false, message: '请输入描述' }],
                    placeholder: '',
                    key: 'remark',
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'select',
                    label: '状态',
                    key: 'status',
                    // style: { display: "none" },
                    initialValue: '',
                    rules: [{ required: true, message: '请选择状态' }],
                    options: [{ value: "1", name: '已开启' }, { value: "0", name: '已关闭' }],
                    allowClear: true,
                },
            ],
            items2: [
                {
                    element: 'input',
                    label: '姓名',
                    placeholder: '姓名',
                    key: 'member_name',
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '年龄',
                    placeholder: '年龄',
                    key: 'age',
                    initialValue: '',
                    allowClear: true,
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
            dataIndex: 'member_name',
            key: 'member_name',
            align: 'left'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            align: 'left'
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
            align: 'left'
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            align: 'left'
        },
        {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
            align: 'left'
        },
        {
            title: '描述',
            dataIndex: 'remark',
            key: 'remark',
            align: 'left'
        },
        {
            title: '操作',
            align: 'left',
            render: (text, record) => {
                return (
                    <div>
                        <Button type="primary" size="small" onClick={() => this.modifyBefore(record)} >修改</Button>&nbsp;&nbsp;
                        <Button type="danger" size="small" onClick={() => this.deleteBefore(record)} >删除</Button>
                    </div>
                )
            },
        },
    ]

    modifyBefore = (item) => {
        console.log(item)
        this.setState({
            visible: true,
            edit: 'modify'
        }, () => {
            item.birthday = moment(item.birthday)
            item.status = '' + item.status

            setTimeout(() => {
                this.modalForm.props.form.setFieldsValue(item)

                console.log(this.modalForm.props.form.getFieldsValue())

            }, 500)
        })
    }
    deleteBefore = (item) => {
        let that = this;
        Modal.confirm({
            title: `确定删除${item.member_name}?`,
            okText: '删除',
            okType: 'danger',
            cancelText: '关闭',
            confirmLoading: false,
            onOk() {
                return new Promise((resolve, reject) => {
                    deleteMember({ uid: item.uid }).then(res => {
                        if (res.code === 200) {
                            message.success('删除成功')
                            resolve();
                            that.modalForm && that.modalForm.props.form.resetFields()
                            that.queryMemberList({ ...this.state.searchParams, ...this.state.pagination});
                        } else {
                            message.error('删除失败')
                        }
                    })
                })
                
            }
        });
    }
    queryMemberList = (params) => {
        this.setState({
            tableLoading: true
        })
        queryMemberList(params).then(res => {
            this.setState({
                dataSource: res.data.list,
                total: res.data.total,
                pagination: {
                    pageNum: res.data.pageNum,
                    pageSize: res.data.pageSize
                },
            })
        }).finally(() => {
            this.setState({
                tableLoading: false
            })
        })
    }
    search = () => {
        let values = this.searchForm.props.form.getFieldsValue()
        this.setState({
            searchParams: values
        })
        this.queryMemberList({ ...values, ...this.state.pagination});
    }
    addMember = (values) => {
        addMember(values).then(res => {
            if (res.code === 200) {
                this.setState({
                    visible: false
                }, () => {
                    message.success('新增成功')
                    this.modalForm && this.modalForm.props.form.resetFields()
                        this.queryMemberList({ ...this.state.searchParams, ...this.state.pagination });
                })
            } else {
                message.error('新增失败')
            }
        })
    }
    modifyMember = (values) => {
        modifyMember(values).then(res => {
            if (res.code === 200) {
                this.setState({
                    visible: false
                }, () => {
                    this.modalForm && this.modalForm.props.form.resetFields()
                        this.queryMemberList({ ...this.state.searchParams, ...this.state.pagination });
                })
                message.success('修改成功')
            } else {
                message.error('修改失败')
            }
        })
    }

    handleOk = () => {
        this.modalForm.props.form.validateFields((err, values) => {

            values.birthday && (values.birthday = values.birthday.format('YYYY-MM-DD'))
            values.age != undefined && (values.age = Number(values.age))
            values.status && (values.status = Number(values.status))

            console.log(err)
            console.log(values)

            if (!err) {
                console.log('Received values of form: ', values);
                if(this.state.edit === 'add') {
                    this.addMember(values)
                } else if (this.state.edit === 'modify') {
                    this.modifyMember(values)
                }
                
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
                <Table
                    bordered 
                    loading={this.state.tableLoading} 
                    dataSource={this.state.dataSource} 
                    columns={this.columns} 
                    rowKey={(record) => record.uid} 
                    pagination={false} 
                />
                <Pagination
                    style={{marginTop: '15px'}}
                    size="small" 
                    total={this.state.total} 
                    position="bottom"
                    current={this.state.pagination.pageNum}
                    pageSize={this.state.pagination.pageSize}
                    onChange={(page, pageSize) => this.queryMemberList({ ...this.state.searchParams, pageNum: page, pageSize: pageSize})}
                    onShowSizeChange={(page, pageSize) => this.queryMemberList({ ...this.state.searchParams, pageNum: page, pageSize: pageSize })}
                    showSizeChanger 
                    showQuickJumper
                 />

                <Modal
                    title={this.state.edit === 'add' ? '新增用户' : '修改用户'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={() => this.setState({ visible: false })}
                >
                    <NewForm labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}
                        items={this.state.items} wrappedComponentRef={(modalForm) => this.modalForm = modalForm} /
                    >
                </Modal>
            </div>
        );
    }
}
const Member = Form.create({})(MemberCon);
export default Member;
