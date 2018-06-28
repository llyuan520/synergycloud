// Created by liuliyuan on 2018/6/28
import React,{Component} from 'react';
import { Form, Card } from 'antd';
import { TableSearchListForm } from '../../components'
import './index.less'


class Instruct extends Component {

    state={
        loading:false,
        expandForm: false,
        formValues: {},
    }

    handleSearch = values => {
        //e && e.preventDefault();
        console.log(values)
        /*const { form } = this.props;

         form.validateFields((err, fieldsValue) => {
         if (err) return;
         console.log(fieldsValue)
         const values = {
         ...fieldsValue,
         updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
         };

         this.setState({
         formValues: values,
         });

         });*/
    };

    render(){

        return(
            <div>

                <TableSearchListForm
                    form={ this.props.form }
                    fieldsData={
                        [
                            {
                                label:'项目名称',
                                fieldName:'projectName',
                                type:'input',
                                fieldDecoratorOptions:{
                                    rules:[
                                        {
                                            required:true,
                                            message:'请输入项目名称'
                                        }
                                    ]
                                },
                            }, {
                                label:'状态',
                                fieldName:'status',
                                type:'select',
                                options:[
                                    {
                                        label:'全部',
                                        key:''
                                    },
                                    {
                                        label:'我方股东',
                                        key:'1'
                                    },
                                    {
                                        label:'他方股东',
                                        key:'2'
                                    }
                                ],
                                fieldDecoratorOptions:{
                                    rules:[
                                        {
                                            required:true,
                                            message:'请选择状态'
                                        }
                                    ]
                                },
                                componentProps: {
                                    labelInkey:true,
                                },
                            }, {
                                label:'项目代码',
                                fieldName:'code',
                                type:'input',
                                fieldDecoratorOptions:{
                                    rules:[
                                        {
                                            required:true,
                                            message:'请输入项目代码'
                                        }
                                    ]
                                },
                            },{
                                label:'项目名称1',
                                fieldName:'projectName1',
                                type:'input',
                                fieldDecoratorOptions:{
                                    rules:[
                                        {
                                            required:true,
                                            message:'请输入项目名称'
                                        }
                                    ]
                                },
                            }, {
                                label:'状态1',
                                fieldName:'status1',
                                type:'select',
                                options:[
                                    {
                                        label:'全部',
                                        key:''
                                    },
                                    {
                                        label:'我方股东',
                                        key:'1'
                                    },
                                    {
                                        label:'他方股东',
                                        key:'2'
                                    }
                                ],
                                fieldDecoratorOptions:{
                                    rules:[
                                        {
                                            required:true,
                                            message:'请选择状态'
                                        }
                                    ]
                                },
                                componentProps: {
                                    labelInkey:true,
                                },
                            }, {
                                label:'项目代码1',
                                fieldName:'code1',
                                type:'input',
                                fieldDecoratorOptions:{
                                    rules:[
                                        {
                                            required:true,
                                            message:'请输入项目代码'
                                        }
                                    ]
                                },
                            },{
                                label:'项目名称2',
                                fieldName:'projectName2',
                                type:'input',
                                fieldDecoratorOptions:{
                                    rules:[
                                        {
                                            required:true,
                                            message:'请输入项目名称'
                                        }
                                    ]
                                },
                            }, {
                                label: '状态2',
                                fieldName: 'status2',
                                type: 'select',
                                options: [
                                    {
                                        label: '全部',
                                        key: ''
                                    },
                                    {
                                        label: '我方股东',
                                        key: '1'
                                    },
                                    {
                                        label: '他方股东',
                                        key: '2'
                                    }
                                ],
                                fieldDecoratorOptions: {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择状态'
                                        }
                                    ]
                                },
                                componentProps: {
                                    labelInkey: true,
                                },
                            }
                        ]
                    }
                    handleSearch={ values => this.handleSearch(values) }
                />

                <Card bordered={false}>
                    asdfsdafasdf
                </Card>
            </div>
        )
    }
}

export default Form.create()(Instruct);