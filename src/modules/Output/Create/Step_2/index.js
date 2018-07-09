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
        model: [],
        output: [],
        outputId: ""
    }

    setData = data => {
        this.mounted && this.setState({
            data
        })
    }

    handleSubmit = (e) => {
        console.log(this.save);
        e && e.preventDefault();
        const changeRouter = () => {
            const {outputId} = this.state;
            this.props.history.push({
                pathname: '/web/output/create/present',
                search: `?id=${this.props.location.search.split("=")[1]}`,
                state: {
                    outputId
                }
            })
        }
        this.save(changeRouter)
    }

    mounted = true;

    componentWillUnmount() {
        this.mounted = null;
    }

    setModel(data) {
        this.setState({
            modelM: _.extend(this.state.modelM, {invoice_type: data})
        })
    }

    save = (changeRouter) => {
        const params = {
            outputimage: this.state.data,
            model: this.state.modelM
        };
        console.log(params);
        request("/con/output/saveOutputAndImage", {body: params, method: "POST"})
        .then(res => {
            console.log(res);
            this.setState({
                // outputId: res.data.res
            }, () => {
                if (changeRouter) {
                    changeRouter()
                }
            })
        })
    }

    render() {
        return (
        <React.Fragment>
            <CustomizeTabs
            defaultActiveKey='1'
            tabPaneOptions={
                [
                    {
                        title: '产值单基本信息',
                        component: <TabPane1 setData={this.setModel.bind(this)}/>
                    },
                    {
                        title: '形象进展',
                        component: <TabPane2 setData={this.setData.bind(this)}/>
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