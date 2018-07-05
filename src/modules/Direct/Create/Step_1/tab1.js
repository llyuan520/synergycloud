// Created by liuliyuan on 2018/7/2
import React from 'react'
import {  Row, Col } from 'antd';

const TabPane1 = (props)=>{
    return (
        <div style={{ padding:'24px 32px', ...props.style }}>
            <Row gutter={24}>
                <Col span={8}>
                    <p>项目名称</p>
                    <p>项目名称很长项目名称很长项目名称很长项目名称很长</p>
                </Col>
                <Col span={8}>
                    <p>变更编号</p>
                    <p>变更编号变更编号变更编号变更编号变更编号变更编号变更编号</p>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop:24 }}>
                <Col span={8}>
                    <p>变更类型</p>
                    <p>变更类型</p>
                </Col>
                <Col span={8}>
                    <p>专业</p>
                    <p>土建类</p>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop:24 }}>
                <Col span={24}>
                    <p>变更主题</p>
                    <p>变更主题变更主题变更主题变更主题变更主题变更主题变更主题变更主题变更主题变更主题变更主题变更主题变更主题</p>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop:24 }}>
                <Col span={24}>
                    <p>变更原因详情</p>
                    <p>变更原因详情变更原因详情变更原因详情变更原因详情变更原因详情变更原因详情变更原因详情变更原因详情变更原因详情变更原因详情变更原因详情变更原因详情变更原因详情变更原因详情变更原因详情变更原因详情</p>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop:24 }}>
                <Col span={3}>
                    <img src='www.baidu.com' alt="avatar" />
                </Col>
                <Col span={8}>
                    <p>图纸编号</p>
                    <p>00002300000023</p>
                </Col>
            </Row>
        </div>
    )
}

export default TabPane1