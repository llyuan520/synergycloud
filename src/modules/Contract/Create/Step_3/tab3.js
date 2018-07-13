// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import { Row, Card,message  } from 'antd';
import DragSortTable from './DragSortingTable.r'
import { getFields,request,setSelectFormat } from  'utils'

class TabPane3 extends Component {

    state = {
        updateKey:Date.now(),
        loading: false,
        submitLoading: false,
        templateId:undefined,
        templateData:[],
        dataSource:[],
    }

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

    getFindByTempId=(tempId)=>{
        this.toggleLoading(true);
        request(`/adt/template/findByTempId`,{
            params:{
                templateId:tempId
            }
        })
            .then(res => {
                this.toggleLoading(false);
                if(res.state === 'ok'){
                    this.setState({
                        dataSource:res.data.nodeList,
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


    toggleLoading = (loading) => {
        this.setState({
            loading
        });
    }

    componentDidMount() {
        //判断是修改还是新增
        this.getFindByCompanyId()
    }

    render(){
        const { updateKey, loading, templateData, dataSource,templateId } = this.state
        return(
            <React.Fragment>
                    <Card
                        key={updateKey}
                        bordered={false}
                        loading={loading}
                        bodyStyle={{
                            paddingTop:0
                        }}
                    >
                        <Row gutter={24} style={{ marginBottom: 12 }}>
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
                                                this.getFindByTempId(value)
                                            }
                                        },
                                    },{
                                        label:'抄送',
                                        fieldName:'model.copytoUserId',
                                        type:'select',
                                        span:16,
                                        options:[],
                                        componentProps:{
                                            mode:'tags'
                                        }
                                    },

                                ])
                            }
                        </Row>

                        <DragSortTable form={this.props.form} dataSource={dataSource} />
                    </Card>
            </React.Fragment>
        )
    }
}

export default TabPane3