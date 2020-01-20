import React, { Component } from 'react';
import { Table, Form, Input, Button, Icon, Modal, DatePicker, message, Pagination } from 'antd';
import NewForm from '../../../components/newForm'
import { queryLotteryTaskList, addLotteryTask, modifyLotteryTask, deleteLotteryTaskById, queryPrizeIssuerList, queryPrizeConfigList, startLotteryTask } from '../../../http'
import moment from 'moment';

class PrizeTaskCom extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            selectDisabled: false,
            prizeConfigList: [],
            prizeIssuerList: [],
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
            items: [],
            items2: [
                {
                    element: 'input',
                    label: '任务名称',
                    placeholder: '任务名称',
                    key: 'taskName',
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
            dataIndex: 'taskId',
            key: 'taskId',
            align: 'left'
        },
        {
            title: '发布者',
            dataIndex: 'issuerId',
            key: 'issuerId',
            align: 'left',
            render: (text, record, index) => {
                let obj = this.state.prizeIssuerList.find(item => item.value === text) || {};
                return obj.name || '';
            }
        },
        {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName',
            align: 'left'
        },
        {
            title: '一等奖',
            dataIndex: 'prizeLevel1Id',
            key: 'prizeLevel1Id',
            align: 'left',
            render: (text, record, index) => {
                let obj = this.state.prizeConfigList.find(item => item.value === text) || {};
                return obj.name || '';
            }
        },
        {
            title: '二等奖',
            dataIndex: 'prizeLevel2Id',
            key: 'prizeLevel2Id',
            align: 'left',
            render: (text, record, index) => {
                let obj = this.state.prizeConfigList.find(item => item.value === text) || {};
                return obj.name || '';
            }
        },
        {
            title: '三等奖',
            dataIndex: 'prizeLevel3Id',
            key: 'prizeLevel3Id',
            align: 'left',
            render: (text, record, index) => {
                let obj = this.state.prizeConfigList.find(item => item.value === text) || {};
                return obj.name || '';
            }
        },
        {
            title: '四等奖',
            dataIndex: 'prizeLevel4Id',
            key: 'prizeLevel4Id',
            align: 'left',
            render: (text, record, index) => {
                let obj = this.state.prizeConfigList.find(item => item.value === text) || {};
                return obj.name || '';
            }
        },
        {
            title: '五等奖',
            dataIndex: 'prizeLevel5Id',
            key: 'prizeLevel5Id',
            align: 'left',
            render: (text, record, index) => {
                let obj = this.state.prizeConfigList.find(item => item.value === text) || {};
                return obj.name || '';
            }
        },
        {
            title: '开始时间',
            dataIndex: 'beginTime',
            key: 'beginTime',
            align: 'left'
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            align: 'left'
        },
        {
            title: '一等奖投放量',
            dataIndex: 'level1Num',
            key: 'level1Num',
            align: 'left'
        },
        {
            title: '二等奖投放量',
            dataIndex: 'level2Num',
            key: 'level2Num',
            align: 'left'
        },
        {
            title: '三等奖投放量',
            dataIndex: 'level3Num',
            key: 'level3Num',
            align: 'left'
        },
        {
            title: '四等奖投放量',
            dataIndex: 'level4Num',
            key: 'level4Num',
            align: 'left'
        },
        {
            title: '五等奖投放量',
            dataIndex: 'level5Num',
            key: 'level5Num',
            align: 'left'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align: 'left',
            render: (text, record, index) => {
                let obj = this.statusArr.find(item => ('' + item.value) === ('' + text)) || {};
                let status = '' + record.status;

                let innerHtml = '';
                if (status === '0') {
                    innerHtml = '派发'
                } else if (status === '1') {
                    innerHtml = '派发中'
                } else if (status === '2') {
                    innerHtml = '派发结束'
                }

                if (obj.name) {
                    return (<Button type="primary" size="small" disabled={status !== '0'} onClick={() => this.publish(record)}>{innerHtml}</Button>)
                    
                }
                return '';
            }
        },
        {
            title: '备注',
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
                        {/* <Button type="danger" size="small" onClick={() => this.deleteBefore(record)} >删除</Button> */}
                    </div>
                )
            },
        },
    ]

    modifyBefore = (item) => {
        console.log(item)
        item.beginTime = moment(item.beginTime)
        item.endTime = moment(item.endTime)
        item.status = '' + item.status;
        this.setState({
            visible: true,
            edit: 'modify',
            selectDisabled: item.status !== ('' + 0),
        }, () => {
            setTimeout(() => {
                this.modalForm.props.form.setFieldsValue(item)
            }, 500)
        })
    }
    deleteBefore = (item) => {
        let that = this;
        Modal.confirm({
            title: `确定删除${item.taskName}?`,
            okText: '删除',
            okType: 'danger',
            cancelText: '关闭',
            confirmLoading: false,
            onOk() {
                return new Promise((resolve, reject) => {
                    deleteLotteryTaskById({ taskId: item.taskId }).then(res => {
                        if (res.success) {
                            message.success('删除成功')
                            resolve();
                            that.modalForm && that.modalForm.props.form.resetFields()
                            that.queryLotteryTaskList({ ...that.state.searchParams, ...that.state.pagination });
                        }
                    })
                })

            }
        });
    }
    queryLotteryTaskList = (params) => {
        this.setState({
            tableLoading: true
        })
        queryLotteryTaskList(params).then(res => {
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
        this.queryLotteryTaskList({ ...values, ...this.state.pagination });
    }
    addLotteryTask = (values) => {
        addLotteryTask(values).then(res => {
            if (res.code === 200) {
                this.setState({
                    visible: false
                }, () => {
                    message.success('新增成功')
                    this.modalForm && this.modalForm.props.form.resetFields()
                    this.queryLotteryTaskList({ ...this.state.searchParams, ...this.state.pagination });
                })
            }
        })
    }
    modifyLotteryTask = (values) => {
        modifyLotteryTask(values).then(res => {
            if (res.code === 200) {
                this.setState({
                    visible: false
                }, () => {
                    this.modalForm && this.modalForm.props.form.resetFields()
                    this.queryLotteryTaskList({ ...this.state.searchParams, ...this.state.pagination });
                })
                message.success('修改成功')
            }
        })
    }

    handleOk = () => {
        this.modalForm.props.form.validateFields((err, values) => {

            values.beginTime && (values.beginTime = values.beginTime.format('YYYY-MM-DD'))
            values.endTime && (values.endTime = values.endTime.format('YYYY-MM-DD'))
            values.status && (values.status = Number(values.status))

            console.log(err)
            console.log(values)
            
            if (!err) {
                
                if ((values.level2Num && !values.prizeLevel2Id) || (!values.level2Num && values.prizeLevel2Id)) {
                    message.error('请确认二等奖奖品以及数量')
                    return false;
                }
                if ((values.level3Num && !values.prizeLevel3Id) || (!values.level3Num && values.prizeLevel3Id)) {
                    message.error('请确认三等奖奖品以及数量')
                    return false;
                }
                if ((values.level4Num && !values.prizeLevel4Id) || (!values.level4Num && values.prizeLevel4Id)) {
                    message.error('请确认四等奖奖品以及数量')
                    return false;
                }
                if ((values.level5Num && !values.prizeLevel5Id) || (!values.level5Num && values.prizeLevel5Id)) {
                    message.error('请确认五等奖奖品以及数量')
                    return false;
                }
                values.level1Num && (values.level1Num = Number(values.level1Num))
                values.level2Num && (values.level2Num = Number(values.level2Num))
                values.level3Num && (values.level3Num = Number(values.level3Num))
                values.level4Num && (values.level4Num = Number(values.level4Num))
                values.level5Num && (values.level5Num = Number(values.level5Num))
                values.status = Number(values.status)

                values.issuerName = this.state.prizeIssuerList.find(item => item.value === values.issuerId).name

                if (this.state.edit === 'add') {
                    this.addLotteryTask(values)
                } else if (this.state.edit === 'modify') {
                    this.modifyLotteryTask(values)
                }

            }
        });
    }
    openModal = () => {
        this.queryPrizeIssuerList({
            pageNum: 1,
            pageSize: 999
        });
        this.queryPrizeConfigList({
            pageNum: 1,
            pageSize: 999
        });

        this.setState({
            visible: true,
            edit: 'add',
            selectDisabled: false,
        }, () => {
            this.modalForm && this.modalForm.props.form.resetFields()

            setTimeout(() => {
                this.modalForm.props.form.setFieldsValue({
                    status: '0'
                })
            }, 100)
        })
    }
    queryPrizeIssuerList = (params) => {
        queryPrizeIssuerList(params).then(res => {
            let list = res.data.list.map(item => {
                return {
                    value: item.issuerId,
                    name: item.issuerName,
                }
            })
            this.setState({
                prizeIssuerList: list
            })
        })
    }
    queryPrizeConfigList = (params) => {
        queryPrizeConfigList(params).then(res => {
            let list = res.data.list.map(item => {
                return {
                    value: item.prizeId,
                    name: item.prizeName,
                }
            })
            this.setState({
                prizeConfigList: list,
            })
        })
    }
    publish = (item) => {
        console.log(item)
        let that = this;
        Modal.confirm({
            title: `确定启动 ${item.taskName} 吗?`,
            okText: '启动',
            okType: 'primary',
            cancelText: '关闭',
            confirmLoading: false,
            onOk() {
                return new Promise((resolve, reject) => {
                    let params = {
                        taskId: item.taskId
                    }
                    startLotteryTask(params).then(res => {
                        if(res.success) {
                            message.success(res.message)
                            that.search();
                        }
                    })
                    resolve();
                })
            }
        });
    }

    componentDidMount() {
        this.queryPrizeIssuerList({
            pageNum: 1,
            pageSize: 999
        });
        this.queryPrizeConfigList({
            pageNum: 1,
            pageSize: 999
        });
        this.search();
    }

    searchForm = null;
    modalForm = null;
    statusArr = [{ value: "0", name: '未派发' }, { value: "1", name: '已派发' }, { value: "2", name: '发放完毕' }]

    render() {
        const optionDisabled = false;
        const selectDisabled = this.state.selectDisabled;

        const items =  [
                {
                    element: 'input',
                    label: 'taskId',
                    key: 'taskId',
                    style: { display: "none" },
                    initialValue: '',
                    disabled: true,
                    allowClear: true,
                },
                {
                    element: 'select',
                    label: '发布者',
                    rules: [{ required: true, message: '请选择发布者' }],
                    options: this.state.prizeIssuerList,
                    placeholder: '发布者',
                    key: 'issuerId',
                    initialValue: '',
                    disabled: selectDisabled,
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '任务名称',
                    rules: [{ required: true, message: '请输入任务名称' }],
                    placeholder: '任务名称',
                    key: 'taskName',
                    initialValue: '',
                    disabled: selectDisabled,
                    allowClear: true,
                },
                {
                    element: 'select',
                    label: '一等奖',
                    rules: [{ required: true, message: '请选择一等奖' }],
                    options: this.state.prizeConfigList,
                    optionDisabled: optionDisabled,
                    placeholder: '一等奖',
                    key: 'prizeLevel1Id',
                    initialValue: '',
                    disabled: selectDisabled,
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '一等奖数量',
                    rules: [{ required: true, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入数字!' }],
                    placeholder: '一等奖数量',
                    key: 'level1Num',
                    initialValue: '',
                    disabled: selectDisabled,
                    allowClear: true,
                },
                {
                    element: 'select',
                    label: '二等奖',
                    rules: [{ required: false, message: '请选择二等奖' }],
                    options: this.state.prizeConfigList,
                    optionDisabled: optionDisabled,
                    placeholder: '二等奖',
                    key: 'prizeLevel2Id',
                    initialValue: '',
                    disabled: selectDisabled,
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '二等奖数量',
                    rules: [{ required: false, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入数字!' }],
                    placeholder: '二等奖数量',
                    key: 'level2Num',
                    initialValue: '',
                    disabled: selectDisabled,
                    allowClear: true,
                },
                {
                    element: 'select',
                    label: '三等奖',
                    rules: [{ required: false, message: '请选择三等奖' }],
                    options: this.state.prizeConfigList,
                    optionDisabled: optionDisabled,
                    placeholder: '三等奖',
                    key: 'prizeLevel3Id',
                    initialValue: '',
                    disabled: selectDisabled,
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '三等奖数量',
                    rules: [{ required: false, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入数字!' }],
                    placeholder: '三等奖数量',
                    key: 'level3Num',
                    initialValue: '',
                    disabled: selectDisabled,
                    allowClear: true,
                },
                {
                    element: 'select',
                    label: '四等奖',
                    rules: [{ required: false, message: '请选择四等奖' }],
                    options: this.state.prizeConfigList,
                    optionDisabled: optionDisabled,
                    placeholder: '四等奖',
                    key: 'prizeLevel4Id',
                    initialValue: '',
                    disabled: selectDisabled,
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '四等奖数量',
                    rules: [{ required: false, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入数字!' }],
                    placeholder: '四等奖数量',
                    key: 'level4Num',
                    initialValue: '',
                    disabled: selectDisabled,
                    allowClear: true,
                },
                {
                    element: 'select',
                    label: '五等奖',
                    rules: [{ required: false, message: '请选择五等奖' }],
                    options: this.state.prizeConfigList,
                    optionDisabled: optionDisabled,
                    placeholder: '五等奖',
                    key: 'prizeLevel5Id',
                    initialValue: '',
                    disabled: selectDisabled,
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '五等奖数量',
                    rules: [{ required: false, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入数字!' }],
                    placeholder: '五等奖数量',
                    key: 'level5Num',
                    initialValue: '',
                    disabled: selectDisabled,
                    allowClear: true,
                },
                // {
                //     element: 'datePicker',
                //     label: '开启时间',
                //     rules: [{ required: false, message: '请输入开启时间' }],
                //     placeholder: '',
                //     key: 'beginTime',
                //     initialValue: '',
                //     disabled: selectDisabled,
                //     allowClear: true,
                // },
                // {
                //     element: 'datePicker',
                //     label: '结束时间',
                //     rules: [{ required: false, message: '请输入结束时间' }],
                //     placeholder: '',
                //     key: 'endTime',
                //     initialValue: '',
                //     disabled: selectDisabled,
                //     allowClear: true,
                // },
                {
                    element: 'select',
                    label: '状态',
                    key: 'status',
                    // style: { display: "none" },
                    initialValue: '',
                    rules: [{ required: true, message: '请选择状态' }],
                    options: this.statusArr,
                    disabled: true,
                    allowClear: true,
                },
                {
                    element: 'textArea',
                    label: '描述',
                    rules: [{ required: false, message: '请输入描述' }],
                    placeholder: '',
                    key: 'remark',
                    initialValue: '',
                    allowClear: true,
                },
            ];


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
                    onChange={(page, pageSize) => this.queryLotteryTaskList({ ...this.state.searchParams, pageNum: page, pageSize: pageSize })}
                    onShowSizeChange={(page, pageSize) => this.queryLotteryTaskList({ ...this.state.searchParams, pageNum: page, pageSize: pageSize })}
                    showSizeChanger
                    showQuickJumper
                />

                <Modal
                    title={this.state.edit === 'add' ? '新增任务' : '修改任务'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={() => this.setState({ visible: false })}
                >
                    <NewForm labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}
                        items={items} wrappedComponentRef={(modalForm) => this.modalForm = modalForm} /
                    >
                </Modal>
            </div>
        );
    }
}

const PrizeTask = Form.create({})(PrizeTaskCom);
export default PrizeTask;
