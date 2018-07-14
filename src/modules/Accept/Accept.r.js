/**
 *
 *
 * Created by fanzhe on 2018/7/5
 */

import React from "react";
import {SearchTable} from "../../components";
import {getSelectFormat, requestDict, setSelectFormat} from "../../utils";
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
        sorter: true,
        render: (text, record) => {
            return (<span className="apply-form-list-th">
            <span className="apply-form-list-p1">{record.contractname}</span>
            <br/>
            <span className="apply-form-list-p2">{record.contractnumber}</span>
        </span>)
        }
    }, {
        title: '实际开工日期',
        dataIndex: 'actual_startdate',
        sorter: true
    }, {
        title: '实际竣工日期',
        dataIndex: 'actual_enddate',
        sorter: true
    },
    {
        title: '经办人',
        sorter: true,
        dataIndex: "create_by",
        key: "create_by",
    }, {
        title: '状态',
        dataIndex: 'status',
        sorter: true,
        render: (value, row, index) => {
            return getSelectFormat(context.state.statusData, value)
        }
    }
];

const fieldsData = (context) => [
    {
        label: '合同编号',
        fieldName: 'contractnumber',
        type: 'input',
        span: 6,
    },
    {
        label: '经办状态',
        fieldName: 'flag',
        type: 'select',
        span: 6,
        options: [{label: '全部', key: ''}, {label: '由我经办', key: 1}, {label: '不由我经办', key: 0}],
        fieldDecoratorOptions: {
            initialValue: "",
        },
        componentProps: {
            // labelInValue: true,
        },

    },
    {
        label: '状态',
        fieldName: 'status',
        type: 'select',
        span: 6,
        options: [{label: '全部', key: ''}].concat(context.state.statusData),
        fieldDecoratorOptions: {
            initialValue: "",
        },
        componentProps: {
            // labelInValue: true,
        },

    },

]

export default class Accept extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updateKey: Date.now(),
            statusData: []
        }
    }


    getStatus = () => {
        requestDict('com.moya.contract.enums.DirectiveStatusEnum', result => {
            this.setState({
                statusData: setSelectFormat(result['DirectiveStatusEnum'])
            })
        })
    };

    componentDidMount() {
        this.getStatus()
    }

    render() {
        return (
        <SearchTable
        searchOption={{
            title: '竣工验收',
            fieldsData: fieldsData(this)
        }}
        tableOption={{
            key: this.state.updateKey,
            pageSize: 10,
            columns: getColumns(this),
            url: '/con/acceptance/findListData',
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