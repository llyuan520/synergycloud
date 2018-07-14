// created by Lee in 2018/07/13
import React from 'react'
import { Row, Col, Card } from 'antd';

const TabPane2 = (props)=>{
    const data = props.data
    console.log(data)
    return (
        <Card bordered={false}>
            <Row gutter={24}>
                <Col span={12}>
                    <span>名称：</span>
                    <span>{data.contract_name}</span>
                </Col>
                <Col span={12}>
                    <span>编号：</span>
                    <span>{data.number}</span>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <span>甲方：</span>
                    <span>{data.companyA}</span>
                </Col>
                <Col span={12}>
                    <span>乙方：</span>
                    <span>{data.companyB}</span>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={6}>
                    <span>类别：</span>
                    <span>{data.contractcategory}</span>
                </Col>
                <Col span={6}>
                    <span>类型：</span>
                    <span>{data.contracttype}</span>
                </Col>
                <Col span={6}>
                    <span>签订时间：</span>
                    <span>{data.signed_date}</span>
                </Col>
                <Col span={6}>
                    <span>创建时间：</span>
                    <span>{data.create_time}</span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span>项目名称：</span>
                    <span>{data.itemsname}</span>
                </Col>
            </Row>
            <Row style={{marginTop:20}} gutter={24}>
                <Col span={6}>
                    <span>状态：</span>
                    <span>{data.contractstatus}</span>
                </Col>
                <Col span={6}>
                    <span>竣工状态：</span>
                    <span>{data.finishstatus}</span>
                </Col>
                <Col span={6}>
                    <span>结算状态：</span>
                    <span>{data.currencystatus}</span>
                </Col>
                <Col span={6}>
                    <span>经办人：</span>
                    <span>{data.agent_name}</span>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={6}>
                    <span>水电配合情况：</span>
                    <span>{data.watersituation}</span>
                </Col>
                <Col span={6}>
                    <span>提报产值方式：</span>
                    <span>{data.issubmission}</span>
                </Col>
            </Row>
            <Row style={{marginTop:20}} gutter={24}>
                <Col span={6}>
                    <span>计价模式：</span>
                    <span>{data.watersituation}</span>
                </Col>
                <Col span={6}>
                    <span>价格基准：</span>
                    <span>{data.pricebenchmark}</span>
                </Col>
                <Col span={6}>
                    <span>付款方式：</span>
                    <span>{data.paymentway}</span>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={6}>
                    <span>汇率类型：</span>
                    <span>{data.ratetype}</span>
                </Col>
                <Col span={6}>
                    <span>汇率：</span>
                    <span>{data.rate}</span>
                </Col>
                <Col span={6}>
                    <span>币别：</span>
                    <span>{data.currencyname}</span>
                </Col>
                <Col span={6}>
                    <span>发票类型：</span>
                    <span>{data.invoicetype}</span>
                </Col>
            </Row>
            <Row style={{marginTop:20}} gutter={24}>
                <Col span={6}>
                    <span>质保金比例：</span>
                    <span>{data.quality_proportion}</span>
                </Col>
                <Col span={6}>
                    <span>质保金金额：</span>
                    <span>{data.quality_money }</span>
                </Col>
                <Col span={12}>
                    <span>质保日期到：</span>
                    <span>{data.quality_date}</span>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <span>合同签订金额：</span>
                    <span style={{color:'red'}}>{data.signed_amount}</span>
                </Col>
                <Col span={12}>
                    <span>合同最新金额：</span>
                    <span style={{color:'red'}}>{data.new_amount}</span>
                </Col>
            </Row>
        </Card>
    )
}

export default TabPane2