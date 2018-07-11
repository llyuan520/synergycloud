// created by Lee in 2018/07/05

import React from 'react'
import { Row, Col, Card } from 'antd';

const TabPane1 = (props)=>{
    const data = props.data
    return (
        <Card bordered={false}>
            <Row gutter={24}>
                <Col span={8}>
                    <p>项目名称</p>
                    <p>{data.project_name}</p>
                </Col>
                <Col span={8}>
                    <p>项目简称</p>
                    <p>{data.project_simplename}</p>
                </Col>
                <Col span={8}>
                    <p>项目编号</p>
                    <p>{data.project_id}</p>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    <p>计税方式</p>
                    <p>{data.tax_type}</p>
                </Col>
                <Col span={8}>
                    <p>项目状态</p>
                    <p>{data.status}</p>
                </Col>
                <Col span={8}>
                    <p>经纬度</p>
                    <p>{data.longitudeAndLatitude}</p>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    {
                        (data.stages_options && data.stages_options.length) > 0 ?
                            <p>项目分期信息</p> : ''
                    }
                    {
                        (data.stages_options && data.stages_options.length) > 0 ?
                        data.stages_options.map((item)=>{
                            return (
                                <p key={item.key}>分期编号：{ item.key }, 分期名称： { item.label }, 计税方式：{item.tax_type} </p>
                            )
                        }) : ''
                    }
                </Col>
            </Row>
        </Card>
    )
}

export default TabPane1