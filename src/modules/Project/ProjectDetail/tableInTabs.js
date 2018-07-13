
import React, { Component } from 'react';
import AsyncTable from 'components/AsyncTable'
import {Link} from 'react-router-dom'

const getColumns = (context) => [
    {
        title: (
            <div className="apply-form-list-th">
                <p className="apply-form-list-p1">合同名称</p >
                <p className="apply-form-list-p2">合同编码</p >
            </div>
        ),
        dataIndex: "name",
        render: (text, record) => (
            <div>
                <p className="apply-form-list-p1">
                        <Link to={ `/web/project/projectDetail/contractDetail?id=${record.number}`  }>
                        {record.contract_name}
                    </Link>
                </p >
                <p className="apply-form-list-p2">{record.number}</p >
            </div>
        )
    },{
        title: '类别',
        dataIndex: 'contractcategory',
        sorter: true,
    }, {
        title: '合同最新金额',
            dataIndex: 'new_amount',
        sorter: true,
    },{
        title: '已提报产值',
        dataIndex: 'outputamounts',
        sorter: true,
    },{
        title: '合同状态',
        dataIndex: 'contractstatus',
        sorter: true,
    }, {
        title: '竣工状态',
        dataIndex: 'finish_status',
        sorter: true,
    }, {
        title: '结算状态',
        dataIndex: 'currencystatus',
        sorter: true,
        // render: (value, row, index) => {
        //     return getSelectFormat(context.state.statusData, value)
        // }
    }
];
class Tableintabs extends Component{

    constructor(){
        super();
        this.state = {
            /**
             * params条件，给table用的
             * */
            filters:{
            },

            /**
             * 控制table刷新，要让table刷新，只要给这个值设置成新值即可
             * */
            tableUpDateKey: Date.now(),
        }
    }

    componentDidMount() {
        //默认进来的时候key值是相同的，所以要手动刷新key值 获取数据
        this.refreshTable()
    }

    refreshTable=()=>{
        this.setState({
            tableUpDateKey:Date.now()
        })
    }


    render(){
        const {tableUpDateKey,filters} = this.state;
        return (
            <AsyncTable
                url={'/con/contract/findListData'}
                updateKey={tableUpDateKey}
                filters={filters}
                tableProps={{
                    rowKey: record=>record[this.state.updateKey] || record.id,
                    pagination: true,
                    pageSize: 10,
                    onRow:undefined,
                    rowSelection:undefined,
                    onRowSelect:undefined,
                    columns:getColumns(this),
                    onSuccess: undefined,
                    scroll:undefined,
                    onDataChange:undefined,
                }} />

        )


    }


}


export default Tableintabs;