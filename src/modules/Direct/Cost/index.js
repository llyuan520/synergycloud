// Created by liuliyuan on 2018/7/4
import React,{Component} from 'react';
import { Button } from 'antd';
import CustomizeStaticTabs from 'components/CustomizeStaticTabs'
import TabPane1 from '../../Direct/Create/Step_1/tab1'
import Cost from './Cost.r'

export default class CostMeasure extends Component {
    render(){
        return(
            <CustomizeStaticTabs
                title="变更编号：xx一期-指令单-分包-土建-0127"
                defaultActiveKey='0'
                tabPaneOptions={
                    [
                        {
                            title:'成本测算',
                            component:<Cost />
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