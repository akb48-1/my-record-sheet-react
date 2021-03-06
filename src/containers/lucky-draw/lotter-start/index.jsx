import React, { Component } from 'react';
import { Table, Form, Input, Button, Icon, Modal, DatePicker, message, Pagination } from 'antd';
import NewForm from '../../../components/newForm'
import { queryLotteryTaskList, queryPrizeIssuerList, queryPrizeConfigList, getLotteryPrize } from '../../../http'
import moment from 'moment';


class PrizeStartCom extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            prizeModal: false,
            myPrize: null,
            issuerTableLoading: false,
            currentLotterUser: {
                issuerName: ''
            },
            lotterUserModalvisible: false,
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
                }
            ]
        }
    }


    issuerColumns = [
        {
            title: 'ID',
            dataIndex: 'issuerId',
            key: 'issuerId',
            align: 'left'
        },
        {
            title: '名称',
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
                        <Button type="primary" size="small" onClick={() => this.selectLotteryUser(record)} disabled={record.issuerName === this.state.currentLotterUser.issuerName}>选择</Button>
                    </div>
                )
            },
        },
    ]
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
        // {
        //     title: '开始时间',
        //     dataIndex: 'beginTime',
        //     key: 'beginTime',
        //     align: 'left'
        // },
        // {
        //     title: '结束时间',
        //     dataIndex: 'endTime',
        //     key: 'endTime',
        //     align: 'left'
        // },
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
                let innerHtml = '';
                if (text === 0) {
                    innerHtml = '未派发'
                } else if (text === 1) {
                    innerHtml = '派发中'
                } else if (text === 2) {
                    innerHtml = '派发结束'
                }
     
                return innerHtml;
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
                        <Button type="primary" size="small" onClick={() => this.startLotter(record)} disabled={record.status !== 1}>抽取</Button>
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
        })
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

    startLotter = () => {
        console.log("开始抽奖")
    }
    confirmUser = () => {
        console.log("选择抽奖人")
    }
    openModal = () => {
        this.setState({
            visible: true,
        })
    }
    queryPrizeIssuerList = (params) => {
        this.setState({
            issuerTableLoading: true
        })
        queryPrizeIssuerList(params).then(res => {
            let list = res.data.list.map(item => {
                return {
                    value: item.issuerId,
                    name: item.issuerName,
                }
            })
            this.setState({
                prizeIssuerList: list,
                prizeIssuerDataSource:res.data.list
            })
        }).finally(res => {
            this.setState({
                issuerTableLoading: false
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
    startLotter = (item) => {
        console.log(item)
        console.log(this.state.currentLotterUser)
        if(this.state.currentLotterUser == null || !this.state.currentLotterUser.issuerName) {
            message.error('请先选择抽奖人');

            return;
        }
        let that = this;
        Modal.confirm({
            title: `抽奖人 ${this.state.currentLotterUser.issuerName} 确定抽取 ${item.taskName} 吗?`,
            okText: '抽取',
            okType: 'primary',
            cancelText: '关闭',
            confirmLoading: false,
            onOk() {
                let issuerName = that.state.currentLotterUser.issuerName;
                let issuerId = that.state.currentLotterUser.issuerId;

                return new Promise((resolve, reject) => {
                    let params = {
                        taskId: item.taskId,
                        prizeGainerName: issuerName,
                        prizeGainerId: issuerId,

                    }
                    getLotteryPrize(params).then(res => {
                        if(res.success) {
                            that.setState({
                                myPrize: res.data,
                                prizeModal: true
                            })
                        } else {
                            
                            that.queryLotteryTaskList({ ...that.state.searchParams, ...that.state.paginatio})
                        }
                    })
                    resolve();
                })
            }
        });
    }
    openLotteryUserModal = () => {
        console.log('打开抽奖人modal')
        this.queryPrizeIssuerList({
            pageNum: 1,
            pageSize: 999
        });

        this.setState({
            lotterUserModalvisible: true
        })
        
    }
    selectLotteryUser = (item) => {
        console.log('切换抽奖人')
        this.setState({
            currentLotterUser: item,
            lotterUserModalvisible: false
        })
    }
    componentDidMount() {
        this.queryPrizeConfigList({
            pageNum: 1,
            pageSize: 999
        });
        this.search();
    }

    searchForm = null;
    modalForm = null;
    statusArr = [{ value: "1", name: '已派发' }, { value: "0", name: '未派发' }, { value: "2", name: '发放完毕' }]

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <div>
                
                <NewForm items={this.state.items2} wrappedComponentRef={(searchForm) => this.searchForm = searchForm} layout="inline" />
                <div style={{ marginTop: '15px' }}>
                    当前抽奖人 : {this.state.currentLotterUser? this.state.currentLotterUser.issuerName : '未选择'} &nbsp;&nbsp;&nbsp;&nbsp; <Button type="primary" size="small" onClick={this.openLotteryUserModal}>{this.state.currentLotterUser.issuerName? '切换抽奖人' : '选择抽奖人'}</Button>
                </div>
                <Table
                    bordered
                    loading={this.state.tableLoading}
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    rowKey={(record) => record.taskId}
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
                    title={'抽取奖品'}
                    visible={this.state.visible}
                    onOk={this.startLotter}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={() => this.setState({ visible: false })}
                >
                    
                </Modal>
                <Modal
                    title={'抽奖人选择'}
                    visible={this.state.lotterUserModalvisible}
                    onCancel={() => this.setState({ lotterUserModalvisible: false })}
                    footer={null}
                >
                    <Table
                        bordered
                        loading={this.state.issuerTableLoading}
                        dataSource={this.state.prizeIssuerDataSource}
                        columns={this.issuerColumns}
                        rowKey={(record) => record.issuerId}
                        pagination={false}
                    />
                </Modal>

                <Modal
                    title={'抽到奖啦'}
                    visible={this.state.prizeModal}
                    onCancel={() => this.setState({ prizeModal: false })}
                    footer={null}
                >
                    {
                        this.state.myPrize && <div>
                            <Form {...formItemLayout} >
                                <Form.Item label="奖品名称" style={{ marginBottom: '0' }} ><strong style={{color: 'red'}}>{this.state.myPrize.prizeName}</strong></Form.Item>
                                <Form.Item label="奖品等级" style={{ marginBottom: '0' }} ><strong style={{color: 'red'}}>{this.state.myPrize.prizeLevel}等奖</strong></Form.Item>
                                <Form.Item label="获奖时间" style={{ marginBottom: '0' }} ><strong style={{color: 'red'}}>{this.state.myPrize.receiveTime}</strong></Form.Item>
                                <Form.Item label="贡献者" style={{ marginBottom: '0' }} ><strong style={{color: 'red'}}>{this.state.myPrize.prizeSupplierName}</strong></Form.Item>
                                <Form.Item label="幸运者" style={{ marginBottom: '0' }} ><strong style={{color: 'red'}}>{this.state.myPrize.prizeGainerName}</strong></Form.Item>
                                <Form.Item label="奖品编号" style={{ marginBottom: '0' }} ><strong style={{color: 'red'}}>{this.state.myPrize.prizeNo}</strong></Form.Item>
                            </Form>
                        </div>
                    }
                </Modal>
            </div>
        );
    }
}

const PrizeStart = Form.create({})(PrizeStartCom);
export default PrizeStart;
