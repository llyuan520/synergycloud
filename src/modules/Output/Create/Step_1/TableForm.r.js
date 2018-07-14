/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React, {PureComponent} from 'react';
import {Table} from 'antd';

const columns = [{
    title: (
    <div className="apply-form-list-th">
        <p className="apply-form-list-p1">合同名称</p>
        <p className="apply-form-list-p2">合同编号</p>
    </div>
    ),
    width: "40%",
    render: (e) => {
        return (
        <div className="apply-form-list-th">
            <p className="apply-form-list-p1">{e.contract_name}</p>
            <p className="apply-form-list-p2">{e.archive_code}</p>
        </div>
        )
    }
}, {
    title: '合同金额',
    dataIndex: 'new_amount',
    key: 'new_amount',
}, {
    title: (
    <div>
        <p className="apply-form-list-p1">甲方</p>
        <p className="apply-form-list-p1">乙方</p>
    </div>
    ),
    render: (e) => {
        return (
        <div className="apply-form-list-th">
            <p className="apply-form-list-p1">{e.companyA}</p>
            <p className="apply-form-list-p1">{e.companyB}</p>
        </div>
        )
    }
},
    {
        title: "发票类型",
        dataIndex: 'invoicetype',
        key: 'invoicetype',
    }];

export default class TableForm extends PureComponent {
    render() {
        const {value} = this.props;
        // const pagination = {
        //     current: 1,
        //     total: this.props.total,
        //     onChange: (page) => {
        //         console.log(page);
        //     }
        // };
        const rowSelection = {
            type: 'radio',
            onChange: this.onChange,
            onRowSelect: (selectedRowKeys, selectedRows) => {
                this.setState({
                    id: selectedRowKeys[0],
                    selectedNodes: selectedRows[0],
                    onlyAdd: false,
                })
            },
            onSelect: (...e) => {
                this.props.next(e);
                console.log(e);
            },
            rowSelection: {
                type: 'radio',
            },
        };
        return (

        <React.Fragment>
            <Table
            rowKey={record => record.id}
            rowSelection={rowSelection}
            columns={columns}
            pagination={false}
            dataSource={value}/>
        </React.Fragment>
        );
    }
}
