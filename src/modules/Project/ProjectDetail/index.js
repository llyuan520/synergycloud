// Created by Lee on 2018/7/5
import React, { Component } from 'react';
import { Row,message } from 'antd';
import { request, getQueryString} from 'utils'
import TabPane1 from './tab1'
import TabPane2 from './tab2'
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
            idArr:[]
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
                console.log(data)
                let model =  data.data.model;
                let stages = data.data.stages;
                let stages_options = [];
                let idArr = [];
                if(stages instanceof Array === true){
                    for(let i =0;i< stages.length;i++){
                        let tax_type_obj = JSON.parse(stages[i].tax_type);
                        stages_options.push({
                            label:stages[i].stages_name,
                            code:stages[i].stages_number,
                            tax_type: tax_type_obj.label,
                            tax_type_key: tax_type_obj.key,
                            key: stages[i].id,
                            editable:false,
                            isNew:false,
                        })
                        idArr.push(stages[i].id)
                    }
                }

                let tax_type_obj = JSON.parse(model.tax_type);
                let status_obj = JSON.parse(model.status);
                let dataSource = {
                    project_name: model.name,
                    project_simplename: model.simple_name,
                    project_id: model.number,
                    tax_type: tax_type_obj.label,
                    tax_type_key: tax_type_obj.key,
                    status: status_obj.label,
                    status_key: status_obj.key,
                    longitudeAndLatitude: model.longitude + ',' + model.latitude,
                    stages_options: stages_options
                }

                this.setState({
                    tabsTwoData: dataSource,
                    idArr:idArr
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
                        defaultActiveKey='1'
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
                                    component:<TabPane2 idArr = {this.state.idArr}/>
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