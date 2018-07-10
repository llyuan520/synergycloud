/**
 *
 * Created by fanzhe on 2018/7/10
 */

import React from "react";
import TableForm from "./TableForm.r";
import {Button, Card, Col, Form, Row} from "antd";
import {withRouter} from "react-router-dom";
import _ from "lodash";
import {getFields} from 'utils'

class Step1 extends React.Component {
    state = {
        updateKey: Date.now(),
        loading: false,
        statusData: [],
        disabled: false,
        tableData: [],
        conName: [],
        conNum: [],
    };
    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFields((err) => {
            if (err) return;
            this.props.history.push({
                pathname: '/web/contract/create/assign',
            })
        });
    }

    render() {
        const {form} = this.props;
        const {getFieldDecorator, getFieldValue} = form;
        const {disabled, tableData, conName, conNum, statusData} = this.state;
        return (
        <React.Fragment>
            <Form onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
                <div className="advancedForm">
                    <Card>
                        <h4>选择要发起合同结算的合同</h4>
                        <Row gutter={24}>
                            {
                                getFields(form, [{
                                    label: '合同名称：',
                                    fieldName: 'number',
                                    type: 'select',
                                    span: 8,
                                    options: [{label: '全部', key: ''}].concat(conName),
                                    fieldDecoratorOptions: {
                                        initialValue: {label: '全部', key: ''},
                                    },
                                    componentProps: {
                                        labelInValue: true,
                                        showSearch: true,
                                        onSearch: (e) => {
                                            this.getConName(e);
                                        },
                                        onSelect: (e) => {
                                            this.setState({
                                                query: _.extend(this.state.query, {itemsname: e})
                                            })
                                        }
                                    },
                                }, {
                                    label: '合同编号：',
                                    fieldName: 'type',
                                    type: 'select',
                                    span: 8,
                                    options: [{label: '全部', key: ''}].concat(conNum),
                                    fieldDecoratorOptions: {
                                        initialValue: {label: '全部', key: ''},
                                    },
                                    componentProps: {
                                        labelInValue: true,
                                        showSearch: true,
                                        onSearch: (e) => {
                                            this.getConNum(e);
                                        },
                                        onSelect: (e) => {
                                            this.setState({
                                                query: _.extend(this.state.query, {outputnumber: e})
                                            })
                                        }
                                    },
                                },

                                    {
                                        label: '合同状态：',
                                        fieldName: 'type',
                                        type: 'select',
                                        span: 8,
                                        options: [{label: '全部', key: ''}].concat(statusData),
                                        fieldDecoratorOptions: {
                                            initialValue: {label: '全部', key: ''},
                                        },
                                        componentProps: {
                                            labelInValue: true,
                                            onSelect: (e) => {
                                                this.setState({
                                                    query: _.extend(this.state.query, {status: e})
                                                })
                                            }
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
                                <Button type="primary" onClick={() => this.getList()}>搜索</Button>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            {getFieldDecorator('members', {
                                initialValue: tableData,
                            })(<TableForm form={this.props.form}
                                          next={(e) => this.setState({
                                              disabled: false,
                                              id: e[0].id,
                                              is_submission: e[0].is_submission
                                          })}/>)}
                        </Row>
                    </Card>
                </div>
                <div>
                    <Button type="primary" onClick={this.handleSubmit} disabled={disabled}> 下一步</Button>
                </div>
            </Form>
        </React.Fragment>
        )
    }

}


export default Form.create()(withRouter(Step1))