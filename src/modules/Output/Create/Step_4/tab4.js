/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React, {Component} from 'react'
import {Row, Card, Form} from 'antd';
import DragSortTable from './DragSortingTable.r'
import {getFields} from 'utils'

class TabPane4 extends Component {

    state = {
        updateKey:Date.now(),
    }
    render(){
        const { form } = this.props;

        return(
            <React.Fragment>
                <Form onSubmit={this.handleSearch} >
                    <Card
                        bordered={false}
                        bodyStyle={{
                            paddingTop:0
                        }}
                    >
                        <Row gutter={24} style={{ marginBottom: 12 }}>
                            {
                                getFields(form, [
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
                </Form>
            </React.Fragment>
        )
    }
}
export default Form.create()(TabPane4)