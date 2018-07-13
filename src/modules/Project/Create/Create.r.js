// created by Lee in 2018/07/05

import React, {Component} from 'react';
import { Form, Button,message   } from 'antd';
import { compose } from 'redux';
import {connect} from 'react-redux';
import { request } from  'utils'
import {withRouter} from 'react-router-dom';
import Projectinfo from '../ProjectUtil/Projectinfo'
import './styles.less'



const tableData = [];

class CreateProject extends Component{


    constructor(props,context){
        super();
        this.state = {
            taxOptions: [],
            statusOptions: [],
            //item_number: '',
        }
    }

    handleSubmit = (e)=>{
        e && e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (err) {
                return;
            }
            let id = '';
            let model = {...value};
            model.model.company_id = this.props.company_id;
            for(let i = 0;i< model.members.length;i++){
                let periodization_code = model.members[i].periodization_code;
                let periodization_name = model.members[i].periodization_name;
                let tax_methods_key = model.members[i].tax_methods_key;
                model.members[i] = {};
                model.members[i].stages_number = periodization_code;
                model.members[i].stages_name = periodization_name;
                model.members[i].stages_tax_type = tax_methods_key;
            }

            let longitudeAndLatitude = value.model.longitudeAndLatitude;
            if(longitudeAndLatitude === '' || longitudeAndLatitude === 'undefined'){
                model.model.longitude = '';
                model.model.latitude = '';
            }else{
                model.model.longitude = longitudeAndLatitude.split(',')[0];
                model.model.latitude = longitudeAndLatitude.split(',')[1];
            }

            //校验
            if(model.model.name === ''){
                message.warn('项目名称不能为空');
                return
            }
            if(model.model.simple_name === ''){
                message.warn('项目简称不能为空');
                return
            }
            if(model.model.number === ''){
                message.warn('企业项目编码不能为空');
                return
            }
            if(model.model.tax_type === undefined){
                message.warn('请选择计税方式');
                return
            }
            if(model.model.status === undefined){
                message.warn('请选择状态');
                return
            }


            let url = '/biz/items/save'
            request(url, {
                method: 'POST',
                body: model
            }).then((data) => {
                // taxOptions
                // statusOptions
                console.log(data);
                if(data.state === 'ok'){
                    id = data.items_id;

                    this.props.history.push(`/web/project/org?id=${id}`);
                }else{
                    return;
                }
            })
            .catch(err => {
                console.log(err)
                message.error(err.message)
            })



        })
    }



    render(){
        return (
            <div className="ISA-fragment ISA-bgColor create-project">
                <Form>
                    <h2 className="createProjectTitle">新建项目</h2>

                    <div className="createProjectContent">
                        <h4 className="createProjectChildTitle">项目基本信息</h4>
                            <Projectinfo form={this.props.form} tableData = { tableData }/>
                    </div>
                    <div className="steps-action">
                        <Button type="primary" onClick={this.handleSubmit}> 下一步 </Button>
                    </div>
                </Form>
            </div>

        )
    }
}


const enhance = compose(
    connect(state=>({
        company_id:state.user.getIn(['personal','company_id'])
    })),
    Form.create()
)
export default withRouter(enhance(CreateProject));

