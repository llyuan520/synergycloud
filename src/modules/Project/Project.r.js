// Created by Lee on 2018/7/2
import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { SearchTable } from '../../components'
import { getSelectFormat } from '../../utils'
import './styles.less'

const fieldsData = (context) => [
    {
        label: '项目名称',
        fieldName: 'name',
        type: 'input',
        span: 6,
    }, {
        label: '状态',
        fieldName: 'status',
        type: 'select',
        span: 6,
        options: [{ label: '全部', key: '' }].concat(context.state.statusData),
        fieldDecoratorOptions: {
            initialValue: { label: '全部', key: '' },
            /*rules:[
                {
                    required:true,
                    message:'请输入项目代码'
                }
            ]*/
        },
        componentProps: {
            labelInValue: true,
        },

    }, {
        label: '项目代码',
        fieldName: 'code',
        type: 'input',
        span: 8,
        fieldDecoratorOptions: {
            rules: [
                {
                    required: true,
                    message: '请输入项目代码'
                }
            ]
        },
    }, {
        label: '项目名称1',
        fieldName: 'projectName1',
        type: 'input',
        span: 8,
        fieldDecoratorOptions: {
            rules: [
                {
                    required: true,
                    message: '请输入项目名称'
                }
            ]
        },
    }, {
        label: '状态1',
        fieldName: 'status1',
        type: 'select',
        span: 8,
        options: [
            {
                label: '全部',
                key: 'all'
            },
            {
                label: '我方股东',
                key: '1'
            },
            {
                label: '他方股东',
                key: '2'
            }
        ],
        fieldDecoratorOptions: {
            rules: [
                {
                    required: true,
                    message: '请选择状态'
                }
            ]
        },
        componentProps: {
            labelInValue: true,
        },
    }, {
        label: '项目代码1',
        fieldName: 'code1',
        type: 'input',
        span: 8,
        fieldDecoratorOptions: {
            rules: [
                {
                    required: true,
                    message: '请输入项目代码'
                }
            ]
        },
    }, {
        label: '项目名称2',
        fieldName: 'projectName2',
        type: 'input',
        span: 8,
        fieldDecoratorOptions: {
            rules: [
                {
                    required: true,
                    message: '请输入项目名称'
                }
            ]
        },
    }, {
        label: '状态2',
        fieldName: 'status2',
        type: 'select',
        span: 8,
        options: [
            {
                label: '全部',
                key: 'all'
            },
            {
                label: '我方股东',
                key: '1'
            },
            {
                label: '他方股东',
                key: '2'
            }
        ],
        fieldDecoratorOptions: {
            rules: [
                {
                    required: true,
                    message: '请选择状态'
                }
            ]
        },
        componentProps: {
            labelInValue: true,
        },
    }
]

const getColumns = (context) => [
    {
        title: (
            <span className="contract-name-and-code">
                <p className="contract-name-p1">项目名称</p>
                <p className="contract-code-p2">项目编码</p>
            </span>
        ),
        dataIndex: 'projectname',
        className: 'contract-info',
        sorter: true,
        render:(text, record, index)=>{
            return (
                <React.Fragment>
                    <div className="contract-name-p1">{record.projectname}</div>
                    <div className="contract-code-p2">{record.projectcode}</div>
                </React.Fragment>
            )
        }
    }, {
        title: '项目简称',
        dataIndex: 'project_abbreviation',
        sorter: true,
    }, {
        title: '企业名称',
        dataIndex: 'company_name',
        sorter: true,
    },{
        title: '合同数量',
        dataIndex: 'contract_count',
        sorter: true,
    },{
        title: '创建时间',
        dataIndex: 'create_date',
        sorter: true,
    }, {
        title: '状态',
        dataIndex: 'status',
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
                { label: '未进行', key: '0' },
                { label: '进行中', key: '1' },
                { label: '已完成', key: '2' }
            ],
            value: null,
        }
    }

    render() {
        return (
            <div className = "output-table-style">
                <SearchTable
                    searchOption={{
                        title: '项目管理',
                        fieldsData: fieldsData(this)
                    }}
                    tableOption={{
                        key: this.state.updateKey,
                        pageSize: 10,
                        columns: getColumns(this),
                        //url:'/con/output/findListData',
                        url:'',
                        //scroll:{ x:1300 },
                        cardProps: {
                            title: <div>
                                <Button type='primary' href={'/web/project/create'} style={{ marginRight: 5 }} >
                                    <Icon type="plus" />
                                    新建项目
                            </Button>
                            </div>
                        },

                    }}
                />
            </div>
        )
    }

}



export default Output;