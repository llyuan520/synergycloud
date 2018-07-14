// created by Lee in 2018/07/11

import React,{Component} from 'react'
import {  Form,Button, Row, Col, Card, message } from 'antd';
import { compose } from 'redux';
import {connect} from 'react-redux';
import { request,getQueryString } from  'utils'
import {withRouter} from 'react-router-dom';
import TabShow from './tab1Show'
import TabEdit from './tab1Edit'

class TabPane1 extends Component{

    constructor(){
        super();
        this.state={
            editstatus: false,
        }
    }

    toggleTheEditStatus = ()=>{
        this.setState({
            editstatus: !this.state.editstatus
        })
    }


    handleSubmit = (e)=>{
        e && e.preventDefault();
        this.props.form.validateFields((err, value) => {
            let id = getQueryString('id');
            let model = {...value};
            model.model.company_id = this.props.company_id;
            model['model']['id'] = id;
            for(let i = 0;i< model.members.length;i++){
                let periodization_code = model.members[i].code;
                let periodization_name = model.members[i].label;
                let tax_type_key = model.members[i].tax_type_key;
                let key = model.members[i].key;
                if(key.indexOf('new_') !== -1){
                    key = '';
                }
                model.members[i] = {};
                model.members[i].stages_number = periodization_code;
                model.members[i].stages_name = periodization_name;
                model.members[i].stages_tax_type = tax_type_key;
                model.members[i].stages_id = key;
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

            request('/biz/items/save',{
                method: 'POST',
                body: model
            }).then((data) => {
                // taxOptions
                // statusOptions
                if(data.state === 'ok'){
                    message.success('修改成功')
                    setTimeout(()=>{
                        window.location.reload()
                    },200)
                }else{
                    message.error('修改失败')
                }
            })
                .catch(err => {
                    console.log(err)
                    message.error(err.message)
                })


        })
    }

    render(){
        const data = this.props.data;
        const { editstatus } =  this.state;
        return (

            <Card bordered={false}>
                <Row gutter={24} style={{marginBottom:15}}>
                    <Col span={21}>

                    </Col>
                    <Col span={3}>
                        <Button size='small' onClick={ this.toggleTheEditStatus }>
                            {
                                editstatus === false ? '编辑' : '取消'
                            }
                        </Button>
                    </Col>
                </Row>
                {
                    editstatus === false ?
                    <TabShow data = { data }/>
                    :
                    <Form>
                        <TabEdit form = {this.props.form}  data = { data }/>
                        <div className="steps-action">
                            <Button type="primary" onClick={this.handleSubmit}> 完成 </Button>
                        </div>
                    </Form>

                }
            </Card>
        )
    }

}

const enhance = compose(
    connect(state=>({
        company_id:state.user.getIn(['personal','company_id'])
    })),
    Form.create()
)

export default Form.create()(withRouter(enhance(TabPane1)))