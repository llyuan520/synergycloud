// Created by liuliyuan on 2018/6/30
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Button} from 'antd';
import TabPane2 from './tab2'
import CustomizeTabs from '../../../../components/Tabs/index'
import TabPane1 from "../Step_1/tab1";

class Step2 extends Component {
  state = {
    updateKey: Date.now(),
    visible: false,
    data: {},
  }

  setData = data => {
    this.mounted && this.setState({
      data
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault();
    console.log(this.state.data)
    this.props.history.push('/web/output/create/present')
  }

  mounted = true;

  componentWillUnmount() {
    this.mounted = null;
  }

  render() {

    return (
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
            component: <TabPane2  setData={this.setData.bind(this)}/>
          }
        ]
      }
      stepsAction={
        <div className="steps-action">
          <Button type="primary" onClick={this.handleSubmit}> 下一步 </Button>
          <Button style={{marginLeft: 8}}> 保存 </Button>
          <Button style={{marginLeft: 8}} href="/web/output/create/write"> 上一步 </Button>
        </div>
      }
      />
    </React.Fragment>
    )
  }
}

export default withRouter(Step2)