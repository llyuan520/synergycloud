// Created by liuliyuan on 2018/6/28
import React,{Component} from 'react';
import { Button,Icon } from 'antd'
import { SearchTable } from '../../components'
import { requestDict,setFormat } from '../../utils'
import './index.less'


const formatData=(data,t)=>{
    return data.filter(d=>d.key === t)[0].label
}

const fieldsData = (context) => [
    {
        label:'项目名称',
        fieldName:'name',
        type:'input',
    }, {
        label:'状态',
        fieldName:'status',
        type:'select',
        options:[{label:'全部', key:''}].concat(context.state.statusData),
        fieldDecoratorOptions:{
            initialValue: '',
            /*rules:[
                {
                    required:true,
                    message:'请输入项目代码'
                }
            ]*/
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
        dataIndex: 'number',
        className:'text-center',
    }, {
        title: '所属项目',
        dataIndex: 'itemName',
        sorter: true
    },{
        title: '指令单类型',
        dataIndex: 'bill_type',
        sorter: true
    },{
        title: '创建时间',
        dataIndex: 'create_time',
        sorter: true
    },{
        title: '状态',
        dataIndex: 'status',
        sorter: true,
        render: (value, row, index)=>{
            return formatData(context.state.statusData,value)
        }
    }
];

class Instruct extends Component {

    state={
        updateKey:Date.now(),
        statusData:[]
    }


    //去数据字典里面的状态
    getStatus=()=>{
        requestDict('com.moya.contract.enums.DirectiveStatusEnum',result=>{
            this.setState({
                statusData:setFormat(result)
            })
        })
    }

    componentDidMount() {
        this.getStatus()
    }

    render(){

        return(

            <SearchTable
                searchOption={{
                    title:'指令单',
                    fieldsData:fieldsData(this)
                }}
                tableOption={{
                    key:this.state.updateKey,
                    pageSize:10,
                    columns:getColumns(this),
                    url:'/con/mdydirective/findListData',
                    scroll:{
                        x:1300
                    },

                    cardProps:{
                        title:<div>
                            <Button type='primary' style={{marginRight:5}} >
                                <Icon type="plus" />
                                新增
                            </Button>
                        </div>
                    },

                }}
            />
        )
    }
}

export default Instruct;