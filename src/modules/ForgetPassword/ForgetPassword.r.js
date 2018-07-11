// Created by liuliyuan on 2018/6/26
import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {Form,message} from 'antd'
import { FormItems } from 'components'
import { request } from 'utils';

class ForgetPassword extends Component {

    static propTypes = {
        history:PropTypes.object.isRequired
    }

    state={
        loading:false,
    }



    handleSubmit = (e) => {
        e && e.preventDefault();
        const {form,history} = this.props;
        form.validateFields((err, values) => {
            if (!err) {

                this.toggleLoading(true)
                console.log(values);
                request('/resetPassword', {
                    method: 'POST',
                    body: values
                })
                    .then(res => {
                        this.toggleLoading(false)
                        if(res.state === 'ok'){
                            message.success('密码重置成功!', 3);
                            history.replace('/login');
                            return ;
                        } else {
                            return Promise.reject(res.message);
                        }
                    })
                    .catch( resErr => {
                        message.error(`${resErr}`);
                        this.toggleLoading(false)
                    });

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
        return (
            <FormItems
                isModules="forget"
                loading={loading}
                form={this.props.form}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

export default  Form.create()(ForgetPassword);