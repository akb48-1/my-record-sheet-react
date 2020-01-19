import React, { Component } from 'react';
import { Table, Form, Input, Button, Icon, Modal, DatePicker, message, Pagination } from 'antd';
import NewForm from '../../../components/newForm'
import { queryPrizeRecord } from '../../../http'
import moment from 'moment';


class PrizeResult extends Component {
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
            searchParams: {},

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
                    element: 'input',
                    label: '奖品编码',
                    placeholder: '奖品编码',
                    key: 'prizeNo',
                    initialValue: '',
                    allowClear: true,
                },
                {
                    element: 'input',
                    label: '中奖者名称',
                    placeholder: '中奖者名称',
                    key: 'prizeGainerName',
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


    columns = [
        {
            title: '奖品编码',
            dataIndex: 'prizeNo',
            key: 'prizeNo',
            align: 'left'
        },
        {
            title: '奖品名称',
            dataIndex: 'prizeName',
            key: 'prizeName',
            align: 'left'
        },
        {
            title: '奖品等级',
            dataIndex: 'prizeLevel',
            key: 'prizeLevel',
            align: 'left'
        },
        {
            title: '获奖时间',
            dataIndex: 'receiveTime',
            key: 'receiveTime',
            align: 'left'
        },
        {
            title: '贡献者',
            dataIndex: 'prizeSupplierName',
            key: 'prizeSupplierName',
            align: 'left'
        },
        {
            title: '幸运者',
            dataIndex: 'prizeGainerName',
            key: 'prizeGainerName',
            align: 'left'
        }
    ]

    queryPrizeRecord = (params) => {
        this.setState({
            tableLoading: true
        })
        queryPrizeRecord(params).then(res => {
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
        this.queryPrizeRecord({ ...values, ...this.state.pagination });
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
                    style={{ marginTop: '15px' }}
                />
                <Pagination
                    style={{ marginTop: '15px' }}
                    size="small"
                    total={this.state.total}
                    position="bottom"
                    current={this.state.pagination.pageNum}
                    pageSize={this.state.pagination.pageSize}
                    onChange={(page, pageSize) => this.queryPrizeRecord({ ...this.state.searchParams, pageNum: page, pageSize: pageSize })}
                    onShowSizeChange={(page, pageSize) => this.queryPrizeRecord({ ...this.state.searchParams, pageNum: page, pageSize: pageSize })}
                    showSizeChanger
                    showQuickJumper
                />
            </div>
        );
    }
}

export default PrizeResult;
