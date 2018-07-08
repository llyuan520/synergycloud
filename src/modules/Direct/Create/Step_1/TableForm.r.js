// Created by liuliyuan on 2018/7/5
import React, { PureComponent } from 'react';
import { Row,Col,Table, Input, Button, message, Popconfirm, Divider,Checkbox,Upload,Icon } from 'antd';

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

    newMember = () => {
        const newData = this.state.data.map(item => ({...item}));
        newData.push({
            seq:  `new_${this.index}`,
            item: '',
            is_hide:'0',
            hide_des:'',
            is_rework:'0',
            rework_des:'',
            editable: true,
            isNew: true,
        });
        this.index += 1;
        this.setState({data: newData});
    };

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

        const propsFile = {
            name:'file',
            action:'/',
            //multiple:true,
            onRemove: () => {

            },
            beforeUpload: file => {
                //TODO:文件大小限制
                /*if(fileSize){
                 const isLtSize = file.size / 1024 / 1024 < fileSize;
                 if (!isLtSize) {
                 message.error(`文件大小不能超过${fileSize}mb`);
                 setFieldsValue(undefined)
                 }
                 }
                 */
                return false;
            },
        };

        const columns = [
            {
                title: '序号',
                dataIndex: 'seq',
                key: 'seq',
                //width: '200px',
            },
            {
                title: '变更项',
                dataIndex: 'item',
                key: 'item',
                //width: '200px',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                autoFocus
                                onChange={e => this.handleFieldChange(e, 'item', record.seq)}
                                onKeyPress={e => this.handleKeyPress(e, record.seq)}
                                placeholder="成员姓名"
                            />
                        );
                    }
                    return text;
                },
            },
            {
                title: '隐蔽工程',
                dataIndex: 'hide_des',
                key: 'hide_des',
               //width: '300px',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Row gutter={24}>
                                <Col span={4}>
                                    <Checkbox defaultChecked={record.is_hide==='1'} onChange={e => this.handleCheckBoxChange(e, 'is_hide', 'hide_des', record.seq)}/>
                                </Col>
                                {
                                    record.is_hide==='1' && <Col span={10}>
                                        <Input
                                            value={text}
                                            autoFocus
                                            onChange={e => this.handleFieldChange(e, 'hide_des', record.seq)}
                                            onKeyPress={e => this.handleKeyPress(e, record.seq)}
                                            placeholder="隐蔽工程描述"
                                        />
                                    </Col>
                                }
                                <Col span={10}>
                                    <Upload {...propsFile}>
                                        <Icon type="upload" />
                                    </Upload>
                                </Col>
                            </Row>
                        );
                    }
                    return (
                        <div>
                            <span>{record.is_hide==='1' ? '有，' : '无'}</span>
                            <span>{text}</span>
                        </div>
                    );
                },
            },
            {
                title: '返工',
                dataIndex: 'rework_des',
                key: 'rework_des',
                //width: '300px',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Row gutter={24}>
                                <Col span={4}>
                                    <Checkbox defaultChecked={record.is_rework==='1'} onChange={e => this.handleCheckBoxChange(e, 'is_rework', 'rework_des', record.seq)} />
                                </Col>
                                {
                                    record.is_rework==='1' && <Col span={10}>
                                        <Input
                                            value={text}
                                            autoFocus
                                            onChange={e => this.handleFieldChange(e, 'rework_des', record.seq)}
                                            onKeyPress={e => this.handleKeyPress(e, record.seq)}
                                            placeholder="隐蔽工程描述"
                                        />
                                    </Col>
                                }
                                <Col span={10}>
                                    <Upload {...propsFile}>
                                        <Icon type="upload" />
                                    </Upload>
                                </Col>
                            </Row>
                        );
                    }
                    return (
                        <div>
                            <span>{record.is_rework==='1' ? '有，' : '无'}</span>
                            <span>{text}</span>
                        </div>
                    );
                },
            },
            {
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
            },
        ];


        return (
            <React.Fragment>
                <Table
                    loading={this.state.loading}
                    rowKey={record => record.seq}
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
