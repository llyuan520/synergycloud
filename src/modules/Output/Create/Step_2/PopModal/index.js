/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React, {Component} from 'react';
import {Button, Modal, Form, Row, Col, Divider, message} from 'antd';
import './styles.less'
import {fMoney, getFields} from "../../../../../utils";
import request from "../../../../../utils/request";
import {withRouter} from "react-router-dom";


let User = [];

class PopModal extends Component {
    static defaultProps = {
        type: 'edit',
        visible: true,
    }
    state = {
        initData: {},
        userId: "",
        data: (this.props && this.props.data) || [],
        conName: [],
        invite_userid: []
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        if (this.state.invite_userid.length) {
            this.save();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    this.props.setData(values);
                    this.props.toggleModalVisible(false);
                }
            });
        } else {
            message.warning('请输入邀请人！');
        }

    }

    save() {
        const {invite_userid, data} = this.state;
        const params = {
            invite_userid,
            model: data
        };
        console.log(params);
        request("/con/output/saveOutputAndImage", {body: params, method: "POST"})
        .then(res => {
            console.log(res);
            this.props.history.push({
                pathname: '/web/output/create/present',
                search: this.props.location.search,
                state: {outputId: res.data.res}
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: this.props.data
        })
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

    getConName(contractname) {
        request("/con/output/getUserByNumber", {params: {usernumber: contractname}})
        .then(res => {
            this.setState({
                conName: res.data.user.map(item => {
                    return {
                        key: item.id,
                        label: item.name
                    }
                })
            })
        })
    }

    chooseUser(e) {
        User.push(e);
        this.setState({
            invite_userid: User
        });
    }

    render() {
        const props = this.props;
        const {form} = props;
        const {data, conName} = this.state;
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
                            componentProps: {
                                mode: "tags",
                                labelInValue: true,
                                showSearch: true,
                                tokenSeparators: [','],
                                onSearch: (e) => {
                                    this.getConName(e);
                                },
                                onSelect: (e) => {
                                    this.chooseUser(e)
                                }
                            },
                        }])
                        }
                    </Row>
                </Form>
            </div>
        </Modal>
        )
    }
}

export default Form.create()(withRouter(PopModal));