import React, { Component } from 'react';
import { Table, Form, Input, Button, Icon, Modal, DatePicker, message, Pagination } from 'antd';
import NewForm from '../../../components/newForm'
import { queryPrizeIssuerList, addPrizeIssuer, modifyPrizeIssuer, deletePrizeIssuerById } from '../../../http'
import moment from 'moment';

class PrizeSponsorCom extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            pagination: {
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            tableLoading: false,
            dataSource: [],
            visible: false,
            confirmLoading: false,
            edit: '',
            searchParams: {},
            items: [
                {
                    element: 'input',
                    label: 'issuerId',
                    key: 'issuerId',
                    style: { display: "none" },
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '赞助者',
                    rules: [{ required: true, message: '请输入赞助者' }],
                    placeholder: '赞助者',
                    key: 'issuerName',
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '年龄',
                    rules: [{ required: false, message: '请输入年龄' }],
                    placeholder: '年龄',
                    key: 'issuerAge',
                    initialValue: '',
                    allowClear: true,
                }
            ],
            items2: [
                {
                    element: 'input',
                    label: '赞助者',
                    placeholder: '赞助者',
                    key: 'issuerName',
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
            title: '序号',
            dataIndex: 'index',
            align: 'left',
            render: (text, record, index) => {
                return ++index + (this.state.pagination.pageNum - 1) * this.state.pagination.pageSize;
            }
        },
        {
            title: 'ID',
            dataIndex: 'issuerId',
            key: 'issuerId',
            align: 'left'
        },
        {
            title: '赞助者',
            dataIndex: 'issuerName',
            key: 'issuerName',
            align: 'left'
        },
        {
            title: '年龄',
            dataIndex: 'issuerAge',
            key: 'issuerAge',
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
            setTimeout(() => {
                this.modalForm.props.form.setFieldsValue(item)
            }, 500)
        })
    }
    deleteBefore = (item) => {
        let that = this;
        Modal.confirm({
            title: `确定删除${item.issuerName}?`,
            okText: '删除',
            okType: 'danger',
            cancelText: '关闭',
            confirmLoading: false,
            onOk() {
                return new Promise((resolve, reject) => {
                    deletePrizeIssuerById({ issuerId: item.issuerId }).then(res => {
                        if (res.success) {
                            message.success('删除成功')
                            resolve();
                            that.modalForm && that.modalForm.props.form.resetFields()
                            that.queryPrizeIssuerList({ ...that.state.searchParams, ...that.state.pagination });
                        }
                    })
                })

            }
        });
    }
    queryPrizeIssuerList = (params) => {
        this.setState({
            tableLoading: true
        })
        queryPrizeIssuerList(params).then(res => {
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
        this.queryPrizeIssuerList({ ...values, ...this.state.pagination });
    }
    addPrizeIssuer = (values) => {
        addPrizeIssuer(values).then(res => {
            if (res.code === 200) {
                this.setState({
                    visible: false
                }, () => {
                    message.success('新增成功')
                    this.modalForm && this.modalForm.props.form.resetFields()
                    this.queryPrizeIssuerList({ ...this.state.searchParams, ...this.state.pagination });
                })
            }
        })
    }
    modifyPrizeIssuer = (values) => {
        modifyPrizeIssuer(values).then(res => {
            if (res.code === 200) {
                this.setState({
                    visible: false
                }, () => {
                    this.modalForm && this.modalForm.props.form.resetFields()
                    this.queryPrizeIssuerList({ ...this.state.searchParams, ...this.state.pagination });
                })
                message.success('修改成功')
            }
        })
    }

    handleOk = () => {
        this.modalForm.props.form.validateFields((err, values) => {

            console.log(err)
            console.log(values)

            if (!err) {
                console.log('Received values of form: ', values);
                if (this.state.edit === 'add') {
                    this.addPrizeIssuer(values)
                } else if (this.state.edit === 'modify') {
                    this.modifyPrizeIssuer(values)
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
                    rowKey={(record) => record.issuerId}
                    pagination={false}
                    style={{ marginTop: '15px' }}
                />
                <Pagination
                    style={{ marginTop: '15px' }}
                    size="small"
                    total={this.state.total}
                    position="bottom"
                    current={this.state.pagination.pageNum}
                    pageSize={this.state.pagination.pageSize}
                    onChange={(page, pageSize) => this.queryPrizeIssuerList({ ...this.state.searchParams, pageNum: page, pageSize: pageSize })}
                    onShowSizeChange={(page, pageSize) => this.queryPrizeIssuerList({ ...this.state.searchParams, pageNum: page, pageSize: pageSize })}
                    showSizeChanger
                    showQuickJumper
                />

                <Modal
                    title={this.state.edit === 'add' ? '新增赞助者' : '修改赞助者'}
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

const PrizeSponsor = Form.create({})(PrizeSponsorCom);
export default PrizeSponsor;