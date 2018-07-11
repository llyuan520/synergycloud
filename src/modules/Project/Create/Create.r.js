// created by Lee in 2018/07/05

import React, {Component} from 'react';
import { Form, Row, Button,message   } from 'antd';
import { compose } from 'redux';
import {connect} from 'react-redux';
import { getFields,request } from  'utils'
import TableForm from '../TableForm/TableForm.r'
import {withRouter} from 'react-router-dom';
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

    componentWillMount(){
        let url = '/biz/items/findEditData'
        request(url, {
            params:{
                company_id: this.props.company_id,
            }
        }).then((data) => {
            // taxOptions
            // statusOptions
                if(data.state === 'ok'){
                    let tax_type = data.data.tax_type;
                    let item_status = data.data.item_status;
                    let taxOptions = [];
                    let statusOptions = [];
                    for(let i = 0;i< tax_type.length;i++){
                        taxOptions.push({
                            label: tax_type[i].name,
                            key: tax_type[i].value
                        })
                    }
                    for(let i = 0;i< item_status.length;i++){
                        statusOptions.push({
                            label: item_status[i].name,
                            key: item_status[i].value
                        })
                    }
                    this.setState({
                        taxOptions : taxOptions,
                        statusOptions: statusOptions,
                        //item_number: data.data.item_number,
                    })


                }
            })
            .catch(err => {
                console.log(err)
                message.error(err.message)
            })

    }

    render(){
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div className="ISA-fragment ISA-bgColor create-project">
                <Form>
                    <h2 className="createProjectTitle">新建项目</h2>

                    <div className="createProjectContent">
                        <h4 className="createProjectChildTitle">项目基本信息</h4>
                        <Row className="mt35">
                            {
                                getFields(this.props.form, [
                                    {
                                        label: '项目名称',
                                        fieldName: 'model.name',
                                        fieldDecoratorOptions:{
                                            initialValue: ''
                                        },
                                        type: 'input',
                                        span: 8
                                    },{
                                        label: '项目简称',
                                        fieldName: 'model.simple_name',
                                        fieldDecoratorOptions:{
                                            initialValue: ''
                                        },
                                        type: 'input',
                                        span: 8
                                    },{
                                        label: '企业项目编码',
                                        fieldName: 'model.number',
                                        type: 'input',
                                        // fieldDecoratorOptions:{
                                        //     initialValue: this.state.item_number
                                        // },
                                        span: 8,
                                        // componentProps: {
                                        //     disabled: true
                                        // },
                                    }
                                ])
                            }
                        </Row>
                        <Row >
                            {
                                getFields(this.props.form, [
                                    {
                                        label: '计税方式',
                                        fieldName: 'model.tax_type',
                                        type: 'select',
                                        span: 8,
                                        options: this.state.taxOptions,
                                    },{
                                        label: '状态',
                                        fieldName: 'model.status',
                                        type: 'select',
                                        span: 8,
                                        options: this.state.statusOptions,
                                    },{
                                        label: '经纬度',
                                        fieldName: 'model.longitudeAndLatitude',
                                        fieldDecoratorOptions:{
                                            initialValue: ''
                                        },
                                        type: 'longitudeAndLatitude',
                                        span: 8,
                                    }
                                ])
                            }
                        </Row>
                        <Row className="mt35">
                            {getFieldDecorator('members', {
                                initialValue: tableData,
                            })(
                                <TableForm taxOptions = {this.state.taxOptions} form={this.props.form}  />
                            )}
                        </Row>
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

