/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React from 'react'
import {Row, Col, Select} from 'antd';
import "./styles.less"
import {fMoney, requestDict, setSelectFormat} from "../../../../utils";
import request from "../../../../utils/request";
import {withRouter} from "react-router-dom";

const Option = Select.Option;

class TabPane1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            outputName: [],
            data: {
                contract: {},
                model: {}
            }
        }
    }

    getModel() {
        request("/con/output/findEditData", {params: {contractid: this.props.location.search.split("=")[1]}})
        .then(res => {
            console.log(res);
            this.setState({
                data: res.data,
            })
        })
    }

    componentDidMount() {
        this.getModel();
        requestDict(`['com.moya.contract.enums.InvoiceTypeEnum']`, result => {
            console.log(setSelectFormat(result.InvoiceTypeEnum));
            this.setState({
                outputName: setSelectFormat(result.InvoiceTypeEnum)
            })
        })
    }


    render() {
        const {data, outputName} = this.state;
        console.log(data, outputName);
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
                        <Select style={{width: 100}} value={data.model.invoice_type}
                                disabled={data.model.invoice_type === "0"}
                                onSelect={e => {
                                    this.props.setData(e);
                                }}>
                            {
                                outputName.map((item, i) => (
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

export default (withRouter(TabPane1))