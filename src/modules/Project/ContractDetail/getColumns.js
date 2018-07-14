// created by Lee in 2018/07/05
import React from 'react';
export const getColumns = (buttonBoxIndex,context) => {
    if(buttonBoxIndex === 0){
        return [
            {
                title: (
                    <div className="apply-form-list-th">
                        <p className="apply-form-list-p1">指令单编号</p >
                        <p className="apply-form-list-p2">变更主题</p >
                    </div>
                ),
                dataIndex: "direct",
                render: (text, record) => (
                    <div>
                        <p className="apply-form-list-p1">{record.number}</p >
                        <p className="apply-form-list-p2">{record.modify_title}</p >
                    </div>
                )
            },{
                title: '变更类型',
                dataIndex: 'modify_type',
                sorter: true,
            }, {
                title: '签证总金额',
                dataIndex: 'amount',
                sorter: true,
            },{
                title: '变更状态',
                dataIndex: 'status',
                sorter: true,
            },{
                title: '预算状态',
                dataIndex: 'measureStatus',
                sorter: true,
            }, {
                title: '签证状态',
                dataIndex: 'followStatus',
                sorter: true,
                // render: (value, row, index) => {
                //     return getSelectFormat(context.state.statusData, value)
                // }
            }
        ]
    }else if(buttonBoxIndex === 1){
        return [
            {
                title: '产值单编号',
                dataIndex: "number",
            },{
                title: '提报金额（含税）',
                dataIndex: 'tax_amounts',
                sorter: true,
            }, {
                title: '发票类型',
                dataIndex: 'invoicetype',
                sorter: true,
            },{
                title: '发票状态',
                dataIndex: 'invoicestatus',
                sorter: true,
            },{
                title: '影像状态',
                dataIndex: 'imagestatus',
                sorter: true,
            }, {
                title: '产值单状态',
                dataIndex: 'outputstatus',
                sorter: true,
                // render: (value, row, index) => {
                //     return getSelectFormat(context.state.statusData, value)
                // }
            }
        ]
    }else if(buttonBoxIndex === 2){
        return [
            {
                title: '结算单编号',
                dataIndex: 'contractcategory',
                sorter: true,
            }, {
                title: '合同结算金额（含税）',
                dataIndex: 'new_amount',
                sorter: true,
            },{
                title: (
                    <div className="apply-form-list-th">
                        <p className="apply-form-list-p1">质保金金额</p >
                        <p className="apply-form-list-p2">质保金比例</p >
                    </div>
                ),
                dataIndex: "name",
                render: (text, record) => (
                    <div>
                        <p className="apply-form-list-p1">{record.contract_name}</p >
                        <p className="apply-form-list-p2">{record.number}</p >
                    </div>
                )
            },{
                title: '质保日期到',
                dataIndex: 'outputamounts',
                sorter: true,
            },{
                title: '结算日期到',
                dataIndex: 'contractstatus',
                sorter: true,
            }, {
                title: '结算状态',
                dataIndex: 'currencystatus',
                sorter: true,
                // render: (value, row, index) => {
                //     return getSelectFormat(context.state.statusData, value)
                // }
            }
        ]
    }else{
        return [];
    }


}

export default getColumns