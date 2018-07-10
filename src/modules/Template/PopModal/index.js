/**
 *
 * Created by fanzhe on 2018/7/9
 */
import React from "react"
import {Button, Checkbox, Col, Modal, Row, Table} from "antd";
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

    state = {
        data: []
    }
    newMember = () => {
        const newData = this.state.data.map(item => ({...item}));
        newData.push({
            key: `${newData.length + 1}`,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
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
                <Col span={8}>
                    <Checkbox>允许子公司引用模板</Checkbox>
                </Col>
            </Row>


            <Table columns={columns} dataSource={data}
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