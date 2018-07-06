/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React from 'react'
import {Row, Col, Select} from 'antd';
import "./styles.less"
import {fMoney, requestDict, setSelectFormat} from "../../../../utils";

const Option = Select.Option;

class TabPane1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            outputName: ""
        }
    }

    componentDidMount() {
        requestDict(`['com.moya.contract.enums.InvoiceTypeEnum']`, result => {
            console.log(setSelectFormat(result.InvoiceTypeEnum));
            this.setState({
                outputName: setSelectFormat(result.InvoiceTypeEnum)
            })
        })
    }

    render() {
        const {data} = this.props;
        const {outputName} = this.state;
        return (
        <div className="container">
            <div className="editContent">
                <Row>
                    <Col span={12}>
                        <span className="span">合同名称：</span>
                        <span className="item-text">{data.contract.contract_name}</span>
                    </Col>
                    <Col span={12}>
                        <span className="span">合同编号：</span>
                        <span className="item-text">{data.contract.number}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <span className="span">甲方：</span>
                        <span className="item-text">{data.companyA}</span>
                    </Col>
                    <Col span={12}>
                        <span className="span">乙方：</span>
                        <span className="item-text">{data.companyA}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <span className="span">合同金额：</span>
                        <span className="item-text-red">{fMoney(data.contract.new_amount)}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <span className="span">产值类型：</span>
                        <span className="item-text">{data.model.outputtype}</span>
                    </Col>
                    <Col span={12}>
                        <span className="span">发票类型：</span>
                        {/*{data.model.invoicetype}*/}
                        <Select style={{width: 100}} defaultValue={data.model.invoice_type}
                                disabled={data.model.invoicetype === "专票"}
                                onSelect={e => {
                                    this.props.setData(e);
                                }}>
                            {
                                outputName && outputName.map((item, i) => (
                                <Option key={i} value={item["key"]}>{item["label"]}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                </Row>
            </div>
        </div>
        )
    }
}

export default TabPane1