// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Button } from 'antd';
import CustomizeTabs from '../Tabs'
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
        this.props.history.push('/web/instruct/create/assign')
    }

    mounted = true;
    componentWillUnmount(){
        this.mounted = null;
    }

    render(){

        return(
            <React.Fragment>

                <CustomizeTabs
                    tab="2"
                    props={this.props}
                    TabPane_2={ <TabPane2 setData={this.setData.bind(this)} /> }
                />

                <div className="steps-action">
                    <Button type="primary" onClick={this.handleSubmit} > 下一步，设置审批流 </Button>
                    <Button style={{ marginLeft: 8 }} href="/web/instruct/create/write"> 上一步 </Button>
                </div>

            </React.Fragment>
        )
    }
}

export default withRouter(Step2)