// Created by liuliyuan on 2018/6/30
import React, { PureComponent } from 'react';
import { Table, Button, message, Popconfirm, Divider } from 'antd';
import { InputCell, SelectCell  } from 'components/EditableCell'

export default class TableForm extends PureComponent {
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
    getRowByKey(key, newData) {
        return (newData || this.state.data).filter(item => item.key === key)[0];
    }

    index = 0;
    cacheOriginData = {};
    toggleEditable = (e, key) => {
        e.preventDefault();
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (target) {
            // 进入编辑状态时保存原始数据
            if (!target.editable) {
                this.cacheOriginData[key] = { ...target };
            }
            target.editable = !target.editable;
            this.setState({ data: newData });
        }
    };
    remove(key) {
        const newData = this.state.data.filter(item => item.key !== key);
        this.setState({ data: newData });
        this.props.onChange(newData);
    }
    newMember = () => {
        const newData = this.state.data.map(item => ({ ...item }));
        newData.push({
            periodization_code: `CODE_${this.index}`,
            periodization_name: '',
            tax_methods: '',
            key: newData.length+1,
            editable: true,
            isNew: true,
        });
        this.index += 1;
        this.setState({ data: newData });
    };
    handleKeyPress(e, key) {
        if (e.key === 'Enter') {
            this.saveRow(e, key);
        }
    }
    handleFieldChange(e, fieldName, key) {
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);

        console.log(newData);
        console.log(target);
        console.log('22222222222222222222222')
        
        console.log(e);
        console.log('=======================')
        console.log(target);
        console.log('-----------------------')
        if (target && target !== '') {
            target[fieldName] = e.target.value;
            this.setState({ data: newData });
        }
    }
    saveRow(e, key) {
        e.persist();
        this.setState({
            loading: true,
        });
        setTimeout(() => {
            if (this.clickedCancel) {
                this.clickedCancel = false;
                return;
            }
            const target = this.getRowByKey(key) || {};
            if (!target.workId || !target.name || !target.department || !target.annex) {
                message.error('请填写完整成员信息。');
                e.target.focus();
                this.setState({
                    loading: false,
                });
                return;
            }
            delete target.isNew;
            this.toggleEditable(e, key);
            console.log(this.state.data)
            debugger
            this.props.onChange(this.state.data);
            this.setState({
                loading: false,
            });
        }, 500);
    }
    cancel(e, key) {
        this.clickedCancel = true;
        e.preventDefault();
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (this.cacheOriginData[key]) {
            Object.assign(target, this.cacheOriginData[key]);
            target.editable = false;
            delete this.cacheOriginData[key];
        }
        this.setState({ data: newData });
        this.clickedCancel = false;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title:'分期编号',
                dataIndex: 'periodization_code',
                key:'periodization_code',
                width: '30%',
            },{
                title:'分期名称',
                dataIndex: 'periodization_name',
                key:'periodization_name', 
                width: '30%',
                render: (text,record)=>{
                    if(record.editable){
                        return (
                            <InputCell
                                fieldName={`list[${record.key}].periodization_name`}
                                initialValue={text}
                                componentProps={{
                                    autoFocus:"autofocus",
                                    placeholder:"分期名称",
                                    onChange:e => this.handleFieldChange(e, 'periodization_name', record.key),
                                    onKeyPress:e => this.handleKeyPress(e, record.key),
                                }}
                                getFieldDecorator={getFieldDecorator}
                            />
                        )
                    }
                    return text;
                }
            },{
                title:'计税方式',
                dataIndex: 'tax_methods',
                key:'tax_methods',
                width: '20%',
                render: (text,record)=>{
                    if(record.editable){
                        return (
                            <SelectCell 
                                fieldName={`list[${record.key}].tax_methods`}
                                getFieldDecorator={getFieldDecorator}
                                options= { [
                                        {
                                            label:'111',
                                            key: '1',
                                        },
                                        {
                                            label:'222',
                                            key: '2',
                                        },
                                        {
                                            label:'333',
                                            key: '3',
                                        }
                                    ] 
                                }
                            />
                        )
                    }
                    return text;
                }
            },{
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    if (!!record.editable && this.state.loading) {
                        return null;
                    }
                    if (record.editable) {
                        if (record.isNew) {
                            return (
                                <span>
                                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                                  <Divider type="vertical" />
                                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                                    <a style={{ color: '#f5222d' }}>删除</a>
                                  </Popconfirm>
                                </span>
                            );
                        }
                        return (
                            <span>
                                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                                <Divider type="vertical" />
                                <a onClick={e => this.cancel(e, record.key)}>取消</a>
                            </span>
                        );
                    }
                    return (
                        <span>
                              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
                              <Divider type="vertical" />
                              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                                <a style={{ color: '#f5222d' }}>删除</a>
                              </Popconfirm>
                        </span>
                    );
                },
            }
        ];

        return (
            <React.Fragment>
                <Table
                    loading={this.state.loading}
                    rowKey={record => record.key}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    rowClassName={record => {
                        return record.editable ? 'editable' : '';
                    }}
                />
                <Button
                    style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                    type="dashed"
                    onClick={this.newMember}
                    icon="plus"
                >
                    添加
                </Button>
            </React.Fragment>
        );
    }
}
