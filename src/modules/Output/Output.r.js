// Created by Lee on 2018/7/2
import React, {Component} from 'react';
import {Button, Icon} from 'antd';
import {SearchTable} from '../../components'
import {getSelectFormat} from '../../utils'
import './styles.less'
import {Form} from "antd/lib/index";
import {Link} from "react-router-dom";

const fieldsData = (context) => [
    {
        label: '项目名称',
        fieldName: 'outputnumber',
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

const getColumns = (context) => [
    {
        title: '产值单号',
        className: 'text-center',
        render: (e) => (
        <Link to={{pathname: "/web/output/create/write", state: {outputId: e.id}}}>{e.number}</Link>
        )
    }, {
        title: (
        <span className="contract-name-and-code">
                <p className="contract-name-p1">合同名称</p>
                <p className="contract-code-p2">合同编号</p>
            </span>
        ),
        dataIndex: 'contractname',
        className: 'contract-info',
        sorter: true,
        render: (text, record, index) => {
            return (
            <React.Fragment>
                <div className="contract-name-p1">{record.contractname}</div>
                <div className="contract-code-p2">{record.contractnumber}</div>
            </React.Fragment>
            )
        }
    }, {
        title: '含税金额',
        dataIndex: 'tax_amounts',
        sorter: true,
    }, {
        title: '发票状态',
        dataIndex: 'invoicetype',
        sorter: true,
    }, {
        title: '影像状态',
        dataIndex: 'image_status',
        sorter: true,
    }, {
        title: '产值单状态',
        dataIndex: 'output_status',
        sorter: true,
        render: (value, row, index) => {
            return getSelectFormat(context.state.statusData, value)
        }
    }
];


class Output extends Component {


    constructor() {
        super();
        this.state = {
            updateKey: Date.now(),
            statusData: [
                {label: '未进行', key: '0'},
                {label: '进行中', key: '1'},
                {label: '已完成', key: '2'}
            ],
            value: null,
            data: []
        }
    }


    render() {
        return (
        <div className="output-table-style">
            <SearchTable
            searchOption={{
                title: '产值单',
                fieldsData: fieldsData(this)
            }}
            tableOption={{
                key: this.state.updateKey,
                pageSize: 10,
                columns: getColumns(this),
                url: '/con/output/findListData',
                // url: '',
                //scroll:{ x:1300 },
                cardProps: {
                    title: <div>
                        <Button type='primary' href={'/web/Output/create'} style={{marginRight: 5}}>
                            <Icon type="plus"/>
                            产值提报
                        </Button>
                    </div>
                },

            }}
            />
        </div>
        )
    }

}


export default Form.create()(Output);