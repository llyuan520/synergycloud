// Created by liuliyuan on 2018/7/5
import React, { PureComponent } from 'react';
import { Row,Col,Table, Input, Checkbox,DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export default class TableForms extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            selectedRowKeys: [],
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

    handleFieldChange(e, fieldName, seq) {
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(seq, newData);
        if (target) {
            target[fieldName] = e.target.value;
            this.setState({
                data: newData
            },()=>{
                this.props.onChange(this.state.data);
            });

        }
    }

    handleRangePickerChange(date, dateString, fieldName,seq){
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(seq, newData);
        if (target) {
            target[`${fieldName}Start`] = dateString[0];
            target[`${fieldName}End`] = dateString[1];
            this.setState({
                data: newData
            },()=>{
                this.props.onChange(this.state.data);
            });
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
            this.setState({
                data: newData
            },()=>{
                this.props.onChange(this.state.data);
            });
        }
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
        this.props.setSelectedRowKeys && this.props.setSelectedRowKeys(selectedRowKeys)
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
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
            },
            {
                title: '但责单位',
                dataIndex: 'accountability_reason',
                key: 'accountability_reason',
               //width: '300px',
                render: (text, record) => {
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
            },
            {
                title: '预计时间',
                dataIndex: 'planDate',
                key: 'planDate',
                //width: '300px',
                render: (text, record) => {
                    return (
                        <RangePicker onChange={(date, dateString)=>this.handleRangePickerChange(date, dateString, 'planDate',record.seq)} />
                    );
                },
            },
        ];

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            //fixed:true,
        };

        return (
            <React.Fragment>
                <Table
                    loading={loading}
                    rowKey={record => record.seq}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    rowSelection={rowSelection}
                />
            </React.Fragment>
        );
    }
}
