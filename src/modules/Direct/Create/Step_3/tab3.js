// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import { Row, Card,message,Alert  } from 'antd';
import DragSortTable from './DragSortingTable.r'
import { getFields,request,setSelectFormat,getQueryString } from  'utils'

class TabPane3 extends Component {

    state = {
        updateKey:Date.now(),
        loading: false,
        siteLoading:false,
        submitLoading: false,
        itemsId:getQueryString('items_id'),
        templateId:undefined,
        templateData:[],
        copytoUserIdData:[],
        dataList:[],
    }

    //获取审批模板
    getFindByCompanyId=()=>{
        this.toggleLoading(true);
        request(`/adt/template/findByCompanyId`)
            .then(res => {
                this.toggleLoading(false);
                if(res.state === 'ok'){
                    this.setState({
                        templateData:setSelectFormat(res.data, 'id'),
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                this.toggleLoading(false);
                message.error(`${err.message}`)
            })
    }

    //获取抄送
    getFindUsersByItem=(itemsId)=>{
        this.toggleLoading(true);
        request(`/biz/itemsroles/findUsersByItem`,{
            params:{
                itemsId:itemsId
            }
        })
            .then(res => {
                this.toggleLoading(false);
                if(res.state === 'ok'){
                    this.setState({
                        copytoUserIdData:setSelectFormat(res.data, 'userId','userName'),
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                this.toggleLoading(false);
                message.error(`${err.message}`)
            })
    }

    //获取审批流
    getFindByTempId=(tempId)=>{
        this.toggleSiteLoading(true);
        request(`/adt/template/findByTempId`,{
            params:{
                templateId:tempId,
                itemsId:getQueryString('items_id')
            }
        })
            .then(res => {
                this.toggleSiteLoading(false);
                if(res.state === 'ok'){
                    this.setState({
                        dataList:res.data.nodeList,
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                this.toggleSiteLoading(false);
                message.error(`${err.message}`)
            })
    }


    toggleLoading = (loading) => {
        this.setState({
            loading
        });
    }

    toggleSiteLoading = (siteLoading) => {
        this.setState({
            siteLoading
        });
    }

    componentDidMount() {
        //判断是修改还是新增
        this.getFindByCompanyId()
        this.state.itemsId && this.getFindUsersByItem(this.state.itemsId)
    }

    render(){
        const { loading,siteLoading, templateData, copytoUserIdData, dataList,templateId } = this.state;
        const { getFieldDecorator, getFieldError } = this.props.form;
        const dataListError = getFieldError('dataList');
        return(
            <React.Fragment>
                    <Card
                        bordered={false}
                        loading={loading}
                        bodyStyle={{
                            paddingTop:0
                        }}
                    >
                        <Row gutter={24}>
                            {
                                getFields(this.props.form, [
                                    {
                                        label:'审批模板',
                                        fieldName:'model.templateId',
                                        type:'select',
                                        span:8,
                                        options:templateData,
                                        fieldDecoratorOptions:{
                                            initialValue:templateId,
                                            rules:[
                                                {
                                                    required:true,
                                                    message:'请选择变更类型'
                                                }
                                            ]
                                        },
                                        componentProps: {
                                            //labelInValue:true,
                                            onChange:(value)=>{
                                                this.setState({
                                                    templateId:value
                                                })
                                                value !== '' && this.getFindByTempId(value)
                                            }
                                        },
                                    },{
                                        label:'抄送',
                                        fieldName:'model.copytoUserId',
                                        type:'select',
                                        span:16,
                                        options:copytoUserIdData,
                                        componentProps:{
                                            mode:'multiple'
                                        }
                                    },

                                ])
                            }
                        </Row>
                    </Card>
                    <Card
                        bordered={false}
                        loading={siteLoading}
                        bodyStyle={{
                            paddingTop:0
                        }}
                    >
                        <Row gutter={24}>
                            {getFieldDecorator('dataList', {
                                initialValue: dataList,
                                rules:[
                                    {
                                        required:true,
                                        message:'请选设置审批流'
                                    }
                                ]
                            })(<DragSortTable form={this.props.form} />)}
                            {
                                dataListError ? <Alert key='errorMsg' message={dataListError.join(',')} type="error" /> : null
                            }
                        </Row>

                    </Card>
            </React.Fragment>
        )
    }
}

export default TabPane3