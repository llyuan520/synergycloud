// Created by liuliyuan on 2018/7/12
import React,{Component} from 'react';
import { Row, Col, Card, Button, Collapse  } from 'antd';
import { getFields,fMoney } from  'utils'

const Panel = Collapse.Panel;
const formItemStyle = {
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:16
    }
}
export default class ItemsCard extends Component {

    state={
        editable:false,
    }


    mounted=true
    componentWillUnmount(){
        this.mounted=null
    }

    toggleIsEditable = () => {
        this.setState({
            editable:!this.state.editable
        })
    }

    render(){

        const { editable } = this.state;
        const { form,data,dataIndex } = this.props;

        return(
            <React.Fragment>
                <Card
                    type="inner"
                    title={
                        <React.Fragment>
                            <b>变更项</b>
                            <span style={{ color: 'rgba(0, 0, 0, 0.647058823529412)' }}>，{data.item}</span>
                        </React.Fragment>
                    }
                >
                    <Collapse bordered={false}>
                        <Panel header={ <span style={{ color:'#47ADBF' }}>查看变更项详情</span> } >
                            <React.Fragment>
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <p>
                                            <label>隐蔽工程及附件：</label>
                                            <span>{data.is_hide==='1' ? '是' : '否'}，{data.hide_des}</span>
                                        </p>
                                    </Col>
                                    <Col span={12}>
                                        <p>
                                            <label>返工及附件：</label>
                                            <span>{data.is_rework==='1' ? '是' : '否'}，{data.rework_des}</span>
                                        </p>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <label>担责及说明：</label>
                                        <span>{data.is_accountability==='1' ? '是' : '否'}，{data.accountability_reason}</span>
                                    </Col>
                                    <Col span={12}>
                                        <label>预计工作时间：</label>
                                        <span>{data.planDateStart}  ～  {data.planDateEnd}</span>
                                    </Col>
                                </Row>
                            </React.Fragment>
                        </Panel>
                    </Collapse>

                    {
                        editable ? <React.Fragment>
                                        <Row gutter={24} style={{ marginTop:10 }}>
                                            {
                                                getFields(form, [
                                                    {
                                                        label: '成本测算金额',
                                                        fieldName: `${dataIndex}.amount`,
                                                        type: 'input',
                                                        span: 12,
                                                        formItemStyle,
                                                        fieldDecoratorOptions: {
                                                            initialValue:data.amount,
                                                            rules: [
                                                                {
                                                                    required: true,
                                                                    message: '请选择合同及供应商'
                                                                }
                                                            ]
                                                        },
                                                    },{
                                                        label: '责任扣款金额',
                                                        fieldName: `${dataIndex}.withhold_amount`,
                                                        type: 'input',
                                                        span: 12,
                                                        formItemStyle,
                                                        fieldDecoratorOptions: {
                                                            initialValue:data.withhold_amount,
                                                            rules: [
                                                                {
                                                                    required: true,
                                                                    message: '请选择合同及供应商'
                                                                }
                                                            ]
                                                        },
                                                    }

                                                ])
                                            }
                                        </Row>
                                        <Row gutter={24}>
                                            {
                                                getFields(form, [
                                                    {
                                                        label: '成本测算说明',
                                                        fieldName: `${dataIndex}.cost_measure_spec`,
                                                        type: 'input',
                                                        span: 24,
                                                        formItemStyle:{
                                                            labelCol:{
                                                                span:2
                                                            },
                                                            wrapperCol:{
                                                                span:22
                                                            }
                                                        },
                                                        fieldDecoratorOptions: {
                                                            initialValue:data.cost_measure_spec,
                                                            /*rules: [
                                                             {
                                                             required: true,
                                                             message: '请选择合同及供应商'
                                                             }
                                                             ]*/
                                                        },
                                                    }

                                                ])
                                            }
                                        </Row>
                                    </React.Fragment>
                            :
                            <React.Fragment>
                                <Row gutter={24} style={{ marginTop:10 }}>
                                    <Col span={12}>
                                        <p>
                                            <label>成本测算金额：</label>
                                            <span style={{color: 'rgba(255, 0, 0, 0.647058823529412)'}}>{data.amount && fMoney(data.amount)}</span>
                                        </p>
                                    </Col>
                                    <Col span={12}>
                                        <p>
                                            <label>责任扣款金额：</label>
                                            <span>{data.amount && fMoney(data.withhold_amount)}</span>
                                        </p>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={24}>
                                        <label>成本测算说明：</label>
                                        <span>{data.cost_measure_spec}</span>
                                    </Col>
                                </Row>

                            </React.Fragment>
                    }

                    <p
                        style={{ marginTop: 22 }}
                    >
                        {
                            editable ? <Button type="primary" ghost onClick={e => this.saveRow(e, dataIndex)} >保存</Button> : <Button type="primary" ghost onClick={this.toggleIsEditable}>修改</Button>
                        }

                    </p>
                </Card>

            </React.Fragment>
        )
    }
}