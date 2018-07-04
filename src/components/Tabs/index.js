// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import { Tabs } from 'antd';
import './styles.less'

const TabPane = Tabs.TabPane;

export default class ISATabs extends Component {
    constructor(props){
        super(props)
        this.state={
            updateKey:Date.now(),
            loading: false,
            activeKey: props.defaultActiveKey  || '0' //默认值0开始
        }
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    render(){
        const { tabPaneOptions, stepsAction } = this.props;
        return(
            <React.Fragment>

                <div className="tabs-main">
                    <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>

                        {
                            tabPaneOptions.map((item, i)=>{
                                return (
                                    <TabPane tab={item.title} key={i}>
                                        { item.component }
                                    </TabPane>
                                )
                            })
                        }
                    </Tabs>
                </div>

                <div className="steps-action">
                    {
                        stepsAction
                    }
                </div>

            </React.Fragment>
        )
    }
}