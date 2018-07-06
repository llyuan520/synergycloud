// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Form,Button } from 'antd';
import CustomizeTabs from '../../../../components/Tabs/index'
import TabPane1 from '../Step_1/tab1'
import TabPane2 from '../Step_2/tab2'
import TabPane3 from './tab3'
import { getQueryString } from  'utils'

class Step3 extends Component {
    state={
        updateKey:Date.now(),
        visible:false,
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);

            }
        });
    }

    handleSave = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);

            }
        });
    }

    componentDidMount() {
        //判断是修改还是新增
        const directId = getQueryString('directId');
        directId && this.getFindDirectiveData(getQueryString('directId'))
    }

    render(){

        return(
            <React.Fragment>
                <Form>
                    <CustomizeTabs
                        defaultActiveKey='2'
                        tabPaneOptions={
                            [
                                {
                                    title:'指令单信息',
                                    component:<TabPane1 />
                                }, {
                                    title:'指定供应商',
                                    component:<TabPane2 display={true} />
                                }, {
                                    title:'设置审批流',
                                    component:<TabPane3 form={this.props.form}  />
                                }
                            ]
                        }
                        stepsAction={
                            <div className="steps-action">
                                <Button type="primary" onClick={this.handleSubmit} > 提交 </Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleSave} > 保存 </Button>
                                <Button style={{ marginLeft: 8 }} href={`/web/direct/create/assign`} > 上一步 </Button>
                            </div>
                        }
                    />
                </Form>
            </React.Fragment>
        )
    }
}

export default Form.create()(withRouter(Step3))