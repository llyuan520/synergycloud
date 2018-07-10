// Created by liuliyuan on 2018/6/30
import React from 'react'
import {withRouter} from 'react-router-dom'
import { Form,Button,message } from 'antd';
import CustomizeTabs from '../../../../components/Tabs/index'
import TabPane1 from '../Step_1/tab1'
import TabPane2 from '../Step_2/tab2'
import TabPane3 from './tab3'
import {request,getQueryString } from  'utils'

class Step3 extends React.Component {
    state={
        updateKey:Date.now(),
        submitLoading:false,
        visible:false,
        data:{},
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                let data = [];
                values.dataList.forEach((item,i)=>{
                    let number = i+1;
                    return data.push({
                        ...item,
                        seq:`${number}0`,  //以10为单位
                    })
                })
                values.dataList = data;
                console.log(values);

                this.toggleSubmitLoading(true);
                request('/adt/instance/save', {
                    method: 'POST',
                    body: {
                        ...values,
                        directId:getQueryString('directId'),
                        biztypeId:getQueryString('biztypeId'),
                        itemsId:getQueryString('items_id'),
                    }
                })
                    .then(res => {
                        this.toggleSubmitLoading(false);
                        if ( res.state === 'ok' ) {
                            message.success('提交成功!', 3);
                            this.props.history.push(`/web/direct`)
                            return ;
                        } else {
                            return Promise.reject(res.msg);
                        }
                    })
                    .catch(err => {
                        console.log(err);

                        this.toggleSubmitLoading(false);
                        message.error(`${err.message}`);
                    });

            }
        });
    }

    toggleSubmitLoading = (submitLoading) => {
        this.setState({
            submitLoading
        });
    }

    render(){
        const { submitLoading } = this.state
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
                                    component:<TabPane2 form={this.props.form} display={true} />
                                }, {
                                    title:'设置审批流',
                                    component:<TabPane3 form={this.props.form}  />
                                }
                            ]
                        }
                        stepsAction={
                            <div className="steps-action">
                                <Button type="primary" disabled={submitLoading}  onClick={this.handleSubmit} > 提交 </Button>
                                <Button style={{ marginLeft: 8 }} href={`/web/direct/create/assign?directId=${getQueryString('directId')}`} > 上一步 </Button>
                            </div>
                        }
                    />
                </Form>
            </React.Fragment>
        )
    }
}

export default Form.create()(withRouter(Step3))