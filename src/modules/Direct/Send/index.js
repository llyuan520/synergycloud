// Created by liuliyuan on 2018/7/4
import React,{Component} from 'react';
import { Form, Button } from 'antd';
import CustomizeStaticTabs from 'components/CustomizeStaticTabs'
import TabPane1 from '../../Direct/Create/Step_1/tab1'
import Send from './Send.r'

class SendDirect extends Component {

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values)
            }
        });
    }

    render(){
        return(
            <CustomizeStaticTabs
                title="下发指令"
                defaultActiveKey='0'
                tabPaneOptions={
                    [
                        {
                            title:'下发指令',
                            component:<Send form={this.props.form} />
                        }, {
                            title:'指令单信息',
                            component:<TabPane1 />
                        }
                    ]
                }
                stepsAction={
                    <div className="steps-action">
                        <Button type="primary" onClick={this.handleSubmit} > 下发 </Button>
                    </div>
                }
            />
        )
    }
}
export default Form.create()(SendDirect)