/**
 *
 * @fanz
 */

import React,{Component} from 'react';
import { Button,Icon } from 'antd'
import { SearchTable } from '../../components'
import { requestDict,setSelectFormat,getSelectFormat } from '../../utils'
import './styles.less'

const fieldsData = (context) => [
  {
    label:'项目名称',
    fieldName:'name',
    type:'input',
    span:6,
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
    span:6,
    options:[{label:'全部', key:''}].concat(context.state.statusData),
    fieldDecoratorOptions:{
      initialValue: {label:'全部', key:''},
      rules:[
        {
          required:true,
          message:'请输入项目代码'
        }
      ]
    },
    componentProps: {
      labelInValue:true,
    },

  }, {
    label:'项目代码',
    fieldName:'code',
    type:'input',
    span:8,
  },{
    label:'项目名称1',
    fieldName:'projectName1',
    type:'input',
    span:8,
  }, {
    label:'状态1',
    fieldName:'status1',
    type:'select',
    span:8,
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
    componentProps: {
      labelInValue:true,
    },
  }, {
    label:'项目代码1',
    fieldName:'code1',
    type:'input',
    span:8,
  },{
    label:'项目名称2',
    fieldName:'projectName2',
    type:'input',
    span:8,
  }, {
    label: '状态2',
    fieldName: 'status2',
    type: 'select',
    span:8,
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
    componentProps: {
      labelInValue: true,
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
      return getSelectFormat(context.state.statusData,value)
    }
  }
];

class Output extends Component {

  state={
    updateKey:Date.now(),
    statusData:[]
  }


  //去数据字典里面的状态
  getStatus=()=>{
    requestDict('com.moya.contract.enums.DirectiveStatusEnum',result=>{
      this.setState({
        statusData:setSelectFormat(result)
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
          <Button type='primary' href={'/web/output/create'} style={{marginRight:5}} >
            <Icon type="plus" />
            产值报告
          </Button>
        </div>
      },

    }}
    />
    )
  }
}

export default Output;