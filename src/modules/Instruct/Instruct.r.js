// Created by liuliyuan on 2018/6/28
import React,{Component} from 'react';
import { SearchTable } from '../../components'
import './index.less'

const fieldsData = [
    {
        label:'项目名称',
        fieldName:'projectName',
        type:'input',
        fieldDecoratorOptions:{
            rules:[
                {
                    required:true,
                    message:'请输入项目名称'
                }
            ]
        },
    }, {
        label:'状态',
        fieldName:'status',
        type:'select',
        options:[
            {
                label:'全部',
                key:'all'
            },
            {
                label:'我方股东',
                key:'1'
            },
            {
                label:'他方股东',
                key:'2'
            }
        ],
        fieldDecoratorOptions:{
            rules:[
                {
                    required:true,
                    message:'请选择状态'
                }
            ]
        },
        componentProps: {
            labelInkey:true,
        },
    }, {
        label:'项目代码',
        fieldName:'code',
        type:'input',
        fieldDecoratorOptions:{
            rules:[
                {
                    required:true,
                    message:'请输入项目代码'
                }
            ]
        },
    },{
        label:'项目名称1',
        fieldName:'projectName1',
        type:'input',
        fieldDecoratorOptions:{
            rules:[
                {
                    required:true,
                    message:'请输入项目名称'
                }
            ]
        },
    }, {
        label:'状态1',
        fieldName:'status1',
        type:'select',
        options:[
            {
                label:'全部',
                key:'all'
            },
            {
                label:'我方股东',
                key:'1'
            },
            {
                label:'他方股东',
                key:'2'
            }
        ],
        fieldDecoratorOptions:{
            rules:[
                {
                    required:true,
                    message:'请选择状态'
                }
            ]
        },
        componentProps: {
            labelInkey:true,
        },
    }, {
        label:'项目代码1',
        fieldName:'code1',
        type:'input',
        fieldDecoratorOptions:{
            rules:[
                {
                    required:true,
                    message:'请输入项目代码'
                }
            ]
        },
    },{
        label:'项目名称2',
        fieldName:'projectName2',
        type:'input',
        fieldDecoratorOptions:{
            rules:[
                {
                    required:true,
                    message:'请输入项目名称'
                }
            ]
        },
    }, {
        label: '状态2',
        fieldName: 'status2',
        type: 'select',
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
            labelInkey: true,
        },
    }
]

const getColumns =(context)=>[
    {
        title: '指令单编号',
        dataIndex: 'status',
        className:'text-center',
    }, {
        title: '所属项目',
        dataIndex: 'lastModifiedDate',
        sorter: true
    },{
        title: '指令单类型',
        dataIndex: 'region',
        sorter: true
    },{
        title: '创建时间',
        dataIndex: 'orgName',
        sorter: true
    },{
        title: '状态',
        dataIndex: 'mainName',
        sorter: true
    }
];

class Instruct extends Component {

    state={
        updateKey:Date.now(),
    }

    render(){

        return(

            <SearchTable
                searchOption={{
                    title:'指令单',
                    fieldsData:fieldsData
                }}
                tableOption={{
                    key:this.state.updateKey,
                    pageSize:10,
                    columns:getColumns(this),
                    url:'/con/mdydirective/findListData',
                    scroll:{
                        x:1300
                    }
                }}
            />
        )
    }
}

export default Instruct;