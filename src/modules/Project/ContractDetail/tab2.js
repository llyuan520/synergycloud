// created by Lee in 2018/07/13
import React from 'react'
import { Row, Col, Card } from 'antd';

const TabPane2 = (props)=>{
    const data = props.data
    console.log(data)
    return (
        <Card bordered={false}>
            <Row gutter={24}>
                <Col span={8}>
                    <p>项目名称</p>
                    <p>123123</p>
                </Col>
                <Col span={8}>
                    <p>项目简称</p>
                    <p>12312312</p>
                </Col>
                <Col span={8}>
                    <p>项目编号</p>
                    <p>123123</p>
                </Col>
            </Row>
        </Card>
    )
}

export default TabPane2