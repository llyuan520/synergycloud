// Created by liuliyuan on 2018/6/25
import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {Form,message} from 'antd'
import { compose } from 'redux';
import {connect} from 'react-redux';
import { accountRegister } from 'services/api';
import { FormItems } from 'components'

class Register extends Component {

    static propTypes = {
        history:PropTypes.object.isRequired
    }

    state={
        loading:false,
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        const {form,register,isPersonInfo,history} = this.props;
        form.validateFields((err, values) => {
            if (!err) {

                this.toggleLoading(true)
                register({
                    identifier: values.identifier,
                    password: values.password,
                    confirm: values.password,
                    success:()=>{
                        if(isPersonInfo){
                            history.replace('/personInfo');
                        } else {
                            history.replace('/login');
                        }
                    },
                    fail:err=>{
                        message.error(`${err}`);
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

    render(){
        const { loading } = this.state;
        return(
            <FormItems
                isModules="register"
                loading={loading}
                form={this.props.form}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

const enhance = compose(
    connect(state=>({
        isPersonInfo:state.user.get('isPersonInfo')
    }),dispatch=>({
        register:accountRegister,
    })),
    Form.create()
)
export default enhance(Register);