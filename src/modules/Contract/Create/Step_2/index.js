/**
 *
 * Created by fanzhe on 2018/7/10
 */

import React from "react";
import CustomizeTabs from "../../../../components/Tabs/index"
import {Button, Form} from "antd";
import TabPane1 from "../Step_1/tab1"
import TabPane2 from "./tab2"

class Step2 extends React.Component {

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.changeRouter();
        // save
    }


    save() {

    }

    changeRouter() {
        this.props.history.push({
            pathname: '/web/contract/create/site',
        })
    };

    render() {
        return (
        <div>
            <React.Fragment>
                <CustomizeTabs
                defaultActiveKey='1'
                tabPaneOptions={
                    [
                        {
                            title: '产值单基本信息',
                            component: <TabPane1/>
                        },
                        {
                            title: '形象进展',
                            component: <TabPane2/>
                        }
                    ]
                }
                stepsAction={
                    <div className="steps-action">
                        <Button type="primary" onClick={() => this.handleSubmit()}> 提交审批 </Button>
                        <Button style={{marginLeft: 8}} onClick={() => {
                            this.save()
                        }}> 保存 </Button>
                        <Button style={{marginLeft: 8}} onClick={() => this.props.history.push({
                            pathname: '/web/contract/create/write',
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

export default Form.create()(Step2)