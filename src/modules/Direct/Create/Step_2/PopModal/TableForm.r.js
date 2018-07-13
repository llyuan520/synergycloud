// Created by liuliyuan on 2018/7/5
import React, { PureComponent } from 'react';
import { Row,Col,Table, Input, Checkbox,DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

export default class TableForms extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            //selectedRowKeys: props.selectedRowKeys || [],
            loading: false,
        };
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
            });
            //this.props.onChange(newData);
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
            });
            //this.props.onChange(newData);
        }
    }

    handleCheckBoxChange(e, fieldName, fieldName2, seq) {
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(seq, newData);
        if (target) {
            target[fieldName] = e.target.checked===true ? '1' : '0';
            if(e.target.checked === false){
                target[fieldName2] = '';
            }
            this.setState({
                data: newData
            });
            //this.props.onChange(newData);
        }
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
        this.props.setSelectedRowKeys && this.props.setSelectedRowKeys(selectedRowKeys)
    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const { getFieldDecorator } = this.props.form;
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
                dataIndex: 'is_accountability',
                key: 'is_accountability',
                //width: '300px',
                render: (text, record) => {
                    //console.log(record.seq)
                    return (
                        <Row gutter={24}>
                            <Col span={4}>
                                {
                                    getFieldDecorator(`data[${record.seq}].is_accountability`, {
                                        valuePropName: 'checked' ,
                                        initialValue: record.is_accountability==='1',
                                        rules: [
                                            {
                                                required: true,
                                                message: ''
                                            }
                                        ]
                                    })(
                                        <Checkbox
                                            onChange={e => this.handleCheckBoxChange(e, `is_accountability`, `accountability_reason`, record.seq)}
                                        />
                                    )
                                }

                            </Col>


                            {
                                record.is_accountability==='1' && <Col span={20}>
                                    {
                                        getFieldDecorator(`data[${record.seq}].accountability_reason`, {
                                            initialValue: record.accountability_reason,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入但责单位描述'
                                                }
                                            ]
                                        })(
                                            <Input
                                                onChange={e => this.handleFieldChange(e, `accountability_reason`, record.seq)}
                                                placeholder="但责单位描述"
                                            />
                                        )
                                    }
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
                        <span>
                            {
                                getFieldDecorator(`data[${record.seq}].planDate`, {
                                    initialValue: (record.planDateStart && [moment(record.planDateStart, 'YYYY-MM-DD'), moment(record.planDateEnd, 'YYYY-MM-DD')]) || [undefined,undefined],
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择预计时间'
                                        }
                                    ]
                                })(
                                    <RangePicker
                                        onChange={(date, dateString)=>this.handleRangePickerChange(date, dateString, `planDate`,record.seq)}
                                    />
                                )
                            }
                        </span>

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
