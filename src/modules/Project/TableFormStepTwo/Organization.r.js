// created by Lee in 2018/07/05
import React, { PureComponent, Fragment } from 'react';
import {getFields,request,getQueryString} from 'utils';
import { compose } from 'redux';
import {connect} from 'react-redux';
import { Form, Table, Button,  message, Popconfirm, Divider, Select, Row } from 'antd';

const Option = Select.Option;

class Organization extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value || [],
            prevData: props.data,
            loading: false,
            name_options: [],//角色名称选项
            type_options: [],//角色类型选项
            member_options: [],//角色成员选项
            stages_options: [],//分期项目选项
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
        //this.props.onChange(newData);
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
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);

        if (target && target !== '') {
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

                //如果是选择的项目角色，则要去查出角色类型
                if(fieldName === 'role_name'){
                        let url = '/biz/itemsorganzation/getRoleTypeAndPerson';
                    request(url, {
                        params:{
                            role_id: value.key
                        }
                    }).then((data) => {
                        console.log('=============================')
                        console.log(data);
                        console.log('=============================')
                        if(data.state === 'ok'){
                            target['role_type'] = data.data.role_type;

                            let member_options = []
                            let role_name = data.data.person;
                            for(let i =0;i< role_name.length;i++){
                                member_options.push({
                                    label:role_name[i].name,
                                    key:role_name[i].id
                                })
                            }

                            this.setState({
                                member_options:member_options
                            })
                        }
                    })
                        .catch(err => {
                            console.log(err)
                            message.error(err.message)
                        })
                }
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
            //this.props.onChange(this.state.data);
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

    // itemSelectChange = ()=>{
    //
    // }

    componentWillMount(){
        let id = getQueryString('id')
        let url = '/biz/itemsorganzation/findEditData'
        request(url, {
            params:{
                company_id: this.props.company_id,
                items_id: id
            }
        }).then((data) => {
            if(data.state === 'ok'){
                let rolenameOptions = [];
                let stages_options = [];
                let role_name = data.data.role_name;
                let stages = data.data.stages;
                for(let i =0;i< role_name.length;i++){
                    rolenameOptions.push({
                        label:role_name[i].name,
                        key:role_name[i].id
                    })
                }
                for(let i =0;i< stages.length;i++){
                    stages_options.push({
                        label:stages[i].stages_name,
                        key:stages[i].id,
                        tax_type: stages[i].tax_type
                    })
                }
                this.setState({
                    name_options:rolenameOptions,
                    stages_options: stages_options
                })
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
                            <Select labelInValue
                                    // defaultValue = {
                                    //     this.state.name_options.length>0 ?
                                    //         {label:this.state.name_options[0].label,key:this.state.name_options[0].key} : ''}
                                    onChange= {(e) => this.handleSelectChange(e, 'role_name', record.key)}
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
                    return text;
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
                            <Select labelInValue mode="multiple" tokenSeparators={[',']} optionFilterProp="children"
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
        const { data } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form>
                    <Row>
                        {
                            this.state.stages_options.length > 0 ?
                            getFields(this.props.form, [
                                {
                                    label: '分期项目',
                                    fieldName: 'model.stages',
                                    type: 'select',
                                    span: 8,
                                    options:this.state.stages_options,
                                    componentProps: {
                                        labelInValue: true,
                                    },
                                    fieldDecoratorOptions:{
                                        initialValue: this.state.stages_options[0]
                                    },
                                },
                            ]) : ''
                        }
                    </Row>
                </Form>
                {getFieldDecorator('members', {
                    initialValue: data,
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

const enhance = compose(
    connect(state=>({
        company_id:state.user.getIn(['personal','company_id'])
    })),
    Form.create()
)
export default enhance(Organization);