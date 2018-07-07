// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import {  Card, Row, Col } from 'antd';

export default class TabPane1 extends Component{


    render () {

        const { style, loading, data } = this.props;

        return (
            <Card loading={loading} style={{ padding: 0, border: 0 , ...style }}>
                {/*<Row gutter={24}>
             {
             data.map((item, index) => {
             return (
             <Col span={item.colSpan || 12} key={index}>
             {
             item.label && <p>{item.label}</p>
             }
             {
             item.field && <p className="cGray">{item.field}</p>
             }
             </Col>
             )
             } )
             }
             </Row>*/}

                <Row gutter={24}>
                    <Col span={8}>
                        <p>项目名称</p>
                        <p className="cGray">{data.itemname}</p>
                    </Col>
                    <Col span={8}>
                        <p>变更编号</p>
                        <p className="cGray">{data.number}</p>
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop:24 }}>
                    <Col span={8}>
                        <p>变更类型</p>
                        <p className="cGray">{data.modify_type}</p>
                    </Col>
                    <Col span={8}>
                        <p>专业</p>
                        <p className="cGray">{data.profession_id}</p>
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop:24 }}>
                    <Col span={24}>
                        <p>变更主题</p>
                        <p className="cGray">{data.modify_title}</p>
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop:24 }}>
                    <Col span={24}>
                        <p>变更原因详情</p>
                        <p className="cGray">{data.modify_reason_details}</p>
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop:24 }}>
                    <Col span={3}>
                        <img src='www.baidu.com' alt="avatar" />
                    </Col>
                    <Col span={8}>
                        <p>图纸编号</p>
                        <p className="cGray">{data.drawing_no}</p>
                    </Col>
                </Row>
            </Card>
        );
    }
}