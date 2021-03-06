/**
 *
 * Created by fanzhe on 2018/7/9
 */
import React from "react"
import {Button, Col, Modal, Row, Table} from "antd";
import {Form} from "antd/lib/index";
import {getFields} from "../../../utils"
const columns = [
    {title: "审批节点"},
    {title: "项目角色"},
    {title: "角色类型"},
    {title: "审批人员"},
    {title: "允许删除"},
    {title: "显示进度"},
    {title: "操作"},
]

class TemModal extends React.Component {
    render() {
        const {props} = this;
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
                            label: ' 模板名称',
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
                            label: ' 模板名称',
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
                        }

                    ])
                }
            </Row>

            <Table columns={columns}/>
            <Button
            style={{width: '100%', marginTop: 16, marginBottom: 8}}
            type="dashed"
            onClick={this.newMember}
            icon="plus"
            >
                新增
            </Button>
        </Modal>
        )
    }
}

export default Form.create()(TemModal)