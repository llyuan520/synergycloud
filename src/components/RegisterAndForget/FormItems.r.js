// Created by liuliyuan on 2018/6/26
import React,{Component} from 'react';
import {Form,Input,Button,Icon,Row,Col,Divider,message,Popover,Progress} from 'antd'
import {Link} from 'react-router-dom'
import { regRules,request } from 'utils';
import './styles.less'

const FormItem = Form.Item;

const passwordStatusMap = {
    ok: <div className='success'>强度：强</div>,
    pass: <div className='warning'>强度：中</div>,
    poor: <div className='error'>强度：太短</div>,
};

const passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
};

class FormItems extends Component {

    state={
        count: 0,
        visible: false,
        help: '',
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleFetchCaptcha = () => {
        const {form} = this.props;
        const value = form.getFieldValue('number');
        const regex = regRules.companyPhone.pattern;

        if (value) {
            if(regex.test(value)){
                request('/captcha', {
                    params: {
                        phone:value,
                        type: this.props.isModules === 'register' ? 'captcha_register' : 'captcha_forget',
                    }
                })
                    .then(res => {
                        if (res.state === 'ok') {
                            message.success('验证码发送成功!', 3);
                            this.onGetCaptcha()
                            return;
                        } else {
                            return Promise.reject(res.message);
                        }
                    }).catch(resErr => {
                    message.error(`${resErr}`);
                });
            }
        }

        form.validateFields(['number'], { force: true });
    }

    onGetCaptcha = () => {
        let count = 59;
        this.setState({ count });
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    };

    getPasswordStatus = () => {
        const { form } = this.props;
        const value = form.getFieldValue('password');
        if (value && value.length > 9) {
            return 'ok';
        }
        if (value && value.length > 5) {
            return 'pass';
        }
        return 'poor';
    };

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.handleSubmit && this.props.handleSubmit()
    }

    checkConfirm = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不匹配!');
        } else {
            callback();
        }
    };

    checkPassword = (rule, value, callback) => {
        if (!value) {
            this.setState({
                help: '请输入密码！',
                visible: !!value,
            });
            callback('error');
        } else {
            this.setState({
                help: '',
            });
            if (!this.state.visible) {
                this.setState({
                    visible: !!value,
                });
            }
            if (value.length < 6) {
                callback('error');
            } else {
                const { form } = this.props;
                if (value) {
                    form.validateFields(['confirm'], { force: true });
                }
                callback();
            }
        }
    };

    renderPasswordProgress = () => {
        const { form } = this.props;
        const value = form.getFieldValue('password');
        const passwordStatus = this.getPasswordStatus();
        return value && value.length ? (
            <div className={`progress-${passwordStatus}`}>
                <Progress
                    status={passwordProgressMap[passwordStatus]}
                    className='progress'
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        ) : null;
    };

    render(){
        const { loading,isModules } = this.props;
        const {getFieldDecorator} = this.props.form;
        const { count } = this.state;
        const isShow = isModules === 'register';
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
                                <h2 className="welcome">
                                    {
                                        isShow ? '新用户注册' : '忘记密码'
                                    }
                                </h2>
                                <FormItem>
                                    {getFieldDecorator('number', {
                                        initialValue: '18682302520',
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入手机号！',
                                            },
                                            {
                                                pattern:regRules.companyPhone,
                                                message: regRules.message,
                                            },
                                        ],
                                    })(
                                        <Input
                                            placeholder="11位手机号"
                                            prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Row gutter={8}>
                                        <Col span={16}>
                                            {getFieldDecorator('captcha', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入验证码！',
                                                    },
                                                ],
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
                                                onClick={ this.handleFetchCaptcha }
                                            >
                                                {count ? `${count} s` : '获取验证码'}
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem help={this.state.help}>
                                    <Popover
                                        content={
                                            <div style={{ padding: '4px 0' }}>
                                                {passwordStatusMap[this.getPasswordStatus()]}
                                                {this.renderPasswordProgress()}
                                                <div style={{ marginTop: 10 }}>
                                                    请至少输入 6 个字符。请不要使用容易被猜到的密码。
                                                </div>
                                            </div>
                                        }
                                        overlayStyle={{ width: 240 }}
                                        placement="right"
                                        visible={this.state.visible}
                                    >
                                        {getFieldDecorator('password', {
                                            initialValue: '12345678',
                                            rules: [
                                                {
                                                    validator: this.checkPassword,
                                                },
                                            ],
                                        })(
                                            <Input
                                                type="password"
                                                placeholder="至少6位密码，区分大小写"
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            />
                                        )}
                                    </Popover>
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('confirm', {
                                        initialValue: '12345678',
                                        rules: [
                                            {
                                                required: true,
                                                message: '请确认密码！',
                                            },
                                            {
                                                validator: this.checkConfirm,
                                            },
                                        ],
                                    })(
                                        <Input
                                            type="password"
                                            placeholder="确认密码"
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            onBlur={this.handleConfirmBlur}
                                        />
                                    )}
                                </FormItem>
                                <div style={{marginBottom: 20}}>
                                    <Link style={{color:'#333'}} to="/login">
                                        使用已有账户登录
                                    </Link>
                                    {
                                        isShow && <Link style={{float: 'right'}} to="/forgetPassword">
                                                        忘记密码
                                                  </Link>
                                    }

                                </div>
                                <FormItem>
                                    <Button loading={loading} type="primary" htmlType="submit" className="loginFormButton">
                                        {
                                            isShow ? '注册' : '提交'
                                        }
                                    </Button>
                                </FormItem>
                                {
                                    isShow && <span>
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
                                            </span>
                                }

                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default FormItems;