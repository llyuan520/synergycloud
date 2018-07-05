// Created by liuliyuan on 2018/6/30
import React, {Component} from 'react'
import {Button} from 'antd';
import CustomizeTabs from '../../../../components/Tabs/index'
import TabPane2 from '../Step_2/tab2'
import TabPane3 from '../Step_3/tab3'
import TabPane4 from './tab4'
import TabPane1 from "../Step_1/tab1";

export default class Step3 extends Component {
  state = {
    updateKey: Date.now(),
    visible: false,
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
            component: <TabPane4 />
          }
        ]
      }
      stepsAction={
        <div className="steps-action">
          <Button type="primary"> 下一步 </Button>
          <Button style={{marginLeft: 8}}> 保存 </Button>
          <Button style={{marginLeft: 8}} href="/web/output/create/present"> 上一步 </Button>
        </div>
      }
      />

    </React.Fragment>
    )
  }
}
