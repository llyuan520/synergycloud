// created by Lee in 2018/07/05
import React, { PureComponent, Fragment } from 'react';
import { Table, Button,  message, Popconfirm, Divider, Select } from 'antd';
const Option = Select.Option;

export default class Organization extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value || [],
            loading: false,
            type_options: [{label:'111', key:'1'}],//角色类型选项
            name_options: [{label:'111', key:'1'}],//角色名称选项
            member_options: [{label:'二狗',key:'gg'},{label:'三蛋', key:'hh'}],//角色成员选项
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
            key: `NEW_ROLE_ID_${this.index}`,
            role_type: '',
            role_name: '',
            username: '',
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
        if (target) {
            target[fieldName] = e.target.value;
            this.setState({ data: newData });
        }
    }
    handleSelectChange(value,  fieldName, key) {
        console.log(value);
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);

        if (target && target !== '') {
            console.log(value instanceof Array)
            if(value instanceof Array === true){
                target[fieldName] = '';
                target[`${fieldName}_key`] = '';
                for(let i = 0;i< value.length;i++){
                    target[fieldName] += ',' + value[i].label;
                    target[`${fieldName}_key`] += ','+value[i].key;
                }
                target[fieldName] = target[fieldName].substr(1)
                target[`${fieldName}_key`] = target[`${fieldName}_key`].substr(1)
            }else{
                target[fieldName] = value.label;
                target[`${fieldName}_key`] = value.key;
            }

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
            if (!target.role_type || !target.role_name || !target.username) {
                message.error('请填写完整成员信息。');
                e.target.focus();
                this.setState({
                    loading: false,
                });
                return;
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
                title: '角色类型',
                dataIndex: 'role_type',
                key: 'role_type',
                width: '20%',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                        <Select labelInValue
                                onChange= {(e) => this.handleSelectChange(e, 'role_type', record.key)}
                                style={{width:'100%'}} >
                            {
                                this.state.type_options.map((option,i)=>(
                                    <Option key={i} value={option.key}>{option.label}</Option>
                                ))
                            }
                        </Select>
                        );
                    }
                    return text;
                },
            },
            {
                title: '角色名称',
                dataIndex: 'role_name',
                key: 'role_name',
                width: '30%',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Select labelInValue
                                    onChange= {(e) => this.handleSelectChange(e, 'role_name', record.key)}
                                    style={{width:'100%'}} >
                                {
                                    this.state.name_options.map((option,i)=>(
                                        <Option key={i} value={option.key}>{option.label}</Option>
                                    ))
                                }
                            </Select>
                        );
                    }
                    return text;
                },
            },
            {
                title: '角色成员',
                dataIndex: 'username',
                key: 'username',
                width: '30%',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Select labelInValue mode="multiple"
                                    onChange= {(e) => this.handleSelectChange(e, 'username', record.key)}
                                    style={{width:'100%'}} >
                                {
                                    this.state.member_options.map((option,i)=>(
                                        <Option key={i} value={option.key}>{option.label}</Option>
                                    ))
                                }
                            </Select>
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
                        if (record.isNew) {
                            return (
                                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
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
                <a>删除</a>
              </Popconfirm>
            </span>
                    );
                },
            },
        ];

        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {getFieldDecorator('members', {
                    //initialValue: tableData,
                })(
                    <Fragment>
                        <Table
                            loading={this.state.loading}
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
                            新增成员
                        </Button>
                    </Fragment>
                )}

            </div>
        );
    }
}
