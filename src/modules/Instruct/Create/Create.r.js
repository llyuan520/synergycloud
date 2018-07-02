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

                        {/*<div className="steps-action">
                            {
                                current < steps.length - 1
                                && (
                                    <React.Fragment>
                                        {
                                            current === 0 && <Button type="primary" href="/web/instruct/create/assign" onClick={() => this.next()}> 下一步，指定供应商 </Button>
                                        }
                                        {
                                            current === 1 && <Button type="primary" href="/web/instruct/create/site" onClick={() => this.next()}> 下一步，设置审批流 </Button>
                                        }
                                    </React.Fragment>
                                )
                            }
                            {
                                current === steps.length - 1
                                &&
                                <React.Fragment>
                                    <Button type="primary" onClick={() => message.success('Processing complete!')} style={{marginRight:8}}>提交</Button>
                                    <Button onClick={() => message.success('Processing complete!')}>保存</Button>
                                </React.Fragment>
                            }
                            {
                                current > 0
                                && (
                                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                        上一步
                                    </Button>
                                )
                            }
                        </div>*/}
                    </div>
                </React.Fragment>
            </div>
        )
    }
}

export default Create;