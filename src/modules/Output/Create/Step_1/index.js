/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Row, Col, Form, Card, Button} from 'antd';
import {getFields} from 'utils'
import {requestDict, request, setSelectFormat} from 'utils'
import TableForm from './TableForm.r';
import _ from "lodash"
import {objToStrRouter} from "../../../../utils";


class Step1 extends Component {
    state = {
        updateKey: Date.now(),
        loading: false,
        statusData: [],
        disabled: true,
        tableData: [],
        conName: [],
        conNum: [],
        query: {
            outputnumber: '',
            status: '',
            itemsname: ''
        }
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFields((err) => {
            const {is_submission, id} = this.state;
            // 这里将是否为收货记录用一个is_submission字段保存在路由中，可以在页面去调用
            if (err) return;
            this.props.history.push({
                pathname: '/web/output/create/fill',
                search: objToStrRouter({id, is_submission})
            })
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

    getConName(contractname) {
        request("/con/contract/getContractByName", {params: {contractname}})
        .then(res => {
            // console.log(res.data.contract);
            this.setState({
                conName: setSelectFormat(res.data.contract, "id", "contract_name")
            })
        })
    }

    getConNum(contractnumber) {
        request("/con/contract/getContractByNumber", {params: {contractnumber}})
        .then(res => {
            console.log(res.data.contract);
            this.setState({
                conNum: setSelectFormat(res.data.contract)
            })
        })
    }

    getList() {
        let params = this.state.query;
        for (let i in params) {
            if (!params[i]) {
                delete params[i]
            }
        }
        request('/con/contract/findListData', {params})
        .then(res => {
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
        const {disabled, tableData, conName, conNum, statusData} = this.state;
        console.log(conName);
        let itime;
        return (
        <React.Fragment>
            <Form onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
                <div className="advancedForm">
                    <Card>
                        <p>合同列表</p>
                        <Row gutter={24} className='content-flex-end'>
                            {
                                getFields(form, [{
                                    label: '合同名称：',
                                    fieldName: 'outputName',
                                    type: 'outputName',
                                    span: 8,
                                    formItemStyle: null,
                                }, {
                                    label: '合同编号：',
                                    fieldName: 'type',
                                    type: 'select',
                                    span: 8,
                                    options: [{label: '全部', key: ''}].concat(conNum),
                                    fieldDecoratorOptions: {
                                        initialValue: "",
                                    },
                                    componentProps: {
                                        showSearch: true,
                                        onSearch: (e) => {
                                            clearTimeout(itime);
                                            itime = setTimeout(() => {
                                                this.getConNum(e)
                                            }, 100);
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
                                            initialValue: "",
                                        },
                                        componentProps: {
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
                <div className="steps-action">
                    <Button type="primary" onClick={this.handleSubmit} disabled={disabled}> 下一步</Button>
                </div>
            </Form>
        </React.Fragment>
        )
    }

}

export default Form.create()(withRouter(Step1))