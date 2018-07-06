// Created by Lee on 2018/7/5

import React, { Component } from 'react';
import { Row, Button, Form } from 'antd';
// import { InputCell, SelectCell  } from 'components/EditableCell'
import TabPane1 from '../../Direct/Create/Step_1/tab1'
import CustomizeStaticTabs from 'components/CustomizeStaticTabs'
import Organization from './Organization.r'


class TableFormStepTwo extends Component{

    constructor(){
        super();
        this.state = {

        }
    }

    onChange=(data)=>{
        this.setState({
            data
        })
    }

    handleSubmit = (e)=>{
        e && e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (err) {
                return;
            }
            console.log(value)

        })
    }

    backToStepOne = (e)=>{
        console.log(this.props)
        this.props.history.goBack()
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
                                component:<TabPane1 />
                            }, {
                                title:'创建项目组织架构',
                                component:<Organization form={this.props.form} onChange={this.onChange} />
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