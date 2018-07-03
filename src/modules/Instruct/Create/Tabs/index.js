// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import { Tabs } from 'antd';
import TabPane1 from '../Step_1/tab1'

import './styles.less'

const TabPane = Tabs.TabPane;

export default class CustomizeTabs extends Component {
    constructor(props){
        super(props)
        this.state={
            updateKey:Date.now(),
            loading: false,
            activeKey: props.tab  || '1'
        }
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    render(){
        const { TabPane_2, TabPane_3 } = this.props;
        return(
            <React.Fragment>

                <div className="tabs-main">
                    <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>
                         <TabPane tab="指令单信息" key="1">
                            <TabPane1 props={this.props} />
                        </TabPane>
                        {
                            TabPane_2 && <TabPane tab="指定供应商" key="2">
                                            { TabPane_2 }
                                        </TabPane>
                        }
                        {
                            TabPane_3 && <TabPane tab="设置审批流" key="3">
                                            { TabPane_3 }
                                        </TabPane>
                        }

                    </Tabs>
                </div>

            </React.Fragment>
        )
    }

}