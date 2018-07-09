// Created by Lee on 2018/7/5

import React, { Component } from 'react';
import { Row,message } from 'antd';
import { request, getQueryString} from 'utils'
import TabPane1 from '../TableForm/tab1'
import TabPane2 from '../TableForm/tab2'
import {Link} from 'react-router-dom'
import AsyncTable from 'components/AsyncTable'
import PropTypes from 'prop-types'
import CustomizeStaticTabs from 'components/CustomizeStaticTabs'


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
                    <Link style={{float: 'right',color:'#ccc'}} to={ `/web?id=${record.number}`  }>
                        {record.name}
                    </Link>
                </p >
                <p className="apply-form-list-p2">{record.number}</p >
            </div>
        )
    },{
        title: '类别',
        dataIndex: 'type',
        sorter: true,
    }, {
        title: '最新金额',
        dataIndex: 'count',
        sorter: true,
    },{
        title: '产值',
        dataIndex: 'output',
        sorter: true,
    },{
        title: '合同状态',
        dataIndex: 'contract_status',
        sorter: true,
    }, {
        title: '竣工状态',
        dataIndex: 'complete_status',
        sorter: true,
    }, {
        title: '结算状态',
        dataIndex: 'status',
        sorter: true,
        // render: (value, row, index) => {
        //     return getSelectFormat(context.state.statusData, value)
        // }
    }
];

class TableFormStepTwo extends Component{

    constructor(){
        super();
        this.state = {
            tableOption:PropTypes.object,
            updateKey: Date.now(),
            tabsOneData:{},
            tabsTwoData:{members:[
                {
                    id:'1111111111111',
                    rolename:'本公司',
                    roletype:'甲方人员',
                    username:'二狗,三狗,四狗'
                }
            ]},
            /**
             * params条件，给table用的
             * */
            filters:{
            },

            /**
             * 控制table刷新，要让table刷新，只要给这个值设置成新值即可
             * */
            tableUpDateKey: Date.now(),
            tableInfo:[
                {
                    url:'',
                    title:'变更单',
                    columns: getChangeColumns(this),
                },{
                    url:'',
                    title:'产值单',
                    columns: getOutputColumns(this),
                },{

                }
            ]
        }
    }

    componentWillMount(){
        // let id = getQueryString('id')
        // let urlSec= '';
        // request(urlSec,{
        //     params:{
        //         id:id,
        //     }
        // }).then((data)=>{
        //     if(data.state === 'ok'){
        //         let model =  data.data.model;
        //         let stages = data.data.stages;
        //         let stages_options = [];
        //         if(stages instanceof Array === true){
        //             for(let i =0;i< stages.length;i++){
        //                 stages_options.push({
        //                     label:stages[i].stages_name,
        //                     key:stages[i].stages_number,
        //                     tax_type: stages[i].tax_type
        //                 })
        //             }
        //         }
        //
        //
        //         let dataSource = {
        //             project_name: model.name,
        //             project_simplename: model.simple_name,
        //             project_id: model.number,
        //             tax_type: model.tax_type,
        //             status: model.status,
        //             longitudeAndLatitude: model.longitude + ',' + model.latitude,
        //             stages_options: stages_options
        //         }
        //
        //         this.setState({
        //             tabsOneData: dataSource
        //         })
        //     }
        // }).catch(err => {
        //     console.log(err)
        //     message.error(err.message)
        // })
    }



    render(){
        const {tableUpDateKey,filters} = this.state;
        return (
        <React.Fragment>
            <div style={{marginTop:64,height:60}}>
                <span style={{ fontSize: 24, fontWeight:600 }}>11111</span>
            </div>
            <Row>


                <CustomizeStaticTabs
                    title=""
                    defaultActiveKey='1'
                    tabPaneOptions={
                        [
                            {
                                title:'单据列表',
                                component:
                                    <AsyncTable
                                        url={''}
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
                            }, {
                                title:'合同基本信息',
                                component:<TabPane1 data = {this.state.tabsOneData}/>
                            }
                        ]
                    }
                />
            </Row>
        </React.Fragment>

        )
    }
}

export default TableFormStepTwo