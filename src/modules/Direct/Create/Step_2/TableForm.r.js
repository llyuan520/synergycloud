// Created by liuliyuan on 2018/7/5
import React, { PureComponent } from 'react';
import { Row,Col,Table, Input, message, Popconfirm, Divider,Checkbox,DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

export default class TableForms extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                data: nextProps.value,
            });
        }
    }

    getRowByKey(seq, newData) {
        return (newData || this.state.data).filter(item => item.seq === seq)[0];
    }

    index = 0;
    cacheOriginData = {};
    toggleEditable = (e, seq) => {
        e.preventDefault();
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(seq, newData);
        if (target) {
            // 进入编辑状态时保存原始数据
            if (!target.editable) {
                this.cacheOriginData[seq] = {...target};
            }
            target.editable = !target.editable;
            this.setState({data: newData});
        }
    };

    remove(seq) {
        const newData = this.state.data.filter(item => item.seq !== seq);
        this.setState({data: newData});
        this.props.onChange(newData);
    }

    handleKeyPress(e, seq) {
        if (e.id === 'Enter') {
            this.saveRow(e, seq);
        }
    }

    handleFieldChange(e, fieldName, seq) {
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(seq, newData);
        if (target) {
            target[fieldName] = e.target.value;
            this.setState({data: newData});
        }
    }

    handleCheckBoxChange(e, fieldName, fieldName2, seq) {
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(seq, newData);
        if (target) {
            target[fieldName] = e.target.checked ? '1' : '0';
            if(e.target.checked === false){
                target[fieldName2] = '';
            }
            this.setState({data: newData});
        }
    }

    saveRow(e, seq) {
        e.persist();
        this.setState({
            loading: true,
        });
        setTimeout(() => {
            if (this.clickedCancel) {
                this.clickedCancel = false;
                return;
            }
            const target = this.getRowByKey(seq) || {};
            if (!target.item) {
                message.error('请填写完整成员信息。');
                e.target.focus();
                this.setState({
                    loading: false,
                });
                return;
            }
            delete target.isNew;
            this.toggleEditable(e, seq);

            this.props.onChange(this.state.data);
            this.setState({
                loading: false,
            });
        }, 500);
    }

    cancel(e, seq) {
        this.clickedCancel = true;
        e.preventDefault();
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(seq, newData);
        if (this.cacheOriginData[seq]) {
            Object.assign(target, this.cacheOriginData[seq]);
            target.editable = false;
            delete this.cacheOriginData[seq];
        }
        this.setState({data: newData});
        this.clickedCancel = false;
    }

    render() {
        const dateFormat = 'YYYY/MM/DD';
        const action = {
                    title: '操作',
                        key: 'action',
                        //width: '100px',
                        render: (text, record) => {
                        if (!!record.editable && this.state.loading) {
                            return null;
                        }
                        if (record.editable) {
                            if (record.isNew) {
                                return (
                                    <span>
                                            <a onClick={e => this.saveRow(e, record.seq)}>添加</a>
                                            <Divider type="vertical" />
                                            <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.seq)}>
                                                <a>删除</a>
                                            </Popconfirm>
                                        </span>
                                );
                            }
                            return (
                                <span>
                                        <a onClick={e => this.saveRow(e, record.seq)}>保存</a>
                                        <Divider type="vertical"/>
                                        <a onClick={e => this.cancel(e, record.seq)}>取消</a>
                                    </span>
                            );
                        }
                        return (
                            <span>
                                      <a onClick={e => this.toggleEditable(e, record.seq)}>编辑</a>
                                      <Divider type="vertical"/>
                                      <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.seq)}>
                                          <a  style={{ color: '#f5222d' }}>删除</a>
                                      </Popconfirm>
                                </span>
                        );
                    },
                };

        const columns = [
            {
                title: '变更项',
                dataIndex: 'item',
                key: 'item',
                //width: '200px',
            },
            {
                title: '但责单位',
                dataIndex: 'accountability_reason',
                key: 'accountability_reason',
                //width: '300px',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Row gutter={24}>
                                <Col span={4}>
                                    <Checkbox defaultChecked={record.is_accountability==='1'} onChange={e => this.handleCheckBoxChange(e, 'is_accountability', 'accountability_reason', record.seq)}/>
                                </Col>
                                {
                                    record.is_accountability==='1' && <Col span={20}>
                                        <Input
                                            value={text}
                                            autoFocus
                                            onChange={e => this.handleFieldChange(e, 'accountability_reason', record.seq)}
                                            placeholder="但责单位描述"
                                        />
                                    </Col>
                                }
                            </Row>
                        );
                    }
                    return (
                        <div>
                            <span>{record.is_accountability==='1' ? '有，' : '无'}</span>
                            <span>{text}</span>
                        </div>
                    );
                }
            },
            {
                title: '预计时间',
                dataIndex: 'planDate',
                key: 'planDate',
                //width: '300px',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <RangePicker defaultValue={[moment(record.planDateStart, dateFormat), moment(record.planDateEnd, dateFormat)]} onChange={(date, dateString)=>this.handleRangePickerChange(date, dateString, 'planDate',record.seq)} />
                        );
                    }
                    return (
                        <span>
                            {`${record.planDateStart} ~ ${record.planDateEnd}`}
                        </span>
                    )
                },
            },
        ];

        return (
            <React.Fragment>
                <Table
                    loading={this.state.loading}
                    rowKey={record => record.seq}
                    columns={ this.props && this.props.display===true ? columns : columns.concat(action)  }
                    dataSource={this.state.data}
                    pagination={false}
                    rowClassName={record => {
                        return record.editable ? 'editable' : '';
                    }}
                />
            </React.Fragment>
        );
    }
}
