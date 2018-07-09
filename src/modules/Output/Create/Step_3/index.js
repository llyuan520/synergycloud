/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React from 'react'
import CustomizeTabs from '../../../../components/Tabs/index'
import TabPane2 from "../Step_2/tab2";
import TabPane3 from "./tab3";
import {Button, message} from "antd";
import TabPane1 from "../Step_1/tab1";
import {withRouter} from "react-router-dom";
import request from "../../../../utils/request";
import _ from "lodash"


class Step3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: [],
            tableData: {},
            invoice: [],
            output: [],
            outputproject: []
        }
    }


    setModel(data) {
        this.setState({
            modelM: _.extend(this.state.modelM, {invoice_type: data})
        })
    }



    setOutput(data, count) {
        console.log(count);
        this.setState({
            outputproject: data,
            outputprojectCount: count
        })
    }

    setInvoice(data, count) {
        console.log(count);
        this.setState({
            invoice: data,
            invoiceCount: count,
        })
    }

    save() {
        return new Promise((resolve, reject) => {
            const model = this.state.model.model;
            const {outputprojectCount, invoiceCount} = this.state;
            if (outputprojectCount * 1 === invoiceCount * 1) {
                const params = {
                    model: _.extend(model, {id: this.props.location.state.outputId, tax_amounts: outputprojectCount}),
                    outputproject: this.state.outputproject.length ? this.state.outputproject : this.state.tableData.datas,
                    invoice: this.state.invoice
                };
                console.log(params);
                request("/con/output/saveProjectAndInvoice", {body: params, method: "POST"})
                .then(res => {
                    if (res.state === "ok") {
                        message.success("保存成功！");
                        resolve()
                    } else {
                        message.error(res.message);
                        reject('失败')
                    }
                })
            } else {
                message.error("发票金额和明细金额汇总不一致！");
                reject('失败')
            }
        })
    }

    handleSave() {
        const routerChange = () => {
            this.props.history.push({
                pathname: '/web/output/create/site',
                search: `?id=${this.props.location.search.split("=")[1]}`,
                state: this.props.location.state
            })
        };
        Promise.all([this.save()])
        .then(() => routerChange())
        .catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {

    }

    render() {
        return (
        <React.Fragment>

            <CustomizeTabs
            defaultActiveKey='2'
            tabPaneOptions={
                [
                    {
                        title: '产值单基本信息',
                        component: <TabPane1 setData={this.setModel.bind(this)}/>
                    },
                    {
                        title: '形象进展',
                        component: <TabPane2 disabled={true} />
                    },
                    {
                        title: '产值明细和发票',
                        component: <TabPane3 setOutput={this.setOutput.bind(this)}
                                             setInvoice={this.setInvoice.bind(this)} />
                    }
                ]
            }
            stepsAction={
                <div className="steps-action">
                    <Button type="primary"
                            onClick={() => this.handleSave()}> 下一步 </Button>
                    <Button style={{marginLeft: 8}} onClick={() => this.save()}> 保存 </Button>
                    <Button style={{marginLeft: 8}}
                            onClick={() => this.props.history.push({
                                pathname: '/web/output/create/fill',
                                search: `?id=${this.props.location.search.split("=")[1]}`
                            })}> 上一步 </Button>
                </div>
            }
            />

        </React.Fragment>
        )
    }
}

export default (withRouter(Step3))
