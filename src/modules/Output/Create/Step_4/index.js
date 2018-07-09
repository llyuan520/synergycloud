/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React, {Component} from 'react'
import {Button} from 'antd';
import CustomizeTabs from '../../../../components/Tabs/index'
import TabPane2 from '../Step_2/tab2'
import TabPane3 from '../Step_3/tab3'
import TabPane4 from './tab4'
import TabPane1 from "../Step_1/tab1";
import {withRouter} from "react-router-dom";
import request from "../../../../utils/request";

class Step3 extends Component {
    state = {
        updateKey: Date.now(),
        visible: false,
    };

    getTem() {
        request("/con/output/getTemplateNode")
        .then(res => {
            console.log(res);
        })
    }

    componentDidMount() {
        this.getTem()
    }

    render() {

        return (
        <React.Fragment>

            <CustomizeTabs
            defaultActiveKey='3'
            tabPaneOptions={
                [
                    {
                        title: '产值单基本信息',
                        component: <TabPane1/>
                    },
                    {
                        title: '形象进展',
                        component: <TabPane2 disabled={true}/>
                    },
                    {
                        title: '产值明细和发票',
                        component: <TabPane3 disabled={true}/>
                    },
                    {
                        title: '设置审批流',
                        component: <TabPane4/>
                    }
                ]
            }
            stepsAction={
                <div className="steps-action">
                    <Button type="primary"> 提交 </Button>
                    <Button style={{marginLeft: 8}}> 保存 </Button>
                    <Button style={{marginLeft: 8}}
                            onClick={() => this.props.history.push({
                                pathname: '/web/output/create/present',
                                search: `?id=${this.props.location.search.split("=")[1]}`,
                                state: this.props.location.state
                            })}> 上一步 </Button>
                </div>
            }
            />

        </React.Fragment>
        )
    }
}

export default (withRouter(Step3))