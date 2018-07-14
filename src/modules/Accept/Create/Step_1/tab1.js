/**
 *
 * Created by fanzhe on 2018/7/10
 */

import React from "react";
import {Col, Row} from "antd";

export default class Tab1 extends React.Component {
    render() {
        return (
        <div className="editContent container">
            <Row>
                <Col span={12}>
                    <span className="span">名称</span>
                    <span className="item-text">合同名称合同名称合同名称合同名称合同名称合同名称</span>
                </Col>
                <Col span={12}>
                    <span className="span">编号</span>
                    <span className="item-text">xxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <span className="span">甲方</span>
                    <span className="item-text">合同名称合同名称合同名称合同名称合同名称合同名称</span>
                </Col>
                <Col span={12}>
                    <span className="span">乙方</span>
                    <span className="item-text">xxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <span className="span">类别</span>
                    <span className="item-text">项目合同</span>
                </Col>
                <Col span={6}>
                    <span className="span">类型</span>
                    <span className="item-text">土建类</span>
                </Col>
            </Row>
        </div>
        )
    }
}