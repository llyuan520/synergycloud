import React from "react";
import CustomizeStepsAndTabs from "../../../components/CustomizeStepsAndTabs";
import routes from "../router";

/**
 *
 * Created by fanzhe on 2018/7/6
 */

const steps = [{
    title: '选择合同',
}, {
    title: '填写结算金额',
}, {
    title: '设置审批流',
}];

export default class Create extends React.Component {

    getCurrentStep = () => {
        const {location} = this.props;
        const {pathname} = location;
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

    render() {
        return (
        <CustomizeStepsAndTabs
        title="新建合同结算"
        steps={{
            steps: steps,
            stepsOptions: {
                current: this.getCurrentStep()
            },
        }}
        routes={routes}
        />
        )
    }
}