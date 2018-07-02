// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import { Button } from 'antd';
import CustomizeTabs from '../Tabs'
import TabPane1 from '../Step_1/tab1'
import TabPane2 from '../Step_2/tab2'
import TabPane3 from './tab3'

export default class Step3 extends Component {
    state={
        updateKey:Date.now(),
        visible:false,
    }

    render(){

        return(
            <React.Fragment>

                <CustomizeTabs
                    tab="3"
                    TabPane_1={ TabPane1(this.props) }
                    TabPane_2={ <TabPane2 /> }
                    TabPane_3={ <TabPane3 /> }
                />

                <div className="steps-action">
                    <Button type="primary" > 提交 </Button>
                    <Button style={{ marginLeft: 8 }} > 保存 </Button>
                    <Button style={{ marginLeft: 8 }} href="/web/instruct/create/assign"> 上一步 </Button>
                </div>

            </React.Fragment>
        )
    }
}
