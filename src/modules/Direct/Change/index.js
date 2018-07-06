// Created by liuliyuan on 2018/7/4
import React,{Component} from 'react';
import { Button } from 'antd';
import CustomizeStaticTabs from 'components/CustomizeStaticTabs'
import TabPane1 from '../../Direct/Create/Step_1/tab1'
import Change from './Change.r'

export default class ChangeSettleAccounts extends Component {
    render(){
        return(
            <CustomizeStaticTabs
                title="完工确认"
                defaultActiveKey='0'
                tabPaneOptions={
                    [
                        {
                            title:'变更结算',
                            component:<Change />
                        }, {
                            title:'指令单信息',
                            component:<TabPane1 />
                        }
                    ]
                }
                stepsAction={
                    <div className="steps-action">
                        <Button type="primary" onClick={this.handleSubmit} > 提交审批 </Button>
                    </div>
                }
            />
        )
    }
}