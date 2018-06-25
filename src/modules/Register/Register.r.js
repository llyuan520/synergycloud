// Created by liuliyuan on 2018/6/25
import React,{Component} from 'react';
import {Form,Input,Button,Icon,Row,Col,Divider} from 'antd'
import './index.less';

const FormItem = Form.Item;

class Register extends Component {

    state={
        count: 0,
        loading:false
    }

    componentDidMount() {

    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    onGetCaptcha = () => {
        let count = 59;
        this.setState({ count });
        if (this.props.onGetCaptcha) {
            this.props.onGetCaptcha();
        }
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    };

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.toggleLoading(true)
                this.toggleLoading(false)
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
        const { count } = this.state;
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
                                <h2 className="welcome">新用户注册</h2>
                                <FormItem>
                                    {getFieldDecorator('identifier', {
                                        //initialValue: '13570818167',
                                        rules: [
                                            {
                                                required: true, message: '请输入手机号码!'
                                            },
                                            {
                                                pattern: /^1\d{10}$/,
                                                message: '错误的手机号码格式！',
                                            }
                                        ],
                                    })(
                                        <Input
                                            placeholder="手机号码"
                                            prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Row gutter={8}>
                                        <Col span={16}>
                                            {getFieldDecorator('captcha', {
                                                rules: [{ required: true, message: '请输入您获得的验证码！' }],
                                            })(
                                                <Input
                                                    placeholder="验证码"
                                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                />
                                            )}
                                        </Col>
                                        <Col span={8}>
                                            <Button
                                                disabled={count}
                                                className='getCaptcha'
                                                onClick={this.onGetCaptcha}
                                            >
                                                {count ? `${count} s` : '获取验证码'}
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        //initialValue: '12345678',
                                        rules: [{ required: true, message: '请输入密码!' }],
                                    })(
                                        <Input
                                            type="password"
                                            placeholder="密码"
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password2', {
                                        //initialValue: '12345678',
                                        rules: [{ required: true, message: '请输入重复密码!' }],
                                    })(
                                        <Input
                                            type="password"
                                            placeholder="重复密码"
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    )}
                                </FormItem>
                                <div style={{marginBottom: 20}}>
                                    <a href="/login" style={{color:'#333'}}>已有账号，去登录</a>
                                    <a href="" style={{float: 'right'}}>忘记密码</a>
                                </div>
                                <FormItem>
                                    <Button loading={this.state.loading} type="primary" htmlType="submit" className="loginFormButton">
                                        注册
                                    </Button>
                                </FormItem>

                                <Divider className="login-divider"> 第三方登录 </Divider>
                                <div className="login-content-bottom">
                                    <Row className="login-other">
                                        <Col span={8}>
                                            <a href="#/"><Icon type="qq" /></a>
                                        </Col>
                                        <Col span={8}>
                                            <a href="#/"><Icon type="weibo" /></a>
                                        </Col>
                                        <Col span={8}>
                                            <a href="#/"><Icon type="wechat" /></a>
                                        </Col>
                                    </Row>
                                </div>

                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(Register);