// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react';
import CustomizeStepsAndTabs from '../../../components/CustomizeStepsAndTabs'
import routes from '../routes'
import './styles.less'

const steps = [{
    title: '填写指令单信息',
}, {
    title: '指定供应商',
}, {
    title: '设置审批流',
}];

export default class Create extends Component {

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
            <CustomizeStepsAndTabs
                title="新建指令"
                steps={{
                    steps:steps,
                    stepsOptions:{
                        current:this.getCurrentStep()
                    },
                }}
                routes={routes}
            />
        )
    }
}