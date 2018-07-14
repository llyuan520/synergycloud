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
import moment from "moment"


/*只可以单条编辑，通过传入this对象，state值与函数式组件view层进行双向绑定。
* */

const Option = Select.Option;
const columns = (_this) => {
    let disable = (record) => _this.state.editingKey !== record.key;
    let changeState = (key, value, text) => {
        let data = _this.state.data.map((item => ({...item})));
        data[key - 1][value] = text;
        _this.setState({data});
    };
    return [
        {title: "审批节点", key: "seq", dataIndex: "seq"},
        {
            title: "项目角色", key: "roleName", dataIndex: "roleName", render: (text, record) => {
                const handleChange = (value) => {
                    let data = _this.state.data.map((item => ({...item})));
                    data[record.key - 1]["roleType"] = _this.state.roleType.filter(item => item.roleId === value)[0].roleType;
                    data[record.key - 1]["roleId"] = _this.state.roleType.filter(item => item.roleId === value)[0].roleId;
                    data[record.key - 1]["roleName"] = _this.state.roleType.filter(item => item.roleId === value)[0].roleName;
                    data[record.key - 1]["userName"] = "";
                    _this.setState({data});
                    _this.getTypeByRole(value);
                };
                return (
                disable(record)
                ? <span>{text}</span>
                : <Select onChange={handleChange} defaultValue={record.roleName} style={{width: 120}}>
                    {
                        _this.state.roleType.map(item => {
                            return (
                            <Option value={item.roleId}>{item.roleName}</Option>
                            )
                        })
                    }
                </Select>
                )
            }
        },
        {title: "角色类型", key: "roleType", dataIndex: "roleType"},
        {
            title: "审批人员", key: "userId", dataIndex: "userId", render: (text, record) => {
                return (
                disable(record)
                ? <span>{record.userName}</span>
                : <Select placeholder="可选择多人"
                          value={record.userName}
                          onChange={(e) => {
                              let data = _this.state.data.map((item => ({...item})));
                              data[record.key - 1]["userId"] = e;
                              data[record.key - 1]["userName"] = _this.state.roleUser.filter(item => item.userId)[0].userName;

                              _this.setState({data});
                          }
                          }
                          style={{width: 200}}>
                    {
                        _this.state.roleUser.map(item => {
                            return (
                            <Option value={item.userId}>{item.userName}</Option>
                            )
                        })
                    }
                </Select>
                )
            }
        },
        {
            title: "允许删除", key: "isDelete", dataIndex: "isDelete", align: "center", render: (text, record, index) => {
                const onChange = (e) => {
                    changeState(record.key, "isDelete", e.target.checked ? 1 : 0)
                }

                return <Checkbox onChange={onChange} defaultChecked={text * 1} disabled={disable(record)}/>
            }
        },
        {
            title: "显示进度",
            key: "isVisibleSchedule",
            dataIndex: "isVisibleSchedule",
            align: "center",
            render: (text, record) => {
                return <Checkbox onChange={e => changeState(record.key, "isVisibleSchedule", e.target.checked ? 1 : 0)}
                                 defaultChecked={text * 1} disabled={disable(record)}/>
            }
        },
        {
            title: "修改数据", key: "isUpdateData", dataIndex: "isUpdateData", align: "center", render: (text, record) => {
                return <Checkbox
                onChange={e => changeState(record.key, "isUpdateData", e.target.checked ? 1 : 0)}
                defaultChecked={text * 1} disabled={disable(record)}/>
            }
        },
        {
            title: "操作", render: (text, record) => {
                return !_this.props.disabled && (
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
        data: [],
        //save的表单数据
        editingKey: '',
        billType: [],
        itemType: [],
        roleType: [],
        roleUser: []
    };


    getBillTypeSelect() {
        request("/bill/type/findBillType")
        .then(res => {
            this.setState({
                billType: setSelectFormat(res.data, "biztypeId", "biztypeName")
            })
        });
        request("/biz/items/findItemsByCompanyId")
        .then(res => {
            this.setState({
                itemType: setSelectFormat(res.data, "itemsId", "itemsName")
            })
        })
        request("/biz/itemsroles/findRole")
        .then(res => {
            this.setState({
                roleType: res.data,
            })
        })
    }

    getTypeByRole(roleId) {
        request("/biz/itemsroles/findRoleUsers", {params: {roleId}})
        .then(res => {
            this.setState({
                roleUser: res.data
            })
        }
        )
    }

    remove(seq) {
        const newData = this.state.data.filter(item => item.seq !== seq);
        this.setState({data: newData});
    }

    newMember = () => {
        const newData = this.state.data.map(item => ({...item}));
        newData.push({
            key: `${(newData.length + 1)}`,
            seq: `${(newData.length + 1) * 10}`,
            roleId: "",
            isDelete: 1,
            isVisibleSchedule: 1,
            isUpdateData: 1,
            roleType: "",
            isNode: 0
        });
        this.index += 1;
        this.setState({data: newData, roleUser: []});
    };

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.data ? this.save(this.props.data.id) : this.save();
            }
        });

    };

    save(id) {
        let params = this.props.form.getFieldsValue();
        params.costCalculation = params.costCalculation && params.costCalculation.format("YYYY-MM-DD");
        params.effectiveDate = params.effectiveDate && params.effectiveDate.format("YYYY-MM-DD");
        params.isAddNode = this.state.isNode ? 1 : 0;

        const API = id ? "/adt/template/update" : "/adt/template/save";
        if (id) {
            params.id = id;
            params.updateList = this.state.data;
        } else {
            params.createList = this.state.data;
        }
        request(API, {body: params, method: "POST"})
        .then(res => {
            if (res.state === "ok") {
                this.props.toggleModalVisible(false);
                this.props.getList();
            } else {
                message.error(res.message)
            }
        })
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.data.nodeList) {
            this.setState({
                data: nextProps.data.nodeList,
                editingKey: []
            })
        }
    }

    componentDidMount() {
        this.getBillTypeSelect();
    }


    render() {
        const {props} = this;
        const {disabled} = props;
        const {data, billType, itemType} = this.state;
        return (
        <Modal
        maskClosable={false}
        destroyOnClose={true}
        onCancel={() => props.toggleModalVisible(false)}
        width={980}
        visible={props.visible}
        footer={
            <Row>
                <Col span={12}/>
                <Col span={12}>
                    <Button onClick={() => props.toggleModalVisible(false)}>取消</Button>
                    <Button type="primary" disabled={props.disabled} onClick={this.handleSubmit}>确定</Button>
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
                            <span className="model-text">{props.data.name}</span>
                        </Col>
                        <Col span={8}>
                            <span className="model-title">选择项目:</span>
                            <span className="model-text">{props.data.itemsName}</span>
                        </Col>
                        <Col span={8}>
                            <span className="model-title">分期名称:</span>
                            <span className="model-text">{props.data.stagesName}</span>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <span className="model-title">单据类型:</span>
                            <span className="model-text">{props.data.billName}</span>
                        </Col>
                        <Col span={8}>
                            <span className="model-title">生效日期:</span>
                            <span className="model-text">{props.data.effectiveDate}</span>
                        </Col>
                        <Col span={8}>
                            <span className="model-title">失效日期:</span>
                            <span className="model-text">{props.data.invalidDate}</span>
                        </Col>
                    </Row>

                </div>
                : <Form>
                    <Row gutter={24}>
                        {
                            getFields(this.props.form, [
                                {
                                    label: ' 模板名称',
                                    fieldName: 'name',
                                    type: 'input',
                                    span: 8,
                                    fieldDecoratorOptions: {
                                        initialValue: props.data.name || '',
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
                                    options: itemType,
                                    fieldDecoratorOptions: {
                                        initialValue: props.data.itemsId || "",
                                    },
                                },
                                {
                                    label: ' 分期名称',
                                    fieldName: 'stagesId',
                                    type: 'input',
                                    span: 8,
                                    fieldDecoratorOptions: {
                                        initialValue: props.data.stagesId || '',
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
                                    options: billType,
                                    fieldDecoratorOptions: {
                                        initialValue: props.data.biztypeId || "",
                                        rules: [
                                            {
                                                required: true,
                                                message: "请选择单据类型"
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
                                    componentProps: {
                                        // defaultValue: moment(),
                                        disabledDate: (current) => {
                                            return current && current < moment().endOf('day');
                                        }
                                    }
                                },
                                {
                                    label: ' 失效日期',
                                    fieldName: 'invalidDate',
                                    type: 'datePicker',
                                    span: 8,
                                    fieldDecoratorOptions: {
                                        initialValue: '',
                                    },
                                    componentProps: {
                                        // defaultValue: moment(),
                                        disabledDate: (current) => {
                                            return current && current < moment().endOf('day');
                                        }
                                    }
                                }

                            ])
                        }
                    </Row>

                </Form>
            }

            <Row gutter={24}>
                <Col span={8}>
                    <Checkbox onChange={v => {
                        this.setState({isNode: v.target.checked})
                    }} defaultChecked={props.data.isAddNode}
                              disabled={disabled}>允许子公司增加流程节点</Checkbox>
                </Col>
            </Row>


            <Table columns={columns(this)} dataSource={data}
                   pagination={false}/>
            {
                !props.disabled &&
                <Button
                style={{width: '100%', marginTop: 16, marginBottom: 8}}
                type="dashed"
                onClick={() => this.newMember()}
                icon="plus"
                >
                    新增审批节点
                </Button>
            }
        </Modal>
        )
    }
}

export default Form.create()(TemModal)