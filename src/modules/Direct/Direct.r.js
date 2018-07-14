// Created by liuliyuan on 2018/6/28
import React,{Component} from 'react';
import { Button,Icon } from 'antd'
import {Link} from 'react-router-dom'
import { SearchTable } from '../../components'
import { requestDict,setSelectFormat,getSelectFormat,parseJsonToParams } from '../../utils'
import './styles.less'

const fieldsData = (context) => [
    {
        label:'项目名称',
        fieldName:'name',
        type:'input',
        span:6,
        fieldDecoratorOptions:{
            /*rules:[
                {
                    required:true,
                    message:'请输入项目名称'
                }
            ]*/
        },
    }, {
        label:'状态',
        fieldName:'status',
        type:'select',
        span:6,
        options:[{label:'全部', key:''}].concat(context.state.statusData),
        /*fieldDecoratorOptions:{
            initialValue:'',
            rules:[
                {
                    required:true,
                    message:'请输入项目代码'
                }
            ]
        },*/
        componentProps: {
            //labelInValue:true,
        },
    }
]

const statusToJumpUrl = (status, params) =>{
    let url = '';
    switch (status) {
        case '0':
            url = 'cost';  //已创建
            break;
        case '1' :
            url = 'cost'; //审批中
            break;
        case '2':
            url = 'cost'; //已审批
            break;

        case '3':
            url = 'send'; //审批拒绝
            break;
        case '4':
            url = 'send'; //已测算
            break;

        case '5':
            url = 'sign'; //部分下发
            break;
        case '6':
            url = 'sign'; //已下发
            break;

        case '7':
            url = 'complete'; //部分竣工
            break;
        case '8':
            url = 'complete'; //已竣工
            break;

        case '9':
            url = 'change'; //部分结算
            break;
        case '10':
            url = 'change'; //已结算
            break;
        default:
        //break
    }
    return `/web/direct/${url}?${parseJsonToParams(params)}`;
}

const getColumns =(context)=>[

    {
        title: (
            <div className="apply-form-list-th">
                <p className="apply-form-list-p1">指令单编号</p>
                <p className="apply-form-list-p2">变更主题</p>
            </div>
        ),
        width:'10%',
        dataIndex: "number",
        render: (text, record) => (
            <div>
                <p className="apply-form-list-p1">
                    <Link
                        style={{fontWeight: 'bold'}}
                        to={statusToJumpUrl(record.status, {directId:record.id, number:record.number})}
                    >
                        {text}
                    </Link>
                </p>
                <p className="apply-form-list-p2">{record.modify_title}</p>
            </div>
        )
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
            return getSelectFormat(context.state.statusData,value)
        }
    }
];

class Direct extends Component {

    state={
        updateKey:Date.now(),
        statusData:[]
    }

    //去数据字典里面的状态
    getStatus=()=>{
        requestDict(`['com.moya.contract.enums.DirectiveStatusEnum']`,result=>{
            this.setState({
                statusData:setSelectFormat(result['DirectiveStatusEnum'])
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
                    //url:'/con/output/findListData',
                    //scroll:{ x:1300 },
                    cardProps:{
                        title:<div>
                            <Button type='primary' href='/web/direct/create' style={{marginRight:5}} >
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

export default Direct;