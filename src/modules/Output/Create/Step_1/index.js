/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Row, Col, Form, Card, Button} from 'antd';
import {getFields} from 'utils'
import {requestDict, request, setSelectFormat} from 'utils'
import TableForm from './TableForm.r'


class Step1 extends Component {
    state = {
        updateKey: Date.now(),
        loading: false,
        statusData: [],
        disabled: true,
        tableData: []
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFields((err) => {
            if (err) return;
            this.props.history.push('/web/output/create/fill')
        });
    }

    //去数据字典里面的状态
    getStatus = () => {
        requestDict(`['com.moya.contract.enums.ContractStatusEnum']`, result => {
            this.setState({
                statusData: setSelectFormat(result.ContractStatusEnum)
            })
        })
    }

    getList = () => {
        request('/con/contract/findListData')
        .then(res => {
            console.log(res.data);
            this.setState({
                tableData: res.data,
                count: res.count
            })
        })
    }

    componentDidMount() {
        this.getList();
        this.getStatus();
    }

    render() {

        const {form} = this.props;
        const {getFieldDecorator, getFieldValue} = form;
        const {disabled, tableData} = this.state;
        console.log(tableData);
        return (
        <React.Fragment>
            <Form onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
                <div className="advancedForm">
                    <Card>
                        <p>合同列表</p>
                        <Row gutter={24}>
                            {
                                getFields(form, [{
                                    label: '合同名称：',
                                    fieldName: 'number',
                                    type: 'input',
                                    span: 8,
                                    formItemStyle: null,
                                    fieldDecoratorOptions: {
                                        /*rules:[
                                            {
                                                required:true,
                                                message:'请选择企业'
                                            }
                                        ]*/
                                    },
                                }, {
                                    label: '合同编号：',
                                    fieldName: 'type',
                                    type: 'select',
                                    span: 8,
                                    options: [{label: '全部', key: ''}].concat(this.state.statusData),
                                    fieldDecoratorOptions: {
                                        initialValue: {label: '全部', key: ''},
                                        /*rules:[
                                            {
                                                required:true,
                                                message:'请选择变更类型'
                                            }
                                        ]*/
                                    },
                                    componentProps: {
                                        labelInValue: true,
                                    },
                                },

                                    {
                                        label: '合同状态：',
                                        fieldName: 'type',
                                        type: 'select',
                                        span: 8,
                                        options: [{label: '全部', key: ''}].concat(this.state.statusData),
                                        fieldDecoratorOptions: {
                                            initialValue: {label: '全部', key: ''},
                                            /*rules:[
                                                {
                                                    required:true,
                                                    message:'请选择变更类型'
                                                }
                                            ]*/
                                        },
                                        componentProps: {
                                            labelInValue: true,
                                        },
                                    },

                                ], 'vertical')
                            }
                        </Row>
                        <Row gutter={24} className='content-flex-end'>
                            {
                                getFields(form, [{
                                    label: '选择企业',
                                    fieldName: 'supplier',
                                    type: 'companyName',
                                    span: 8,
                                    formItemStyle: null,
                                    /*fieldDecoratorOptions:{
                                        rules:[
                                            {
                                                required:true,
                                                message:'请选择企业'
                                            }
                                        ]
                                    },*/
                                }, {
                                    label: '选择项目',
                                    fieldName: 'project',
                                    type: 'asyncSelect',
                                    span: 8,
                                    formItemStyle: null,
                                    componentProps: {
                                        fieldTextName: 'name',
                                        fieldValueName: 'id',
                                        doNotFetchDidMount: true,
                                        fetchAble: getFieldValue('supplier') || false,
                                        url: `/con/mdydirective/findItemByCompanyId?company_id=${getFieldValue('supplier')}`,

                                    }
                                }

                                ], 'vertical')
                            }
                            <Col className="gutter-row pb21" span={8}>
                                <Button type="primary">搜索</Button>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            {getFieldDecorator('members', {
                                initialValue: tableData,
                            })(<TableForm form={this.props.form} data={tableData}
                                          next={() => this.setState({disabled: false})}/>)}
                        </Row>
                    </Card>
                </div>
                <div className="steps-action">
                    <Button type="primary" onClick={this.handleSubmit} disabled={disabled}> 下一步</Button>
                </div>
            </Form>
        </React.Fragment>
        )
    }

}

export default Form.create()(withRouter(Step1))