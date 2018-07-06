// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Row, Col,Alert, Form, Card, message, Button } from 'antd';
import { getFields,request,requestDict,setSelectFormat,getQueryString } from  'utils'
import TableForm from './TableForm.r'

class Step1 extends Component {
    state={
        updateKey:Date.now(),
        submitLoading: false,
        directLoading:true,
        changeTypeData:[],
        specialtyData:[],
        //初始值
        model:{},
        itemList:[],
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(err)
            if (!err) {
                this.toggleSubmitLoading(true);
                //判断是修改还是新增
                const directId = getQueryString('directId');
                if(directId){
                    values['directId'] = directId;
                }
                request('/con/mdydirective/save', {
                    method: 'POST',
                    body: values
                })
                    .then(res => {
                        this.toggleSubmitLoading(false);
                        if ( res.state === 'ok' ) {
                            message.success('提交成功!', 3);
                            this.props.history.push(`/web/direct/create/assign?directId=${res.data}`)
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

    getFindDirectiveData=(directId)=>{
        this.toggleDirectLoading(true);
        request(`/con/mdydirective/findDirectiveData`,{
            params:{
                directId:directId
            }
        })
            .then(res => {
                this.toggleDirectLoading(false);
                if(res.state === 'ok'){
                    this.setState({
                        model:res.data.model,
                        itemList:res.data.itemList,
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                this.toggleDirectLoading(false);
                message.error(`${err.message}`)
            })
    }


    //去数据字典里面的状态
    getChangeType=()=>{
        this.toggleDirectLoading(true);
        requestDict(`['com.moya.contract.enums.MdyDirectiveTypeEnum']`,result=>{
            this.toggleDirectLoading(false);
            this.setState({
                changeTypeData:setSelectFormat(result.MdyDirectiveTypeEnum)
            })
        })
    }
    getSpecialty=()=>{
        this.toggleDirectLoading(true);
        request('/con/mdydirective/initData')
            .then((res) => {
                this.toggleDirectLoading(false);
                if(res.state === 'ok'){
                    this.setState({
                        specialtyData:setSelectFormat(res.data)
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                this.toggleDirectLoading(false);
                message.error(`${err.message}`)
            })
    }
    toggleSubmitLoading = (submitLoading) => {
        this.setState({
            submitLoading
        });
    }
    toggleDirectLoading = (directLoading) => {
        this.setState({
            directLoading
        });
    }
    componentDidMount() {
        this.getChangeType();
        this.getSpecialty();

        //判断是修改还是新增
        const directId = getQueryString('directId');
        directId && this.getFindDirectiveData(getQueryString('directId'))
    }

    render(){
        const { model,itemList, directLoading, submitLoading } = this.state;
        const { form } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError } = form;
        const itemListError = getFieldError('itemList');
        return(
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
                    <div className="advancedForm">
                       <Card loading={directLoading}>
                            <p>指令单基本信息</p>

                            <Row gutter={24}>
                                {
                                    getFields(form, [
                                        {
                                            label:'选择企业',
                                            fieldName:'model.supplier',
                                            type:'companyName',
                                            span:8,
                                            formItemStyle:null,
                                            fieldDecoratorOptions:{
                                                initialValue:model['supplier'],
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择企业'
                                                    }
                                                ]
                                            },
                                        },{
                                            label:'选择项目',
                                            fieldName:'model.items_id',
                                            type:'asyncSelect',
                                            span:8,
                                            formItemStyle:null,
                                            fieldDecoratorOptions:{
                                                initialValue:model['items_id'],
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'选择项目'
                                                    }
                                                ]
                                            },
                                            componentProps:{
                                                fieldTextName:'name',
                                                fieldValueName:'id',
                                                doNotFetchDidMount:true,
                                                fetchAble:getFieldValue('model.supplier') || false,
                                                url:`/con/mdydirective/findItemByCompanyId?company_id=${getFieldValue('model.supplier')}`,

                                            }
                                        },

                                    ],'vertical')
                                }
                            </Row>

                            <Row gutter={24}>
                                {
                                    getFields(form, [
                                        {
                                            label:'变更编号',
                                            fieldName:'model.number',
                                            type:'input',
                                            span:8,
                                            formItemStyle:null,
                                            fieldDecoratorOptions:{
                                                initialValue:model['number'],
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择变更编号'
                                                    }
                                                ]
                                            },
                                        },{
                                            label:'变更类型',
                                            fieldName:'model.modify_type',
                                            type:'select',
                                            span:8,
                                            options:this.state.changeTypeData,
                                            fieldDecoratorOptions:{
                                                initialValue:model['modify_type'],
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择变更类型'
                                                    }
                                                ]
                                            },
                                            componentProps: {
                                                //labelInValue:true,
                                            },
                                        },{
                                            label:'专业',
                                            fieldName:'model.profession_id',
                                            type:'select',
                                            span:8,
                                            options:this.state.specialtyData,
                                            fieldDecoratorOptions:{
                                                initialValue:model['profession_id'],
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择专业'
                                                    }
                                                ]
                                            },
                                        },

                                    ],'vertical')
                                }
                            </Row>

                            <Row gutter={24}>
                                {
                                    getFields(form, [
                                        {
                                            label:'变更主题',
                                            fieldName:'model.modify_title',
                                            type:'input',
                                            span:24,
                                            formItemStyle:null,
                                            fieldDecoratorOptions:{
                                                initialValue:model['modify_title'],
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择变更主题'
                                                    }
                                                ]
                                            },
                                        },{
                                            label:'变更详情',
                                            fieldName:'model.modify_reason_details',
                                            type:'textArea',
                                            span:24,
                                            fieldDecoratorOptions:{
                                                initialValue:model['modify_reason_details'],
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择变更详情'
                                                    }
                                                ]
                                            },
                                        },

                                    ],'vertical')
                                }
                            </Row>
                            <Row gutter={24}>
                                <Col span={3}>

                                </Col>
                                <Col span={8}>
                                    {
                                        getFields(form, [
                                            {
                                                label:'图纸编号',
                                                fieldName:'model.drawing_no',
                                                type:'input',
                                                span:24,
                                                formItemStyle:null,
                                                fieldDecoratorOptions:{
                                                    initialValue:model['drawing_no'],
                                                    rules:[
                                                        {
                                                            required:true,
                                                            message:'请填写图纸编号'
                                                        }
                                                    ]
                                                },
                                            },

                                        ],'vertical')
                                    }
                                    <span className="upload-tip">请上传5m内的png或jpg格式的图纸图片</span>
                                </Col>
                            </Row>
                        </Card>

                        <Card loading={directLoading}>
                            <p>指令单变更项</p>
                            <Row gutter={24}>
                                {getFieldDecorator('itemList', {
                                    initialValue: itemList,
                                    rules:[
                                        {
                                            required:true,
                                            message:'请填写指令单变更项'
                                        }
                                    ]
                                })(<TableForm form={this.props.form} />)}
                                {
                                    itemListError ? <Alert key='errorMsg' message={itemListError.join(',')} type="error" /> : null
                                }

                            </Row>
                        </Card>
                    </div>
                    <div className="steps-action">
                        <Button disabled={submitLoading} type="primary" onClick={this.handleSubmit}> 下一步，指定供应商 </Button>
                    </div>
                </Form>
            </React.Fragment>
        )
    }

}

export default Form.create()(withRouter(Step1))