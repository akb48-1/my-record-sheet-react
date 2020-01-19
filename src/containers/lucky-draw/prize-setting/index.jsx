import React, { Component } from 'react';
import { Table, Form, Input, Button, Icon, Modal, DatePicker, message, Pagination } from 'antd';
import NewForm from '../../../components/newForm'
import { queryPrizeConfigList, addPrizeConfig, modifyPrizeConfig, deletePrizeConfigById } from '../../../http'
import moment from 'moment';

class PrizeSettingCom extends Component {
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
                    label: 'prizeId',
                    key: 'prizeId',
                    style: { display: "none" },
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '奖品名称',
                    rules: [{ required: true, message: '奖品名称' }],
                    placeholder: '奖品名称',
                    key: 'prizeName',
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '奖品图片',
                    rules: [{ required: false, message: '请输入年龄' }],
                    placeholder: '奖品图片',
                    key: 'prizeImg',
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '奖品价值',
                    rules: [{ required: false, message: '请输入奖品价值' }],
                    placeholder: '奖品价值',
                    key: 'prizePrice',
                    initialValue: '',
                    allowClear: true,
                }
            ],
            items2: [
                {
                    element: 'input',
                    label: '奖品名称',
                    placeholder: '姓名',
                    key: 'prizeName',
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
            title: 'ID',
            dataIndex: 'prizeId',
            key: 'prizeId',
            align: 'left'
        },
        {
            title: '奖品名称',
            dataIndex: 'prizeName',
            key: 'prizeName',
            align: 'left'
        },
        {
            title: '奖品图片',
            dataIndex: 'prizeImg',
            key: 'prizeImg',
            align: 'left'
        },
        {
            title: '奖品价值',
            dataIndex: 'prizePrice',
            key: 'prizePrice',
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
            title: `确定删除${item.prizeName}?`,
            okText: '删除',
            okType: 'danger',
            cancelText: '关闭',
            confirmLoading: false,
            onOk() {
                return new Promise((resolve, reject) => {
                    deletePrizeConfigById({ prizeId: item.prizeId }).then(res => {
                        if (res.success) {
                            message.success('删除成功')
                            resolve();
                            that.modalForm && that.modalForm.props.form.resetFields()
                            that.queryPrizeConfigList({ ...that.state.searchParams, ...that.state.pagination });
                        }
                    })
                })

            }
        });
    }
    queryPrizeConfigList = (params) => {
        this.setState({
            tableLoading: true
        })
        queryPrizeConfigList(params).then(res => {
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
        this.queryPrizeConfigList({ ...values, ...this.state.pagination });
    }
    addPrizeConfig = (values) => {
        addPrizeConfig(values).then(res => {
            if (res.code === 200) {
                this.setState({
                    visible: false
                }, () => {
                    message.success('新增成功')
                    this.modalForm && this.modalForm.props.form.resetFields()
                    this.queryPrizeConfigList({ ...this.state.searchParams, ...this.state.pagination });
                })
            }
        })
    }
    modifyPrizeConfig = (values) => {
        modifyPrizeConfig(values).then(res => {
            if (res.code === 200) {
                this.setState({
                    visible: false
                }, () => {
                    this.modalForm && this.modalForm.props.form.resetFields()
                    this.queryPrizeConfigList({ ...this.state.searchParams, ...this.state.pagination });
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
                    this.addPrizeConfig(values)
                } else if (this.state.edit === 'modify') {
                    this.modifyPrizeConfig(values)
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
                    rowKey={(record) => record.prizeId}
                    pagination={false}
                    style={{marginTop: '15px'}}
                />
                <Pagination
                    style={{ marginTop: '15px' }}
                    size="small"
                    total={this.state.total}
                    position="bottom"
                    current={this.state.pagination.pageNum}
                    pageSize={this.state.pagination.pageSize}
                    onChange={(page, pageSize) => this.queryPrizeConfigList({ ...this.state.searchParams, pageNum: page, pageSize: pageSize })}
                    onShowSizeChange={(page, pageSize) => this.queryPrizeConfigList({ ...this.state.searchParams, pageNum: page, pageSize: pageSize })}
                    showSizeChanger
                    showQuickJumper
                />

                <Modal
                    title={this.state.edit === 'add' ? '新增奖品' : '修改奖品'}
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

const PrizeSetting = Form.create({})(PrizeSettingCom);
export default PrizeSetting;
