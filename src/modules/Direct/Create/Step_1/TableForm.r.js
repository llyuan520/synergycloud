// Created by liuliyuan on 2018/7/5
import React, { PureComponent } from 'react';
import { Table, Input, Button, message, Popconfirm, Divider } from 'antd';

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

    getRowByKey(id, newData) {
        return (newData || this.state.data).filter(item => item.id === id)[0];
    }

    index = 0;
    cacheOriginData = {};
    toggleEditable = (e, id) => {
        e.preventDefault();
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(id, newData);
        if (target) {
            // 进入编辑状态时保存原始数据
            if (!target.editable) {
                this.cacheOriginData[id] = {...target};
            }
            target.editable = !target.editable;
            this.setState({data: newData});
        }
    };

    remove(id) {
        const newData = this.state.data.filter(item => item.id !== id);
        this.setState({data: newData});
        this.props.onChange(newData);
    }

    newMember = () => {
        const newData = this.state.data.map(item => ({...item}));
        newData.push({
            id:  `${this.index}`,
            item: '',
            editable: true,
        });
        this.index += 1;
        this.setState({data: newData});
    };

    handleKeyPress(e, id) {
        if (e.id === 'Enter') {
            this.saveRow(e, id);
        }
    }

    handleFieldChange(e, fieldName, id) {
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(id, newData);
        if (target) {
            target[fieldName] = e.target.value;
            this.setState({data: newData});
        }
    }

    saveRow(e, id) {
        e.persist();
        this.setState({
            loading: true,
        });
        setTimeout(() => {
            if (this.clickedCancel) {
                this.clickedCancel = false;
                return;
            }
            const target = this.getRowByKey(id) || {};
            if (!target.item) {
                message.error('请填写完整成员信息。');
                e.target.focus();
                this.setState({
                    loading: false,
                });
                return;
            }
            this.toggleEditable(e, id);
            this.props.onChange(this.state.data);
            this.setState({
                loading: false,
            });
        }, 500);
    }

    cancel(e, id) {
        this.clickedCancel = true;
        e.preventDefault();
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(id, newData);
        if (this.cacheOriginData[id]) {
            Object.assign(target, this.cacheOriginData[id]);
            target.editable = false;
            delete this.cacheOriginData[id];
        }
        this.setState({data: newData});
        this.clickedCancel = false;
    }

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                width: '20%',
            },
            {
                title: '变更项',
                dataIndex: 'item',
                key: 'item',
                width: '60%',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                autoFocus
                                onChange={e => this.handleFieldChange(e, 'item', record.id)}
                                onKeyPress={e => this.handleKeyPress(e, record.id)}
                                placeholder="成员姓名"
                            />
                        );
                    }
                    return text;
                },
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    if (!!record.editable && this.state.loading) {
                        return null;
                    }
                    if (record.editable) {
                        return (
                            <span>
                                <a onClick={e => this.saveRow(e, record.id)}>保存</a>
                                <Divider type="vertical"/>
                                <a onClick={e => this.cancel(e, record.id)}>取消</a>
                            </span>
                        );
                    }
                    return (
                        <span>
                              <a onClick={e => this.toggleEditable(e, record.id)}>编辑</a>
                              <Divider type="vertical"/>
                              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.id)}>
                                <a  style={{ color: '#f5222d' }}>删除</a>
                              </Popconfirm>
                        </span>
                    );
                },
            },
        ];


        return (
            <React.Fragment>
                <Table
                    loading={this.state.loading}
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    rowClassName={record => {
                        return record.editable ? 'editable' : '';
                    }}
                />
                <Button
                    style={{width: '100%', marginTop: 16, marginBottom: 8}}
                    type="dashed"
                    onClick={this.newMember}
                    icon="plus"
                >
                    新增
                </Button>
            </React.Fragment>
        );
    }
}
