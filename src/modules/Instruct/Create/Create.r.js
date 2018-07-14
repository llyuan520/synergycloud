// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react';
import { Steps, Button, message } from 'antd';
import Step1 from './Step_1'
import Step2 from './Step_2'
import Step3 from './Step_3'

import './styles.less'

const Step = Steps.Step;
const steps = [{
    title: '填写指令单信息',
    content: <Step1 />,
}, {
    title: '指定供应商',
    content: <Step2 />,
}, {
    title: '设置审批流',
    content: <Step3 />,
}];

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render(){
        const { current } = this.state;
        return(
            <div className="ISA-fragment ISA-bgColor">
                <React.Fragment>
                    <h2>新建指令</h2>

                    <div className="steps-main">

                        <Steps className="steps-title" current={current}>
                            {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>

                        <div className="steps-content">{steps[current].content}</div>

                        <div className="steps-action">
                            {
                                current < steps.length - 1
                                && (
                                    <React.Fragment>
                                        {
                                            current === 0 && <Button type="primary" onClick={() => this.next()}> 下一步，指定供应商 </Button>
                                        }
                                        {
                                            current === 1 && <Button type="primary" onClick={() => this.next()}> 下一步，设置审批流 </Button>
                                        }
                                        {
                                            current === 2 && <Button type="primary" onClick={() => this.next()}> 下一步，指定供应商 </Button>
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
                        </div>
                    </div>
                </React.Fragment>
            </div>
        )
    }
}

export default Create;