/**
 *
 * Created by fanzhe on 2018/7/9
 */
import React from "react"
import {Button, Checkbox, Col, Modal, Popconfirm, Row, Table} from "antd";
import {Form} from "antd/lib/index";
import {getFields} from "../../../utils"
import '../styles.less'

const columns = (context) => [
    {title: "审批节点", key: "seq", dataIndex: "seq"},
    {title: "项目角色", key: "nodeName", dataIndex: "nodeName"},
    {title: "角色类型", key: "roleId", dataIndex: "roleId"},
    {title: "审批人员", key: "companyId", dataIndex: "companyId"},
    {
        title: "允许删除", key: "isDelete", dataIndex: "isDelete", align: "center", render: (e) => {
            const onChange = () => {
                console.log(1);
            }
            return <Checkbox onChange={onChange} checked={e}/>
        }
    },
    {
        title: "显示进度", key: "isVisibleSchedule", dataIndex: "isVisibleSchedule", align: "center", render: (e) => {
            const onChange = () => {
                console.log(1);
            }
            return <Checkbox onChange={onChange} checked={e}/>
        }
    },
    {
        title: "操作", render: (text, record) => {
            return (
            <span>
                    <a>编辑</a>
                     <Popconfirm className="ml10" title="是否要删除此行？" onConfirm={() => context.remove(record.seq)}>
                <a style={{color: '#f5222d'}}>删除</a>
            </Popconfirm>
                </span>
            )
        }
    },
]

class TemModal extends React.Component {

    state = {
        data: [{
            seq: 1,
            nodeName: 'Joe Black',
            roleId: 32,
            companyId: '123',
            isDelete: 1,
            isVisibleSchedule: 1,
        }]
    };

    remove(seq) {
        const newData = this.state.data.filter(item => item.seq !== seq);
        this.setState({data: newData});
    }

    newMember = () => {
        const newData = this.state.data.map(item => ({...item}));
        newData.push({
            seq: `${newData.length + 1}`,
            nodeName: 'Joe Black',
            roleId: 32,
            companyId: '123',
            isDelete: 1,
            isVisibleSchedule: 1,
        });
        this.index += 1;
        this.setState({data: newData});
    };


    render() {
        const {props} = this;
        const {data} = this.state;
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
        title='审批模板'>
            <Row gutter={24}>
                {
                    getFields(this.props.form, [
                        {
                            label: ' 模板名称',
                            fieldName: 'name',
                            type: 'input',
                            span: 8,
                            fieldDecoratorOptions: {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入模板名称'
                                    }
                                ]
                            },
                        },
                        {
                            label: ' 选择项目',
                            fieldName: 'costCalculation',
                            type: 'input',
                            span: 8,
                            fieldDecoratorOptions: {
                                initialValue: '',
                            },
                        },
                        {
                            label: ' 分期名称',
                            fieldName: 'costCalculation',
                            type: 'input',
                            span: 8,
                            fieldDecoratorOptions: {
                                initialValue: '',
                            },
                        }

                    ])
                }
            </Row>

            <Row gutter={24}>
                {
                    getFields(this.props.form, [
                        {
                            label: ' 单据类型',
                            fieldName: 'costCalculation',
                            type: 'input',
                            span: 8,
                            fieldDecoratorOptions: {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入模板名称'
                                    }
                                ]
                            },
                        },
                        {
                            label: ' 生效日期',
                            fieldName: 'costCalculation',
                            type: 'datePicker',
                            span: 8,
                            fieldDecoratorOptions: {
                                initialValue: '',
                            },
                        },
                        {
                            label: ' 失效日期',
                            fieldName: 'costCalculation',
                            type: 'datePicker',
                            span: 8,
                            fieldDecoratorOptions: {
                                initialValue: '',
                            },
                        }

                    ])
                }
            </Row>

            <Row gutter={24}>
                <Col span={8}>
                    <Checkbox>允许子公司引用模板</Checkbox>
                </Col>
            </Row>


            <Table columns={columns(this)} dataSource={data}
                   pagination={false}/>
            <Button
            style={{width: '100%', marginTop: 16, marginBottom: 8}}
            type="dashed"
            onClick={this.newMember}
            icon="plus"
            >
                新增审批节点
            </Button>
        </Modal>
        )
    }
}

export default Form.create()(TemModal)