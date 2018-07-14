/**
 *
 * Created by fanzhe on 2018/7/10
 */

import React from "react";
import {Col, Row, Radio, Form, Table, Input, Divider} from "antd";
import "../style.less"
import getFields from "../../../../utils/getFields";

const RadioGroup = Radio.Group;
const columns = [{
    title: '费用',
    render: (text, record) => {
        if (record.type === "last") {
            return (<span className="text-low">{text.name}</span>)
        } else {
            return (<span className="text">{text.name}</span>)
        }
    }
}, {
    title: '一审',
    dataIndex: 'age',
    className: "text-low",
    key: 'age',
}, {
    title: '二审',
    dataIndex: 'address',
    className: "text-low",
    key: 'address',
}, {
    title: '结算金额',
    render: (text, record) => {
        if (record.type === "last") {
            return (<span className="text-low red">{text.name}</span>)
        } else {
            return (<Input/>)
        }
    }
}];
const dataSource = [{
    key: '1',
    name: '合同造价',
    age: '123,456.00',
    address: '123,456.00'
}, {
    key: '2',
    name: '合同造价',
    age: '123,456.00',
    address: '123,456.00'
}, {
    key: '3',
    name: '合同造价',
    age: '123,456.00',
    address: '123,456.00'
}, {
    key: '4',
    name: '小计',
    age: 42,
    type: "last",
    address: '西湖区湖底公园1号'
}];

class Tab1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        }
    }

    onChange(e) {
        this.setState({value: e.target.value})
    }

    render() {
        const {form} = this.props;
        const {getFieldValue} = form;
        const {value} = this.state;
        return (
        <div className="container">
            <Form>
                <Row gutter={16}>
                    <Col span={2} className="radio-text">质保金</Col>
                    <Col span={8}>
                        <RadioGroup onChange={v => this.onChange(v)} value={this.state.value}>
                            <Radio value={1}>按质保金比例填写</Radio>
                            <Radio value={2}>按质保金金额填写</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                <Row gutter={24} className="mt35">
                    {
                        value === 1
                        ? getFields(form, [{
                            label: '质保金金额',
                            fieldName: 'sum',
                            type: 'input',
                            span: 8,
                        }, {
                            label: '质保日期到',
                            fieldName: 'date',
                            type: 'datePicker',
                            span: 8,
                        }, {
                            label: '质保金比例',
                            fieldName: 'rate',
                            type: 'text',
                            span: 8,
                        }

                        ], 'vertical')
                        : getFields(form, [{
                            label: '质保金比例',
                            fieldName: 'sum',
                            type: 'input',
                            span: 8,
                        }, {
                            label: '质保日期到',
                            fieldName: 'date',
                            type: 'datePicker',
                            span: 8,
                        }, {
                            label: '质保金金额',
                            fieldName: 'rate',
                            type: 'text',
                            span: 8,
                        }

                        ], 'vertical')

                    }
                </Row>
            </Form>
            <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            />
            <Divider/>
            <div className="table-footer">
                <span>
                    <span>供应商贴息（非现金调差)</span>
                    <span><Input className="footer-input"/></span>
                </span>
                <span className="r">
                    <span>总计</span>
                    <span className="red bold">6,123.999.00</span>
                </span>
            </div>
            <Divider/>
            <div>
                <h4>附件</h4>
                <span></span>
            </div>
        </div>
        )
    }
}

export default Form.create()(Tab1)