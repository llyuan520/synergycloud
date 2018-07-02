// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import { Button } from 'antd';
import CustomizeTabs from '../Tabs'
import TabPane1 from '../Step_1/tab1'
import TabPane2 from './tab2'

export default class Step2 extends Component {
    state={
        updateKey:Date.now(),
        visible:false,
    }

    render(){

        return(
            <React.Fragment>

                <CustomizeTabs
                    tab="2"
                    TabPane_1={ TabPane1(this.props) }
                    TabPane_2={ <TabPane2 /> }
                />

                <div className="steps-action">
                    <Button type="primary" href="/web/instruct/create/site" > 下一步，设置审批流 </Button>
                    <Button style={{ marginLeft: 8 }} href="/web/instruct/create/write"> 上一步 </Button>
                </div>

            </React.Fragment>
        )
    }
}