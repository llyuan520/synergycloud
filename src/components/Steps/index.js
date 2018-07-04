// Created by liuliyuan on 2018/7/4
import React,{Component} from 'react';
import { Steps } from 'antd';
import './styles.less'

const Step = Steps.Step;

export default class ISASteps extends Component {

    render(){
        const { steps, stepsOptions } = this.props;
        return(
            <Steps className="steps-title" {...stepsOptions}>
                {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
        )
    }
}