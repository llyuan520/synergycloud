/**
 *
 *
 * Created by fanzhe on 2018/7/5
 */

import React from "react";
import {SearchTable} from "../../components";
import {getSelectFormat} from "../../utils";
import {Button, Icon} from "antd";


const getColumns = (context) => [
    {
        title: '竣工验收单号',
        dataIndex: 'number',
        className: 'text-center',
    }, {
        title: (
        <span className="apply-form-list-th">
            <span className="apply-form-list-p1">合同名称</span>
            <br/>
            <span className="apply-form-list-p2">合同编号</span>
        </span>
        ),
        dataIndex: 'itemName',
        sorter: true
    }, {
        title: '实际开工日期',
        dataIndex: 'bill_type',
        sorter: true
    }, {
        title: '实际竣工日期',
        dataIndex: 'create_time',
        sorter: true
    },
    {
        title: '经办人',
        sorter: true
    }, {
        title: '状态',
        dataIndex: 'status',
        sorter: true,
        render: (value, row, index) => {
            return getSelectFormat(context.state.statusData, value)
        }
    }
];
export default class Accept extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updateKey: Date.now(),
            statusData: []
        }
    }

    render() {
        return (
        <SearchTable
        searchOption={{
            title: '竣工验收',
        }}
        tableOption={{
            key: this.state.updateKey,
            pageSize: 10,
            columns: getColumns(this),
            url: '/con/mdydirective/findListData',
            //url:'/con/output/findListData',
            //scroll:{ x:1300 },
            cardProps: {
                title: <div>
                    <Button type='primary' href='/web/accept/create' style={{marginRight: 5}}>
                        <Icon type="plus"/>
                        新增
                    </Button>
                </div>
            },

        }}
        />

        )
    }

}