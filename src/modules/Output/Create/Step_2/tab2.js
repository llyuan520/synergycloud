// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import {  Row, Col, Card, Button } from 'antd';
import PopModal from './PopModal'

export default class TabPane2 extends Component {
    state={
        updateKey:Date.now(),
        visible:false,
        modalConfig:{
            type:''
        },
    }

    toggleModalVisible=visible=>{
        this.setState({
            visible
        })
    }

    showModal=type=>{
        this.toggleModalVisible(true)
        this.setState({
            modalConfig:{
                type,
                id:this.state.selectedRowKeys
            }
        })
    }

    render(){

        const { visible,modalConfig } = this.state
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
                        <p
                            style={{
                                fontSize: 14,
                                color: 'rgba(0, 0, 0, 0.85)',
                                marginBottom: 16,
                                fontWeight: 500,
                            }}
                        >
                            <a style={{ display: 'inline-block'  }}>供应商A</a>
                            <span style={{ float:'right',color: 'rgba(153, 153, 153, 0.847058823529412)' }}>合同名称：青岛万科未来城项目底商幕墙工程合同</span>
                        </p>
                        <Card
                            type="inner"
                            title={
                                <React.Fragment>
                                    <span style={{ fontWeight: 'bold' }}>变更项1</span>
                                    <span style={{ color: 'rgba(0, 0, 0, 0.647058823529412)' }}>，三房一厅的方案修改布线</span>
                                </React.Fragment>
                            }
                            extra={
                                <React.Fragment>
                                    <a href="#/" style={{ marginRight:10 }}>编辑</a>
                                    <a href="#/" style={{ color: '#F07060' }}>删除</a>
                                </React.Fragment>
                            }
                        >
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
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title={
                                <React.Fragment>
                                    <span style={{ fontWeight: 'bold' }}>变更项1</span>
                                    <span style={{ color: 'rgba(0, 0, 0, 0.647058823529412)' }}>，三房一厅的方案修改布线</span>
                                </React.Fragment>
                            }
                            extra={
                                <React.Fragment>
                                    <a href="#/" style={{ marginRight:10 }}>编辑</a>
                                    <a href="#/" style={{ color: '#F07060' }}>删除</a>
                                </React.Fragment>
                            }
                        >
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
                        </Card>
                    </Card>

                    <Card
                        style={{border:'none', marginTop:'24px' }}
                        bodyStyle={{
                            padding:0
                        }}
                    >
                        <p
                            style={{
                                fontSize: 14,
                                color: 'rgba(0, 0, 0, 0.85)',
                                marginBottom: 16,
                                fontWeight: 500,
                            }}
                        >
                            <a style={{ display: 'inline-block'  }}>供应商B</a>
                            <span style={{ float:'right',color: 'rgba(153, 153, 153, 0.847058823529412)' }}>合同名称：青岛万科未来城项目底商幕墙工程合同</span>
                        </p>
                        <Card
                            type="inner"
                            title={
                                <React.Fragment>
                                    <span style={{ fontWeight: 'bold' }}>变更项1</span>
                                    <span style={{ color: 'rgba(0, 0, 0, 0.647058823529412)' }}>，三房一厅的方案修改布线</span>
                                </React.Fragment>
                            }
                            extra={
                                <React.Fragment>
                                    <a href="#/" style={{ marginRight:10 }}>编辑</a>
                                    <a href="#/" style={{ color: '#F07060' }}>删除</a>
                                </React.Fragment>
                            }
                        >
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
                        </Card>
                    </Card>

                    <Button
                        style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                        type="dashed"
                        onClick={()=>this.showModal('add')}
                        icon="plus"
                    >
                        指定供应商
                    </Button>

                </Card>


                <PopModal
                    visible={visible}
                    modalConfig={modalConfig}
                    toggleModalVisible={this.toggleModalVisible}
                    setData={this.props.setData}
                />
            </React.Fragment>
        )
    }

}