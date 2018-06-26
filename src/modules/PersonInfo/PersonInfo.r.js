// Created by liuliyuan on 2018/6/26
import React,{Component} from 'react';
import {Form,Input,Button,Icon} from 'antd'
import './index.less'

const FormItem = Form.Item;
class PersonInfo extends Component {

    state={
        loading:false,
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        const {form} = this.props;
        form.validateFields((err, values) => {
            if (!err) {

                this.toggleLoading(true)
                console.log(values);
                /*request('/forgetPassword', {
                    method: 'POST',
                    body: values
                })
                    .then(res => {
                        this.toggleLoading(false)
                        if(res.state === 'ok'){
                            message.success('修改密码成功!', 3);
                            history.replace('/login');
                            return ;
                        } else {
                            return Promise.reject(res.message);
                        }
                    })
                    .catch( resErr => {
                        message.error(`${resErr}`);
                        this.toggleLoading(false)
                    });*/

            }
        });
    }

    toggleLoading=b=>{
        this.setState({
            loading:b
        })
    }

    render(){

        const {getFieldDecorator} = this.props.form;
        const { loading } = this.state;

       /* const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 22 },
            },
        };*/
        return(
            <div id="register-container">
                <div className="bg-top login-header-content">
                    <img className="login-logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo"/>
                    <span className="login-title">合同协同</span>
                </div>
                <div className="main-fixed">
                    <div className="login-content clearfix">
                        <div className="login-content-left">
                            <Form onSubmit={this.handleSubmit} className="loginForm">
                                <h2 className="welcome">完善资料</h2>
                                <h4 className="welcomeSpan">方便企业找到您，更流畅的进行操作</h4>
                                <FormItem
                                    // {...formItemLayout}
                                    // colon={false}
                                    // label={<span></span>}
                                >
                                    {getFieldDecorator('realName', {
                                        //initialValue: '真实姓名',
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入真实姓名！',
                                            },
                                        ],
                                    })(
                                        <Input
                                            placeholder="请输入真实姓名"
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    )}
                                </FormItem>

                                <h2 className="welcome">
                                    加入企业
                                </h2>
                                <FormItem>
                                    {getFieldDecorator('confirm', {
                                        initialValue: '企业编码',
                                    })(
                                        <Input
                                            placeholder="请输入企业编码"
                                            prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('confirm', {
                                        initialValue: '申请备注',
                                    })(
                                        <Input
                                            placeholder="请输入申请备注"
                                            prefix={<Icon type="file-text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button loading={loading} type="primary" htmlType="submit" className="loginFormButton">
                                        保存
                                    </Button>
                                </FormItem>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(PersonInfo);