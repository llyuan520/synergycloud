// created by Lee in 2018/07/05

import React from 'react'
import {  Row, Col, Card } from 'antd';

const TabPane1 = (props)=>{
    const data = props.data
    return (
        <Card bordered={false}>
            <Row gutter={24}>
                <Col span={24}>
                    {
                        (data.members && data.members.length) > 0 ?
                            <p>项目组织架构信息</p> : <p>暂无信息</p>
                    }
                    {
                        (data.members && data.members.length) > 0 ?
                            data.members.map((item)=>{
                                return (
                                    <p key={item.id}>角色名称：{ item.rolename}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        角色类型：{ item.roletype }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        角色成员：{item.username} </p>
                                )
                            }) : ''
                    }
                </Col>
            </Row>
        </Card>
    )
}

export default TabPane1