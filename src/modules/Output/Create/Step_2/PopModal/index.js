/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React, {Component} from 'react';
import {Button, Modal, Form, Row, Col, Divider,} from 'antd';
import './styles.less'
import {fMoney, getFields, setSelectFormat} from "../../../../../utils";
import FormItems from "../../../../../components/FormItems";
import request from "../../../../../utils/request";

const {AsyncSelect} = FormItems.AsyncSelect;


class PopModal extends Component {
    static defaultProps = {
        type: 'edit',
        visible: true,
    }
    state = {
        initData: {},
        userId: "",
        data: this.props && this.props.data || [],
        conName: []
    }

    callback = (key, name) => {
        const {setFieldsValue} = this.props.form;
        setFieldsValue({
            [name]: key.length > 0 && true
        })
        console.log(key, name);
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.setData(values)
                this.props.toggleModalVisible(false);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.visible) {
            /**
             * 关闭的时候清空表单
             * */
            nextProps.form.resetFields();
            this.setState({
                defaultData: {}
            })
        }
        if (this.props.visible !== nextProps.visible && !this.props.visible && nextProps.modalConfig.type !== 'add') {
            /**
             * 弹出的时候如果类型不为新增，则异步请求数据
             * */


        }
    }

    mounted = true

    componentWillUnmount() {
        this.mounted = null
    }

    componentWillReceiveProps() {
        this.setState({
            data: this.props.data
        })
    }

    getConName(contractname) {
        request("/con/output/getUserByNumber", {params: {usernumber: contractname}})
        .then(res => {
            console.log(res.data.user);
            this.setState({
                conName: setSelectFormat(res.data.user)
            })
        })
    }

    render() {
        const props = this.props;
        const {form} = props;
        const {data, conName} = this.state;
        console.log(conName);
        return (
        <Modal
        maskClosable={false}
        destroyOnClose={true}
        onCancel={() => props.toggleModalVisible(false)}
        width={980}
        visible={props.visible}
        footer={
            <Row>
                <Col span={12}></Col>
                <Col span={12}>
                    <Button onClick={() => props.toggleModalVisible(false)}>取消</Button>
                    <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                </Col>
            </Row>
        }
        title='请Ta来写形象进度'>
            {
                data.contract && <div className="editContent">
                    <Row>
                        <Col span={12}>
                            <span className="span">合同名称：</span>
                            <span className="item-text">{data.contract.contract_name}</span>
                        </Col>
                        <Col span={12}>
                            <span className="span">合同编号：</span>
                            <span className="item-text">{data.contract.number}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <span className="span">甲方：</span>
                            <span className="item-text">{data.companyA}</span>
                        </Col>
                        <Col span={12}>
                            <span className="span">乙方：</span>
                            <span className="item-text">{data.companyA}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <span className="span">合同金额：</span>
                            <span className="item-text-red">{fMoney(data.contract.new_amount)}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <span className="span">产值类型：</span>
                            <span className="item-text">{data.model.outputtype}</span>
                        </Col>
                        <Col span={12}>
                            <span className="span">发票类型：</span>
                            {/*{data.model.invoicetype}*/}
                            <span className="item-text">{data.model.invoicetype}</span>
                        </Col>
                    </Row>
                </div>
            }
            <Divider/>
            <div className="editByOther">
                <Form>
                    <Row gutter={24}>
                        {getFields(form, [{
                            label: '请Ta来写：',
                            fieldName: 'type',
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
                                    console.log(e);
                                }
                            },
                            selectOptions: {
                                style: {width: "200px"}
                            }
                        }])
                        }
                    </Row>
                </Form>
            </div>
        </Modal>
        )
    }
}

export default Form.create()(PopModal)