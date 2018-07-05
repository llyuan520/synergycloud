// Created by liuliyuan on 2018/7/4
import React,{Component} from 'react';
import { Button } from 'antd';
import CustomizeStaticTabs from 'components/CustomizeStaticTabs'
import TabPane1 from '../../Direct/Create/Step_1/tab1'
import Complete from './Complete.r'

export default class CompleteConfirm extends Component {
    render(){
        return(
            <CustomizeStaticTabs
                title="完工确认"
                defaultActiveKey='0'
                tabPaneOptions={
                    [
                        {
                            title:'完工确认',
                            component:<Complete />
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