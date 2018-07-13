// created by Lee in 2018/07/05
import React, { Component, Fragment } from 'react';
import {request,setSelectFormat,getQueryString} from 'utils';
import { compose } from 'redux';
import {connect} from 'react-redux';
import { Form, Table, Button,  message, Popconfirm, Divider, Select } from 'antd';

const Option = Select.Option;

class Stages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data || [],
            loading: false,
            name_options: props.name_options,//角色名称选项
            type_options: props.type_options,//角色类型选项
            member_options: props.member_options,//角色成员选项
            stages_id: props.stages_id || '',//分期项目选项
            updateKey: Date.now(),
            editable: props.editable || false
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                data: nextProps.value,
                editable: nextProps.editable
            });
        }
    }
    getRowByKey(key, newData) {
        return (newData || this.state.data).filter(item => item.key === key)[0];
    }
    index = 0;
    cacheOriginData = {};
    clickEditHandler = (obj)=>{
        for(let i =0;i< obj.username.length;i++){
            for(let j = 0;j< obj.members_options.length;j++){
                if(obj.username[i] === obj.members_options[j].key){
                    obj.username[i] = obj.members_options[j].label
                }
            }
        }
    }

    clickSaveHandler = (obj)=>{
        for(let i =0;i< obj.username.length;i++){
            for(let j = 0;j< obj.members_options.length;j++){
                if(obj.username[i] === obj.members_options[j].label){
                    obj.username[i] = obj.members_options[j].key
                }
            }
        }
    }

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
            this.clickEditHandler(target)
            console.log(newData);
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
            username: [],
            stages_id: this.state.stages_id,
            editable: true,
            isNew: true,
        });
        this.index += 1;
        this.setState({ data: newData,name_options :this.props.name_options });
    };

    handleSelectChange(value, fieldName, key) {
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (target && target !== '') {
            target[fieldName] = value;
            this.setState({ data: newData });
        }
    }
    handleSelectChangeRole(value, fieldName, username, key) {
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (target && target !== '') {
            //如果是选择的项目角色，则要去查出角色类型
            target[fieldName] = value;
            target[username] = [];

            this.getRoleTypeAndPerson(value, (data) => {
                target['role_type'] = data.role_type[0] || '';
                target['role_type_key'] = data.role_type[1] || '';
                target['members_options'] = setSelectFormat(data.person,'id','name');
                this.setState({
                    member_options: setSelectFormat(data.person,'id','name'),
                })
            })
            this.setState({ data: newData });
            // this.refreshTable();
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
            if (!target.role_type || !target.role_name || target.username.length === 0) {
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
            this.clickSaveHandler(target)
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
        this.clickSaveHandler(target)
        this.setState({ data: newData });
        this.clickedCancel = false;
    }
    //根据项目角色去获取对应的角色类型和角色成员选项
    getRoleTypeAndPerson = (value,cb)=>{
        let id = getQueryString('id')
        request('/biz/itemsorganzation/getRoleTypeAndPerson', {
            params:{
                role_id: value,
                company_id: this.props.company_id,
                items_id: id,
            }
        }).then((data) => {
            if(data.state === 'ok'){
                cb && cb(data.data)
            }
        })
            .catch(err => {
                console.log(err)
                message.error(err.message)
            })
    }


    render() {
        const columns = [
            {
                title: '项目角色',
                dataIndex: 'role_name',
                key: 'role_name',
                width: '25%',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Select
                                defaultValue={ record.role_name || '' }
                                onChange= {(e) => this.handleSelectChangeRole(e, 'role_name','username', record.key)}
                                placeholder="请选择项目角色"
                                style={{width:'100%'}} >
                                {
                                    this.state.name_options.map((option,i)=>(
                                        <Option key={i} value={option.key}>{option.label}</Option>
                                    ))
                                }
                            </Select>
                        );
                    }
                    return (
                        this.state.name_options.map((item)=>{
                            return record.role_name === item.key ? item.label : ''
                        })
                    )
                },
            },
            {
                title: '角色类型',
                dataIndex: 'role_type',
                key: 'role_type',
                width: '25%',
            },
            {
                title: '角色成员',
                dataIndex: 'username',
                key: 'username',
                width: '30%',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Select
                                //labelInValue
                                defaultValue={ record.username || []}
                                value={text}
                                mode="multiple"
                                filterOption={(input, option) => option.props.children && option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange= {(e) => this.handleSelectChange(e, 'username', record.key)}
                                style={{width:'100%'}}
                            >
                                {
                                    this.state.member_options.map((option,i)=>(
                                        <Option key={i} value={option.key}>{option.label}</Option>
                                    ))
                                }
                            </Select>
                        );
                    }
                    return (
                        record.members_options && record.members_options.length > 0 ?
                        record.members_options.map((item,index)=>{
                            let showData = record.username.map(e=>{
                                return e === item.key ? `${item.label}，` : ''
                            })
                            return showData;
                        }) : text
                    );
                },
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    if (!!record.editable && this.state.loading) {
                        return null;
                    }
                    if (this.state.editable === false){
                        return null;
                    }
                    if (record.editable) {
                        if (record.isNew) {
                            return (
                                <span>
                                  <a onClick={e => this.saveRow(e, record.key)}>保存</a>
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
        return (
            <Fragment>
                <Table
                    key={this.state.updateKey}
                    loading={this.state.loading}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    rowClassName={record => {
                        return record.editable ? 'editable' : '';
                    }}
                />
                {
                    this.state.editable === false ? '' :
                        <Button
                            style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                            type="dashed"
                            onClick={this.newMember}
                            icon="plus"
                        >
                            新增成员
                        </Button>
                }

            </Fragment>
        );
    }
}

const enhance = compose(
    connect(state=>({
        company_id:state.user.getIn(['personal','company_id'])
    })),
    Form.create()
)
export default enhance(Form.create()(Stages));