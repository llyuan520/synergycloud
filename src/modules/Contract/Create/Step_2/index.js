/**
 *
 * Created by fanzhe on 2018/7/10
 */

import React from "react";
import CustomizeTabs from "../../../../components/Tabs/index"
import {Button, Form} from "antd";
import TabPane1 from "../Step_1/tab1"
import TabPane2 from "./tab2"
import {objToStrRouter, strToObjRouter} from "../../../../utils";
import _ from "lodash";

class Step2 extends React.Component {

    handleSubmit = (e) => {
        e && e.preventDefault();
        // save
    }


    save() {

    }

    changeRouter() {
        const {outputId} = this.state;
        this.props.history.push({
            pathname: '/web/output/create/present',
            search: objToStrRouter(_.extend(strToObjRouter(this.props.location.search), {
                outputId,
            })),
        })
    };

    render() {
        return (
        <div>
            1
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
                            pathname: '/web/contract/create/write',
                            // search: this.props.location.search
                        })
                        }> 上一步 </Button>
                    </div>
                }
                />
            </React.Fragment>
        </div>
        )
    }
}

export default Form.create(Step2)