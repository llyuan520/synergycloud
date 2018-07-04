// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Button } from 'antd';
import CustomizeTabs from '../../../../components/Tabs/index'
import TabPane1 from '../Step_1/tab1'
import TabPane2 from './tab2'

class Step2 extends Component {
    state={
        updateKey:Date.now(),
        visible:false,
        data:{},
    }

    setData = data =>{
        this.mounted && this.setState({
            data
        })
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        console.log(this.state.data)
        this.props.history.push('/web/direct/create/site')
    }

    mounted = true;
    componentWillUnmount(){
        this.mounted = null;
    }

    render(){

        return(
            <CustomizeTabs
                defaultActiveKey='1'
                tabPaneOptions={
                    [
                        {
                            title:'指令单信息',
                            component:<TabPane1 />
                        }, {
                            title:'指定供应商',
                            component:<TabPane2 setData={this.setData.bind(this)} />
                        }
                    ]
                }
                stepsAction={
                    <div className="steps-action">
                        <Button type="primary" onClick={this.handleSubmit} > 下一步，设置审批流 </Button>
                        <Button style={{ marginLeft: 8 }} href="/web/direct/create/write"> 上一步 </Button>
                    </div>
                }
            />
        )
    }
}

export default withRouter(Step2)