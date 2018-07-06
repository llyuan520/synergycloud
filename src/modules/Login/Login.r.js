// Created by liuliyuan on 2018/6/22
import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {Form,Input,Button,Icon,Row,Col} from 'antd'
import {Link} from 'react-router-dom'
import { compose } from 'redux';
import {connect} from 'react-redux';
import { accountLogin } from 'services/api';
import {regRules} from 'utils'
import './styles.less';
import qrcode from './imgs/qrcode.png'

const FormItem = Form.Item;

class Login extends Component {
    static propTypes={
        login:PropTypes.func.isRequired
    }

    state={
        error:{
            visible:false,
            msg:'出错了！'
        },
        loading:false
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        const {form,login} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                this.toggleLoading(true)
                login({
                    number:values.number,
                    password:values.password,
                    success:()=>{
                    },
                    fail:err=>{
                        this.setError(err)
                        this.toggleLoading(false)
                    },
                })
            }
        });
    }

    toggleLoading=b=>{
        this.setState({
            loading:b
        })
    }
    hiddenErr = () => {
        this.mount && this.setState(prevState=>({
            error:{
                visible:false
            }
        }))
    }
    setError=(msg, time = 4000)=>{
        clearTimeout(this.timer);
        this.setState({
            error:{
                visible:true,
                msg
            }
        },()=>{
            if(time){
                this.timer = setTimeout(()=>{
                    this.hiddenErr();
                },time)
            }
        })
    }
    checkLoggedIn= props =>{
        const {loggedIn,history} = props;
        if(loggedIn){
            history.replace('/web');
        }
    }
    componentWillMount(){
        this.checkLoggedIn(this.props)
    }
    mount=true
    componentWillUnmount(){
        this.mount = null;
    }
    componentWillReceiveProps(nextProps){
        this.checkLoggedIn(nextProps)
    }

    render(){
        const {getFieldDecorator} = this.props.form
        return(
            <div id="login-container">
                <div className="bg-top"> </div>
                <div className="main-fixed">
                    <div className="login-header-content">
                        <a href="#/">
                            <img className="login-logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo"/>
                            <span className="login-title">合同协同</span>
                        </a>
                    </div>
                    <div className="login-content clearfix">
                        <div className="login-content-left">
                            <Form onSubmit={this.handleSubmit} className="loginForm">
                                {/*<h2 className="welcome">登录</h2>
                                <h4 className="welcomeSpan">您好！欢迎使用合同履约协同管理系统</h4>*/}
                                <FormItem>
                                    {getFieldDecorator('number', {
                                        initialValue: '13570818167',
                                        rules: [
                                            {
                                                required: true, message: '请输入手机号码!'
                                            },
                                            {
                                                pattern:regRules.companyPhone,
                                                message: regRules.message,
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
                                    {getFieldDecorator('password', {
                                        initialValue: '12345678',
                                        rules: [{ required: true, message: '请输入密码!' }],
                                    })(
                                        <Input
                                            type="password"
                                            placeholder="密码"
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    )}
                                </FormItem>
                                <div style={{marginBottom: 20}}>
                                    <Link style={{color:'#333'}} to="/forgetPassword">
                                        忘记密码
                                    </Link>
                                    <Link style={{float: 'right'}} to="/register">
                                        新用户注册
                                    </Link>
                                </div>
                                <FormItem>
                                    <Button loading={this.state.loading} type="primary" htmlType="submit" className="loginFormButton">
                                        登录
                                    </Button>
                                </FormItem>
                            </Form>
                        </div>
                        <div className="login-content-right">
                            <img className="login-qrcode" src={qrcode}  alt="login-banner"/>
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
                    </div>
                </div>
            </div>
        )
    }
}

const enhance = compose(
    connect(state=>({
        loggedIn:state.user.get('loggedIn'),
    }),dispatch=>({
        login:accountLogin,
    })),
    Form.create()
)
export default enhance(Login);