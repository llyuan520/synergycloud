/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Button} from 'antd';
import TabPane2 from './tab2'
import CustomizeTabs from '../../../../components/Tabs/index'
import TabPane1 from "../Step_1/tab1";
import request from "../../../../utils/request";
import _ from 'lodash'

class Step2 extends Component {
    state = {
        updateKey: Date.now(),
        visible: false,
        data: [],
        model: []
    }

    setData = data => {
        this.mounted && this.setState({
            data
        })
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.save();
        this.props.history.push({
            pathname: '/web/output/create/present',
            search: `?id=${this.props.location.search.split("=")[1]}`
        })
    }

    mounted = true;

    componentWillUnmount() {
        this.mounted = null;
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

    componentDidMount() {
        this.getModel()
    }

    setModel(data) {
        this.setState({
            modelM: _.extend(this.state.modelM, {invoice_type: data})
        })
    }

    save() {
        const params = {
            outputimage: this.state.data,
            model: this.state.modelM
        };
        console.log(params);
        request("/con/output/saveOutputAndImage", {body: params, method: "POST"})
    }

    render() {
        console.log(this.state.model);
        return (
        <React.Fragment>
            <CustomizeTabs
            defaultActiveKey='1'
            tabPaneOptions={
                [
                    {
                        title: '产值单基本信息',
                        component: <TabPane1 data={this.state.model} setData={this.setModel.bind(this)}/>
                    },
                    {
                        title: '形象进展',
                        component: <TabPane2 data={this.state.model}  setData={this.setData.bind(this)}/>
                    }
                ]
            }
            stepsAction={
                <div className="steps-action">
                    <Button type="primary" onClick={this.handleSubmit}> 下一步 </Button>
                    <Button style={{marginLeft: 8}} onClick={() => {
                        this.save()
                    }}> 保存 </Button>
                    <Button style={{marginLeft: 8}} onClick={() => this.props.history.push({
                        pathname: '/web/output/create/write',
                        search: `?id=${this.props.location.search.split("=")[1]}`
                    })
                    }> 上一步 </Button>
                </div>
            }
            />
        </React.Fragment>
        )
    }
}

export default withRouter(Step2)