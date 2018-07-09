// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Form,Button,message} from 'antd';
import CustomizeTabs from '../../../../components/Tabs/index'
import TabPane1 from '../Step_1/tab1'
import TabPane2 from './tab2'
import { request,getQueryString } from  'utils'

class Step2 extends Component {
    state={
        updateKey:Date.now(),
        submitLoading: false,
        data:{},

        //初始值
        itemsId:'',
        itemList:[],
        directId:getQueryString('directId')
    }

    setData = data =>{
        this.mounted && this.setState({
            data
        })
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                //判断是修改还是新增
                if(this.state.directId){
                    values['directId'] = this.state.directId;
                }
                if(this.state.data.contract_id){
                    values['contract_id'] = this.state.data.contract_id;
                }
                if(this.state.data.supplier_id){
                    values['supplier_id'] = this.state.data.supplier_id;
                }
                this.toggleSubmitLoading(true);
                request('/con/supplieritem/save', {
                    method: 'POST',
                    body: values
                })
                    .then(res => {
                        this.toggleSubmitLoading(false);
                        if ( res.state === 'ok' ) {
                            message.success('提交成功!', 3);
                            this.props.history.push(`/web/direct/create/site?directId=${this.state.directId}&biztypeId=${res.data.biztypeId}&items_id=${res.data.items_id}`)
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

    mounted = true;
    componentWillUnmount(){
        this.mounted = null;
    }

    render(){
        const { directId, submitLoading } = this.state;
        return(
            <Form>
                <CustomizeTabs
                    defaultActiveKey='1'
                    tabPaneOptions={
                        [
                            {
                                title:'指令单信息',
                                component:<TabPane1 />
                            }, {
                                title:'指定供应商',
                                component:<TabPane2 form={this.props.form} setData={this.setData.bind(this)} />
                            }
                        ]
                    }
                    stepsAction={
                        <div className="steps-action">
                            <Button type="primary" disabled={submitLoading} onClick={this.handleSubmit} > 下一步，设置审批流 </Button>
                            <Button style={{ marginLeft: 8 }} href={`/web/direct/create/write?directId=${directId}`}> 上一步 </Button>
                        </div>
                    }
                />
            </Form>
        )
    }
}

export default Form.create()(withRouter(Step2))