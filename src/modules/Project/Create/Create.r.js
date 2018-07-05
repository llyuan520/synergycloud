import React, {Component} from 'react';
import { Form, Row, Button  } from 'antd';
import { getFields } from  'utils'
import TableForm from '../TableForm/TableForm.r'
import './styles.less'



const tableData = [
    {
        periodization_code: '111211',
        periodization_name: 'wwwwwkkkkk',
        tax_methods: 'aaaaaa',
        key: '1',
    },
    {
        periodization_code: '111211',
        periodization_name: 'wwwwwkkkkk',
        tax_methods: 'aaaaaa',
        key: '2',
    },
    {
        periodization_code: '111211',
        periodization_name: 'wwwwwkkkkk',
        tax_methods: 'aaaaaa',
         key: '3',
    },
];

class CreateProject extends Component{


    constructor(){
        super();
        this.state = {
            taxOptions: [
                {label:'计税方式1', key:'1'},
                {label:'计税方式2', key:'2'},
                {label:'计税方式3', key:'3'},
            ],
            statusOptions: [
                {label:'状态1',key:'1'},
                {label:'状态2',key:'2'},
                {label:'状态3',key:'3'},
                {label:'状态4',key:'4'},
            ]
        }
    }

    handleSubmit = (e)=>{
        e = e || window.event;
        e.preventDefault();
        console.log('我来啦啦啦啦')
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
                                        label: '名称',
                                        fieldName: 'project_name',
                                        type: 'input',
                                        span: 8
                                    },{
                                        label: '简称',
                                        fieldName: 'abbreviation',
                                        type: 'input',
                                        span: 8
                                    },{
                                        label: '编号',
                                        fieldName: 'project_code',
                                        type: 'input', 
                                        span: 8,
                                        componentProps: {
                                            disabled: true
                                        },
                                    }
                                ])
                            }
                        </Row>
                        <Row >
                            {
                                getFields(this.props.form, [
                                    {
                                        label: '计税方式',
                                        fieldName: 'tax_methods',
                                        type: 'select',
                                        span: 8,
                                        options: this.state.taxOptions,
                                    },{
                                        label: '状态',
                                        fieldName: 'status',
                                        type: 'select',
                                        span: 8,
                                        options: this.state.statusOptions,
                                    },{
                                        label: '经纬度',
                                        fieldName: 'longitudeAndLatitude',
                                        type: 'longitudeAndLatitude', 
                                        span: 8,
                                    }
                                ])
                            }
                        </Row>
                        <Row className="mt35">
                            {getFieldDecorator('members', {
                                initialValue: tableData,
                            })(<TableForm form={this.props.form} />)}   
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

export default Form.create()(CreateProject)