/**
 *
 * Created by fanzhe on 2018/7/5
 */

import React,{Component} from 'react';
import { Button,Icon } from 'antd'
import { SearchTable } from '../../components'
import { requestDict,setSelectFormat,getSelectFormat } from '../../utils'
import './styles.less'

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
            return getSelectFormat(context.state.statusData,value)
        }
    }
];

class Contract extends Component {

    state={
        updateKey:Date.now(),
        statusData:[]
    }


    //去数据字典里面的状态
    getStatus=()=>{
        requestDict('com.moya.contract.enums.DirectiveStatusEnum',result=>{
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
            //scroll:{ x:1300 },
            cardProps:{
                title:<div>
                    <Button type='primary' href={'/web/contract/create/write'} style={{marginRight:5}} >
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

export default Contract;