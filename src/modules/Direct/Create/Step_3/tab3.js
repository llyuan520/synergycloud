// Created by liuliyuan on 2018/7/2
import * as React from 'react'
import { Row, Card,message,Alert  } from 'antd';
import DragSortTable from './DragSortingTable.r'
import { getFields,request,setSelectFormat,getQueryString } from  'utils'

class TabPane3 extends React.Component {

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

    componentDidMount() {

        let action = [this.getFindByCompanyId()];
        if(this.state.itemsId){
            action.push(this.getFindUsersByItem(this.state.itemsId))
        }
        let pLoader = Promise.all(action);
            pLoader.then(() => {
                this.setState({
                    loaded: true
                });
            }).catch( err => {
                console.log(err);
                message.error(`${err.message}`)
            });

    }

    //获取审批模板
    getFindByCompanyId=()=>{
        request(`/adt/template/findByCompanyId`)
            .then(res => {
                if(res.state === 'ok'){
                    this.setState({
                        templateData:setSelectFormat(res.data, 'id'),
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                message.error(`${err.message}`)
            })
    }

    //获取抄送
    getFindUsersByItem=(itemsId)=>{
        request(`/biz/itemsroles/findUsersByItem`,{
            params:{
                itemsId:itemsId
            }
        })
            .then(res => {
                if(res.state === 'ok'){
                    this.setState({
                        copytoUserIdData:setSelectFormat(res.data, 'userId','userName'),
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
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

    toggleSiteLoading = (siteLoading) => {
        this.setState({
            siteLoading
        });
    }

    render(){
        const { loaded,siteLoading, templateData, copytoUserIdData, dataList,templateId } = this.state;
        const { getFieldDecorator, getFieldError } = this.props.form;
        const dataListError = getFieldError('dataList');
        return(
            <React.Fragment>
                    <Card
                        bordered={false}
                        loading={!loaded}
                        bodyStyle={{
                            paddingTop:0
                        }}
                    >
                        <Row gutter={24}>
                            {
                                getFields(this.props.form, [
                                    {
                                        label:'审批模板',
                                        fieldName:'templateId',
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
                                        fieldName:'copytoUserId',
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