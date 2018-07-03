import React from 'react'
import CustomizeTabs from "../Tabs";
import TabPane2 from "../Step_2/tab2";
import TabPane3 from "./tab3";
import {Button} from "antd";


export default class Step2 extends React.Component{
  render(){
    return(
    <React.Fragment>

      <CustomizeTabs
      tab="3"
      TabPane_2={ <TabPane2 /> }
      TabPane_3={ <TabPane3 /> }
      />

      <div className="steps-action">
        <Button type="primary" href="/web/output/create/site"> 下一步 </Button>
        <Button style={{ marginLeft: 8 }} > 保存 </Button>
        <Button style={{ marginLeft: 8 }} href="/web/output/create/fill"> 上一步 </Button>
      </div>

    </React.Fragment>
    )
  }
}
