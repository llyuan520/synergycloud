// Created by Lee on 2018/7/5

import React, { Component } from 'react';
import { Row, Button, Form, message } from 'antd';
import { request, getQueryString} from 'utils'
import TabPane1 from '../TableForm/tab1'
import CustomizeStaticTabs from 'components/CustomizeStaticTabs'
import Organization from './Organization.r'


class TableFormStepTwo extends Component{

    constructor(){
        super();
        this.state = {
            tabsOneData:{},
        }
    }

    onChange=(data)=>{

    }

    handleSubmit = (e)=>{
        e && e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (err) {
                return;
            }
            let id = getQueryString('id')
            let { members } = value;
            let lastMembers = [];
            if(members.length === 0){
                message.warn('请填写项目结构')
                return;
            }
            for(let i =0; i< members.length;i++){
                lastMembers[i] = {
                    itemsrole_id: members[i].role_name_key,
                    user_id: members[i].username_key
                }

            }
            let url = '/biz/itemsorganzation/save';
            request(url,{
                method:'POST',
                body:{
                    model:{
                        items_id: id,
                        itemsstages_id: (value.model && value.model.stages.key) || '',
                        members: lastMembers
                    }
                }
            }).then((data)=>{
                if(data.state === 'ok'){

                }
            })
                .catch(err => {
                    console.log(err)
                    message.error(err.message)
                })


        })
    }

    backToStepOne = (e)=>{
        this.props.history.goBack()
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
                    tabsOneData: dataSource
                })
            }
        })
        .catch(err => {
            console.log(err)
            message.error(err.message)
        })
    }



    render(){
        return (
            <Row>
                <CustomizeStaticTabs
                    title=""
                    defaultActiveKey='1'
                    tabPaneOptions={
                        [
                            {
                                title:'项目基本信息',
                                component:<TabPane1 data = {this.state.tabsOneData}/>
                            }, {
                                title:'创建项目组织架构',
                                component:<Organization form={this.props.form}/>
                            }
                        ]
                    }
                    stepsAction={
                        <div>
                            <div className="steps-action" style = {{ display: 'inline-block' }}>
                                <Button type="primary" onClick={this.handleSubmit} > 创建 </Button>
                            </div>
                            <div className="steps-action" style = {{ marginLeft: 10 ,display: 'inline-block' }}>
                                <Button type="ghost" onClick={this.backToStepOne} > 上一步 </Button>
                            </div>
                        </div>
                    }
                />
            </Row>


        )
    }
}

export default Form.create()(TableFormStepTwo)