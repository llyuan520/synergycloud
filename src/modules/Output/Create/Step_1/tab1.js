/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React from 'react'
import {Row, Col, Card} from 'antd';
import "./styles.less"

const TabPane1 = (props) => {
  return (
    <div className="container">
      <div className="editContent">
        <Row>
          <Col span={12}>
            <span>合同名称：</span>
            <span className="item-text">青岛万科未来城项目底商幕墙工程合同</span>
          </Col>
          <Col span={12}>
            <span>合同编号：</span>
            <span className="item-text">QD-HJB-01Q-施工-0004-设计变更-0001</span>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <span>甲方：</span>
            <span className="item-text">山东自立幕墙工程有限公司</span>
          </Col>
          <Col span={12}>
            <span>乙方：</span>
            <span className="item-text">青岛远房地产土地评估造价咨询有限公司</span>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <span>合同金额：</span>
            <span className="item-text-red">3,888,888.00</span>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <span>产值类型：</span>
            <span className="item-text">进度产值</span>
          </Col>
          <Col span={12}>
            <span>发票类型：</span>
            <span className="item-text">增值税专票</span>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default TabPane1