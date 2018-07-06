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


export default class Step2 extends React.Component {
    render() {
        return (
        <React.Fragment>

            <CustomizeTabs
            defaultActiveKey='2'
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
                        component: <TabPane3/>
                    }
                ]
            }
            stepsAction={
                <div className="steps-action">
                    <Button type="primary"
                            onClick={() => this.props.history.push({
                                pathname: '/web/output/create/site',
                                search: `?id=${this.props.location.search.split("=")[1]}`
                            })}> 下一步 </Button>
                    <Button style={{marginLeft: 8}}> 保存 </Button>
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
