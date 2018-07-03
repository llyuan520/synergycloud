// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import {  Row, Card  } from 'antd';
import DragSortTable from './DragSortingTable.r'
import { getFields } from  'utils'

export default class TabPane3 extends Component {

    state = {
        updateKey:Date.now(),
    }

    render(){
        return(
            <React.Fragment>
                    <Card
                        bordered={false}
                        bodyStyle={{
                            paddingTop:0
                        }}
                    >
                        <Row gutter={24} style={{ marginBottom: 12 }}>
                            {
                                getFields(this.props.form, [
                                    {
                                        label:'审批模板',
                                        fieldName:'approvalTemplate',
                                        type:'select',
                                        span:8,
                                        options:[{label:'全部', key:''}],
                                        fieldDecoratorOptions:{
                                            initialValue:{label:'全部', key:''},
                                            rules:[
                                                {
                                                    required:true,
                                                    message:'请选择变更类型'
                                                }
                                            ]
                                        },
                                        componentProps: {
                                            labelInValue:true,
                                        },
                                    },{
                                        label:'抄送',
                                        fieldName:'copy',
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

                        <DragSortTable form={this.props.form} />
                    </Card>

            </React.Fragment>
        )
    }
}