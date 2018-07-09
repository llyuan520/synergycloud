// Created by Lee on 2018/7/5

import React, { Component } from 'react';
import { Row,message } from 'antd';
import { request, getQueryString} from 'utils'
import TabPane1 from '../TableForm/tab1'
import TabPane2 from '../TableForm/tab2'

import PropTypes from 'prop-types'
import CustomizeStaticTabs from 'components/CustomizeStaticTabs'
import Tableintabs from './tableInTabs'


class TableFormStepTwo extends Component{

    constructor(){
        super();
        this.state = {
            tablePageKey:Date.now(),
            tableOption:PropTypes.object,
            updateKey: Date.now(),
            tabsOneData:{},
            tabsTwoData:{},
            tabsThirdData:{members:[
                {
                    id:'1111111111111',
                    rolename:'本公司',
                    roletype:'甲方人员',
                    username:'二狗,三狗,四狗'
                }
            ]},

        }
    }

    componentWillMount(){
        let id = getQueryString('id')
        let urlSec= '/biz/items/findEditData';
        request(urlSec,{
            params:{
                id:id,
            }
        }).then((data)=>{
            if(data.state === 'ok'){
                let model =  data.data.model;
                let stages = data.data.stages;
                let stages_options = [];
                if(stages instanceof Array === true){
                    for(let i =0;i< stages.length;i++){
                        stages_options.push({
                            label:stages[i].stages_name,
                            key:stages[i].stages_number,
                            tax_type: stages[i].tax_type
                        })
                    }
                }


                let dataSource = {
                    project_name: model.name,
                    project_simplename: model.simple_name,
                    project_id: model.number,
                    tax_type: model.tax_type,
                    status: model.status,
                    longitudeAndLatitude: model.longitude + ',' + model.latitude,
                    stages_options: stages_options
                }

                this.setState({
                    tabsTwoData: dataSource
                })
            }
        }).catch(err => {
            console.log(err)
            message.error(err.message)
        })

        //获取项目组织架构的
        let urlThird = '/biz/itemsorganzation/findViewData';
        request(urlThird,{
            params:{
                items_id:id,
            }
        }).then((data)=>{
            console.log(data);
            console.log('-------------')
            if(data.state === 'ok'){
                console.log(data);
                let dataSource = {

                }

                this.setState({
                    tabsThirdData: dataSource
                })
            }
        }).catch(err => {
                console.log(err)
                message.error(err.message)
        })

    }



    render(){
        const { tablePageKey } = this.state
        return (
            <React.Fragment>

                <div style={{paddingTop:120,paddingLeft:60,height:60,}}>
                    <span style={{ fontSize: 24, fontWeight:600 }}>{this.state.tabsTwoData.project_name}</span>
                </div>
                <Row>
                    <CustomizeStaticTabs
                        title=""
                        defaultActiveKey='0'
                        tabPaneOptions={
                            [
                                {
                                   title:'合同列表',
                                    component:<Tableintabs key={tablePageKey} />

                                }, {
                                    title:'项目基本信息',
                                    component:<TabPane1 data = {this.state.tabsTwoData}/>
                                }, {
                                    title:'项目组织架构',
                                    component:<TabPane2 data = {this.state.tabsThirdData} />
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