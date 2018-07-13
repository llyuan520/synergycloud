/**
 *
 * Created by fanzhe on 2018/7/9
 */
import React from "react"
import {Button, Checkbox, Col, Modal, Popconfirm, Row, Select, Table} from "antd";
import {Form, message} from "antd/lib/index";
import {getFields, setSelectFormat} from "../../../utils"
import './styles.less'
import request from "../../../utils/request";


/*只可以单条编辑，通过传入this对象，state值与函数式组件view层进行双向绑定。
* */

const columns = (_this) => {
    let disable = (record) => _this.state.editingKey !== record.key;
    return [
        {title: "审批节点", key: "seq", dataIndex: "seq"},
        {
            title: "项目角色", key: "nodeName", dataIndex: "nodeName", render: (text, record) => {
                return (
                disable(record)
                ? <span>{text}</span>
                : <Select placeholder="项目经理" style={{width: 120}}></Select>
                )
            }
        },
        {title: "角色类型", key: "roleId", dataIndex: "roleId"},
        {
            title: "审批人员", key: "companyId", dataIndex: "companyId", render: (text, record) => {
                return (
                disable(record)
                ? <span>{text}</span>
                : <Select mode="multiple" placeholder="可选择多人" style={{width: 120}}></Select>
                )
            }
        },
        {
            title: "允许删除", key: "isDelete", dataIndex: "isDelete", align: "center", render: (text, record) => {
                const onChange = () => {
                    console.log(_this.state);
                }

                return <Checkbox onChange={onChange} defaultChecked={text} disabled={disable(record)}/>
            }
        },
        {
            title: "显示进度",
            key: "isVisibleSchedule",
            dataIndex: "isVisibleSchedule",
            align: "center",
            render: (text, record) => {
                const onChange = () => {
                    console.log(1);
                }
                return <Checkbox onChange={onChange} defaultChecked={text} disabled={disable(record)}/>
            }
        },
        {
            title: "修改数据", key: "modify", dataIndex: "modify", align: "center", render: (text, record) => {
                const onChange = (e) => {
                    // console.log(e.target.checked);
                }
                return <Checkbox onChange={onChange} defaultChecked={text} disabled={disable(record)}/>
            }
        },
        {
            title: "操作", render: (text, record) => {
                return (
                <span>
                {
                    disable(record)
                    ? <span>
                        <a onClick={() => {
                            _this.setState({editingKey: record.key})
                        }}>编辑</a>
                        <Popconfirm className="ml10" title="是否要删除此行？" onConfirm={() => _this.remove(record.seq)}>
                            <a style={{color: '#f5222d'}}>删除</a>
                         </Popconfirm>

                    </span>
                    : <span>
                        <a onClick={() => {
                            _this.save(record);
                            _this.setState({editingKey: ""})
                        }}>保存</a>
                        <a className="ml10" style={{color: '#f5222d'}} onClick={() => {
                            _this.setState({editingKey: ""})
                        }}>取消</a>
                    </span>
                }


            </span>
                )
            }
        },
    ]

}

class TemModal extends React.Component {

    state = {
        data: [{
            key: 1,
            seq: 1,
            nodeName: '项目经理',
            roleId: "本公司",
            companyId: '张三',
            isDelete: 1,
            modify: 1,
            isVisibleSchedule: 1,
        }],
        editingKey: '',
        billType: [],
        itemType: [],
        roleType: []
    };


    getBillTypeSelect() {
        request("/bill/type/findBillType")
        .then(res => {
            console.log(res);
            this.setState({
                billType: setSelectFormat(res.data, "biztypeId", "biztypeName")
            })
        });
        request("/biz/items/findItemsByCompanyId")
        .then(res => {
            console.log(res);
            this.setState({
                itemType: setSelectFormat(res.data, "itemsId", "itemsName")
            })
        })
        request("/biz/itemsroles/findRole")
        .then(res => {
            console.log(res);
            this.setState({
                roleType: setSelectFormat(res.data, "itemsId", "itemsName")
            })
        })
    }

    remove(seq) {
        const newData = this.state.data.filter(item => item.seq !== seq);
        this.setState({data: newData});
    }

    newMember = () => {
        const newData = this.state.data.map(item => ({...item}));
        newData.push({
            seq: `${newData.length + 1}`,
            nodeName: '项目经理',
            roleId: "本公司",
            companyId: '张三',
            isDelete: 1,
            isVisibleSchedule: 1,
        });
        this.index += 1;
        this.setState({data: newData});
    };

    handleSubmit = (e) => {
        e && e.preventDefault();
        // this.save();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.save();
            }
        });

    };

    save() {
        let params = this.props.form.getFieldsValue();
        params.costCalculation = params.costCalculation.format("YYYY-MM-DD");
        params.effectiveDate = params.effectiveDate.format("YYYY-MM-DD");
        console.log(params);
        request("/adt/template/save", {params})
        .then(res => {
            if (res.state === "ok") {
                this.props.toggleModalVisible(false);
            } else {
                message.error(res.message)
            }
        })
    }

    componentDidMount() {
        this.getBillTypeSelect();
    }


    render() {
        const {props} = this;
        const {disabled} = props;
        const {data, billType, itemType,roleType} = this.state;
        // console.log(props);
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
            {
                this.props.disabled
                ? <div>
                    <Row gutter={24}>
                        <Col span={8}>
                            <span className="model-title">模板名称:</span>
                            <span className="model-text">模板名称</span>
                        </Col>
                        <Col span={8}>
                            <span className="model-title">选择项目:</span>
                            <span className="model-text">模板名称</span>
                        </Col>
                        <Col span={8}>
                            <span className="model-title">分期名称:</span>
                            <span className="model-text">模板名称</span>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <span className="model-title">单据类型:</span>
                            <span className="model-text">模板名称</span>
                        </Col>
                        <Col span={8}>
                            <span className="model-title">生效日期:</span>
                            <span className="model-text">模板名称</span>
                        </Col>
                        <Col span={8}>
                            <span className="model-title">失效日期:</span>
                            <span className="model-text">模板名称</span>
                        </Col>
                    </Row>

                </div>
                : <div>
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
                                    fieldName: 'itemsId',
                                    type: 'select',
                                    span: 8,
                                    options: [{label: '全部', key: ''}].concat(itemType),
                                    fieldDecoratorOptions: {
                                        initialValue: "",
                                    },
                                },
                                {
                                    label: ' 分期名称',
                                    fieldName: 'stagesId',
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
                                    fieldName: 'biztypeId',
                                    type: 'select',
                                    span: 8,
                                    options: [{label: '全部', key: ''}].concat(billType),
                                    fieldDecoratorOptions: {
                                        initialValue: "",
                                        rules: [
                                            {
                                                required: true,
                                            }
                                        ]
                                    },
                                },
                                {
                                    label: ' 生效日期',
                                    fieldName: 'effectiveDate',
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

                </div>
            }

            <Row gutter={24}>
                <Col span={8}>
                    <Checkbox disabled={disabled}>允许子公司引用模板</Checkbox>
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