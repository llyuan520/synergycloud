// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react';
import {Switch,Route } from 'react-router-dom';
import { Steps } from 'antd';
import {RouteWithSubRoutes} from 'components'
import routes from '../routes'

import './styles.less'

const Step = Steps.Step;
const steps = [{
    title: '填写指令单信息',
}, {
    title: '指定供应商',
}, {
    title: '设置审批流',
}];

class Create extends Component {

    getCurrentStep=()=>{
        const { location } = this.props;
        const { pathname } = location;
        const pathList = pathname.split('/');
        switch (pathList[pathList.length - 1]) {
            case 'write':
                return 0;
            case 'assign':
                return 1;
            case 'site':
                return 2;
            default:
                return 0;
        }
    }

    render(){
        return(
            <div className="ISA-fragment ISA-bgColor">
                <React.Fragment>
                    <h2>新建指令</h2>

                    <div className="steps-main">

                        <Steps className="steps-title" current={this.getCurrentStep()}>
                            {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div className="steps-content">
                            <Switch>
                                {routes.map((route, i) => (
                                    <RouteWithSubRoutes key={i} {...route}/>
                                ))}
                                <Route path="*" component={()=><div>no match</div>} />
                            </Switch>
                        </div>

                    </div>
                </React.Fragment>
            </div>
        )
    }
}

export default Create;