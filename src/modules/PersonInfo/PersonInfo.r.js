// Created by liuliyuan on 2018/6/26
import React,{Component} from 'react';
import {Form,Input,Button,Icon} from 'antd'
import {Link} from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { changeUserInfoStatus } from 'ducks/user'
import './styles.less'

const FormItem = Form.Item;


const addUserInfo = (context) =>{
    const {getFieldDecorator} = context.props.form;
    return (
        <span>
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
        </span>
    )
}

const addCompany = (context) =>{
    const {getFieldDecorator} = context.props.form;
    return (
        <span>
            <h2 className="welcome">
                加入企业
            </h2>
            <FormItem>
                {getFieldDecorator('code', {
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
        </span>
    )
}

class PersonInfo extends Component {

    constructor(props){
        super(props);
        this.state={
            loading:false,
            status:props.userInfoStatus,
        }
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        const { form,changeUserInfoStatus } = this.props;
        form.validateFields((err, values) => {

            console.log(values)

            if (!err) {

                this.toggleLoading(true)


                if(this.state.status === false){
                    console.log('false', values);
                    changeUserInfoStatus(true);
                    this.setState({
                        status:true
                    })
                    this.toggleLoading(false)
                } else {
                    console.log('true', values);
                    this.toggleLoading(false)

                }

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
            <div id="personInfo-container">
                <div className="bg-top login-header-content">
                    <img className="login-logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo"/>
                    <span className="login-title">合同协同</span>
                </div>
                <div className="main-fixed">
                    <div className="login-content clearfix">
                        <div className="login-content-left">
                            <Form onSubmit={this.handleSubmit} className="loginForm">

                                {
                                    this.state.status === false ? addUserInfo(this) : addCompany(this)
                                }

                                <FormItem>
                                    <Button loading={loading} type="primary" htmlType="submit" className="loginFormButton">
                                        保存
                                    </Button>
                                </FormItem>
                                {
                                    this.state.status && <div style={{marginBottom: 24}}>
                                                            <Link style={{float: 'right',color:'#ccc'}} to="/web">
                                                                跳过
                                                            </Link>
                                                         </div>
                                }
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const enhance = compose(
    connect(state=>({
        userInfoStatus: state.user.get('userInfoStatus')
    }),dispatch=>({
        changeUserInfoStatus:changeUserInfoStatus,
    })),
    Form.create()
)
export default enhance(PersonInfo);