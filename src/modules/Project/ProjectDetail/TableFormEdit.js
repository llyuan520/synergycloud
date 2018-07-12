// Created by Lee on 2018/7/11
import React, { PureComponent } from 'react';
import { Table, Button, message, Popconfirm, Divider,Select, Input } from 'antd';
const Option = Select.Option;
export default class TableForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
            options: props.taxOptions,
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
            label: '',
            tax_type:'',
            code:'',
            key: `new_${this.index}`,
            editable: true,
            isNew: true,
        });
        this.index += 1;
        this.setState({ options:this.props.taxOptions})
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

        if (target && target !== '') {
            target[fieldName] = e.target.value;
            this.setState({ data: newData });
        }
    }
    handleSelectChange(value,  fieldName, key) {
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);

        if (target && target !== '') {
            target[fieldName] = value.label;
            target[`${fieldName}_key`] = value.key;
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
            if (!target.code || !target.label || !target.tax_type_key) {
                message.error('请填写完整成员信息。');
                e.target.focus();
                this.setState({
                    loading: false,
                });
                return;
            }
            for(let i = 0;i< this.state.data.length;i++){
                if(target.code === this.state.data[i].code && target.key !== this.state.data[i].key){
                    message.error('分期编号已存在')
                    e.target.focus();
                    this.setState({
                        loading: false,
                    });
                    return;
                }
            }
            delete target.isNew;
            this.toggleEditable(e, key);
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
        const columns = [
            {
                title:'分期编号',
                dataIndex: 'code',
                key:'code',
                width: '30%',
                render: (text,record)=>{
                    if(record.editable){
                        return (
                            <Input value={text}
                                    autoFocus="autofocus"
                                   placeholder="分期编号"
                                   onChange={e => this.handleFieldChange(e, 'code', record.key)}
                                   onKeyPress={e => this.handleKeyPress(e, record.key)}
                            />
                        )
                    }
                    return text;
                }
            },{
                title:'分期名称',
                dataIndex: 'label',
                key:'label',
                width: '30%',
                render: (text,record)=>{
                    if(record.editable){
                        return (
                            <Input value={text}
                                   autoFocus="autofocus"
                                   placeholder="分期名称"
                                   onChange={e => this.handleFieldChange(e, 'label', record.key)}
                                   onKeyPress={e => this.handleKeyPress(e, record.key)}
                            />
                        )
                    }
                    return text;
                }
            },{
                title:'计税方式',
                dataIndex: 'tax_type',
                key:'tax_type',
                width: '20%',
                render: (text,record)=>{
                    if(record.editable){
                        return (
                            <Select value={{key:text}} labelInValue onChange= {(e) => this.handleSelectChange(e, 'tax_type', record.key)} style={{width:'100%'}} >
                                {
                                    this.state.options.map((option,i)=>(
                                        <Option key={i} value={option.key}>{option.label}</Option>
                                    ))
                                }
                            </Select>
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
                                  <a onClick={e => this.saveRow(e, record.key)}>保存</a>
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
