// Created by liuliyuan on 2018/7/4
import React,{Component} from 'react'
import { Form, Card, Button, Row, Col, Collapse   } from 'antd';
import BasicLayout from '../../../components/BasicLayout'
import TabPane1 from '../../../modules/Direct/Create/Step_1/tab1'

const Panel = Collapse.Panel;

class SignDirect extends Component {

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
            <BasicLayout
                title="变更编号：xx一期-指令单-分包-土建-0127"
            >
                <div className="advancedForm">
                    <Card>
                        <p>指令单基本信息</p>

                        <TabPane1 style={{ padding:0 }} />

                    </Card>

                    <Card>
                        <Collapse defaultActiveKey="1">
                            <Panel
                                key="1"
                                header={
                                    <React.Fragment>
                                        <span style={{ fontWeight: 'bold' }}>变更项1</span>
                                        <span style={{ color: 'rgba(0, 0, 0, 0.647058823529412)' }}>，三房一厅的方案修改布线</span>
                                    </React.Fragment>
                                }
                            >
                                {
                                    this.getCollapseDetail()
                                }
                            </Panel>
                        </Collapse>
                        <p></p>
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
                    <div className="steps-action">
                        <Button type="primary" onClick={this.handleSubmit}> 签收 </Button>
                    </div>
                </div>
            </BasicLayout>

        )
    }
}

export default Form.create()(SignDirect)