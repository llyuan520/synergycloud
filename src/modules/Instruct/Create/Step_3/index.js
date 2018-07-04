// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Form,Button } from 'antd';
import CustomizeTabs from '../Tabs'
import TabPane2 from '../Step_2/tab2'
import TabPane3 from './tab3'

class Step3 extends Component {
    state={
        updateKey:Date.now(),
        visible:false,
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);

            }
        });
    }

    handleSave = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);

            }
        });
    }

    render(){

        return(
            <React.Fragment>
                <Form layout="vertical" hideRequiredMark>
                    <CustomizeTabs
                        tab="3"
                        TabPane_2={ <TabPane2 display={true} /> }
                        TabPane_3={ <TabPane3 form={this.props.form}  /> }
                    />

                    <div className="steps-action">
                        <Button type="primary" onClick={this.handleSubmit} > 提交 </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleSave} > 保存 </Button>
                        <Button style={{ marginLeft: 8 }} href="/web/instruct/create/assign"> 上一步 </Button>
                    </div>
                </Form>
            </React.Fragment>
        )
    }
}

export default Form.create()(withRouter(Step3))