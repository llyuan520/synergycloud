/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React from 'react'
import CustomizeTabs from '../../../../components/Tabs/index'
import TabPane2 from "../Step_2/tab2";
import TabPane3 from "./tab3";
import {Button} from "antd";
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
            outputproject: []
        }
    }

    getList() {
        console.log(this.props.location.search.split("=")[1]);
        const outputId = this.props.location.search.split("=")[1];
        request("/con/output/contractToOutput", {params: {contract_id: outputId}})
        .then((res => {
            console.log(res);
            this.setState({
                tableData: res.data,
            })
        }))
    }

    getModel() {
        request("/con/output/findEditData", {params: {contractid: this.props.location.search.split("=")[1]}})
        .then(res => {
            console.log(res);
            this.setState({
                model: res.data,
                modelM: res.data.model
            })
        })
    }

    setModel(data) {
        this.setState({
            modelM: _.extend(this.state.modelM, {invoice_type: data})
        })
    }

    setOutput(data) {
        this.setState({
            outputproject: data
        })
    }

    setInvoice(data) {
        this.setState({
            invoice: data
        })
    }

    save() {
        const model = this.state.model.model;
        console.log(model);
        const params = {
            model: _.extend(model, {id: this.props.location.state.outputId}),
            outputproject: this.state.outputproject.length ? this.state.outputproject : this.state.tableData.datas,
            invoice: this.state.invoice
        };
        console.log(params);
        request("/con/output/saveProjectAndInvoice", {body: params, method: "POST"})
    }

    handleSave() {
        const routerChange = () => {
            this.props.history.push({
                pathname: '/web/output/create/site',
                search: `?id=${this.props.location.search.split("=")[1]}`
            })
        };
        Promise.all([this.save(), routerChange])
        .catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.getList();
        this.getModel()
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
                        component: <TabPane1 data={this.state.model} setData={this.setModel.bind(this)}/>
                    },
                    {
                        title: '形象进展',
                        component: <TabPane2 disabled={true}/>
                    },
                    {
                        title: '产值明细和发票',
                        component: <TabPane3 setOutput={this.setOutput.bind(this)}
                                             setInvoice={this.setInvoice.bind(this)} data={this.state.tableData}/>
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
