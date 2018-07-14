/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Steps} from 'antd';
import {RouteWithSubRoutes} from 'components'
import routes from '../routes'

import './styles.less'


/*
* 通过路由来保存产值ID，合同ID和是否收货记录。
* 三个对应的路由字段是id,outputId,is_submission*/

const Step = Steps.Step;
const steps = [{
    title: '选择合同',
}, {
    title: '填写形象进度',
}, {
    title: '提报产值明细和发票',
}, {
    title: '设置审批流',
}];

class Create extends Component {

    getCurrentStep = () => {
        const {location} = this.props;
        const {pathname} = location;
        const pathList = pathname.split('/');
        switch (pathList[pathList.length - 1]) {
            case 'write':
                return 0;
            case 'fill':
                return 1;
            case 'present':
                return 2;
            case 'site':
                return 3;
            default:
                return 0;
        }
    }

    render() {
        return (
        <div className="ISA-fragment ISA-bgColor">
            <React.Fragment>
                <h2>产值报告</h2>

                <div className="steps-main">

                    <Steps className="steps-title" current={this.getCurrentStep()}>
                        {steps.map(item => <Step key={item.title} title={item.title}/>)}
                    </Steps>
                    <div className="steps-content">
                        <Switch>
                            {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route}/>
                            ))}
                            <Route path="*" component={() => <div>no match</div>}/>
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        </div>
        )
    }
}

export default Create;