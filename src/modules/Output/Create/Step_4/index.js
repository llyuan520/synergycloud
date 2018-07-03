// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import { Button } from 'antd';
import CustomizeTabs from '../Tabs'
import TabPane2 from '../Step_2/tab2'
import TabPane3 from '../Step_3/tab3'
import TabPane4 from './tab4'

export default class Step3 extends Component {
    state={
        updateKey:Date.now(),
        visible:false,
    }

    render(){

        return(
            <React.Fragment>

                <CustomizeTabs
                    tab="4"
                    TabPane_2={ <TabPane2 /> }
                    TabPane_3={ <TabPane3 /> }
                    TabPane_4={ <TabPane4 /> }
                />

                <div className="steps-action">
                    <Button type="primary" > 提交 </Button>
                    <Button style={{ marginLeft: 8 }} > 保存 </Button>
                    <Button style={{ marginLeft: 8 }} href="/web/output/create/present"> 上一步 </Button>
                </div>

            </React.Fragment>
        )
    }
}
