// Created by liuliyuan on 2018/7/4
import React,{Component} from 'react';
import { Row, Col, Card, Collapse  } from 'antd';
import { getFields } from 'utils'

import './styles.less'

const Panel = Collapse.Panel;
export default class Send extends Component {
    state={
        updateKey:Date.now(),
        isVisible:false,
    }

    getCollapseDetail = () =>{
        return (
            <React.Fragment>
                <Row gutter={24}>
                    <Col span={12}>
                        <p>
                            <label>隐蔽工程及附件：</label>
                            <span>有，xxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <label>返工及附件：</label>
                            <span>变更编号变更编号变更编号变更编号变更编号变更编号变更编号</span>
                        </p>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <label>担责及说明：</label>
                        <span>是，xxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                    </Col>
                    <Col span={12}>
                        <label>预计工作时间：</label>
                        <span>2015-10-02    ～    2015-10-10</span>
                    </Col>
                </Row>

                <Row gutter={24} style={{ marginTop:24 }}>
                    <Col span={12}>
                        <p>
                            <label>成本测算金额：</label>
                            <span style={{color: 'rgba(255, 0, 0, 0.647058823529412)'}}>228,888.00</span>
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <label>责任扣款金额：</label>
                            <span>10,000.00</span>
                        </p>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <label>成本测算说明：</label>
                        <span>是，xxxxxxxxxxxxxxxxxxxxxxxxxxxx  xxxxxxxxxxxxxxxxxxxxxxxxxxxx  xxxxxxxxxxxxxxxxxxxxxxxxxxxx  xxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                    </Col>
                </Row>
            </React.Fragment>
        )
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
                        <Card
                            style={{ border:'none',marginTop:'24px' }}
                            bodyStyle={{
                                padding:0
                            }}
                        >
                            <React.Fragment>
                                <Row gutter={24} className='popModal-row-item' style={{ marginBottom: 12 }}>
                                    <Col span={4}>
                                        {
                                            getFields(this.props.form, [
                                                {
                                                    label: <a style={{ display: 'inline-block'  }}>供应商A</a>,
                                                    fieldName: 'incomeTaxAuth',
                                                    type: 'checkbox',
                                                    //hideLabel:true,
                                                    showLayout:'inline',
                                                    span: 24,
                                                    fieldDecoratorOptions: {
                                                        //initialValue: parseInt(record.incomeTaxAuth,0) === 1,
                                                        valuePropName: 'checked',
                                                    },

                                                },

                                            ])
                                        }
                                    </Col>
                                    <Col span={20}>
                                        <span style={{ float:'right',color: 'rgba(153, 153, 153, 0.847058823529412)' }}>合同名称：青岛万科未来城项目底商幕墙工程合同</span>
                                    </Col>
                                </Row>
                            </React.Fragment>
                            <Collapse>
                                <Panel header={
                                    <React.Fragment>
                                        <span style={{ fontWeight: 'bold' }}>变更项1</span>
                                        <span style={{ color: 'rgba(0, 0, 0, 0.647058823529412)' }}>，三房一厅的方案修改布线</span>
                                    </React.Fragment>
                                }>
                                    {
                                        this.getCollapseDetail()
                                    }
                                </Panel>
                            </Collapse>
                        </Card>
                    </Card>

            </React.Fragment>
        )
    }
}