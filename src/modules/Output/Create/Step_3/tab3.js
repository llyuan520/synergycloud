/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React from 'react'
import {Divider, Form} from 'antd';
import {fMoney} from "../../../../utils";
import {Table, Input, Icon, Button} from 'antd';
import './style.less';
import _ from 'lodash'

const columnsDetails = [{
    title: '大类名称',
    dataIndex: 'ticket_name',
    key: 'ticket_name',
    editable: true,
}, {
    title: '商品名称',
    dataIndex: 'countrygoodsname',
    key: 'countrygoodsname',
    editable: true,
}, {
    title: '数量/单位',
    editable: true,
    key: "amounts",
    dataIndex: "amounts"
}, {
    title: '单价',
    key: "price",
    dataIndex: "price",
    type: "price",
    editable: true,
}, {
    title: '税率',
    key: "rate",
    dataIndex: "rate",
    editable: true,
}, {
    title: '不含税金额',
    key: "notax_amounts",
    dataIndex: "notax_amounts",
    editable: true,
    type: "price",
}, {
    title: '含税金额',
    key: "tax_amounts",
    dataIndex: "tax_amounts",
    editable: true,
    type: "price",
},];

const columnsList = [{
    title: '发票代码',
    key: "invoice_code",
    dataIndex: "invoice_code",
    editable: true,
}, {
    title: '发票号码',
    key: "invoice_number",
    dataIndex: "invoice_number",
    editable: true,
}, {
    title: '开票日期',
    key: "make_invoicedate",
    dataIndex: "make_invoicedate",
    editable: true,
}, {
    title: '税率',
    key: "rate",
    dataIndex: "rate",
    editable: true,
}, {
    title: '不含税金额',
    key: "notax_amounts",
    dataIndex: "notax_amounts",
    editable: true,
    type: "price",
}, {
    title: '税额',
    key: "tax",
    dataIndex: "tax",
    editable: true,
    type: "price",
}, {
    title: '含税金额',
    key: "tax_amounts",
    dataIndex: "tax_amounts",
    editable: true,
    type: "price",
}, {
    title: '发票状态',
}];


class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({value});
    }

    check = () => {
        this.setState({editable: false});
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    edit = () => {
        this.setState({editable: true});
    }

    render() {
        const {value, editable} = this.state;
        return (
        <div className="editable-cell">
            {
                editable ? (
                <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
                suffix={(
                <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
                />
                )}
                />
                ) : (
                <div style={{paddingRight: 24}}>
                    {this.props.type === 'price' && fMoney(value) || value}
                    <Icon
                    type="edit"
                    className="editable-cell-icon"
                    onClick={this.edit}
                    />
                </div>
                )
            }
        </div>
        );
    }
}


class TabPane3 extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [];
        this.columnsList = [];
        this.state = {
            selectedRowKeys: [],
            selectedRowKeysList: [],
            dataSource: [],
            dataList: [],
        };
        _.map(columnsDetails, item => {
            if (item.editable && !props.disabled) {
                this.columns.push({
                    title: item.title,
                    key: item.key,
                    dataIndex: item.dataIndex,
                    render: (text, record) => (
                    <EditableCell
                    type={item.type}
                    value={item.type === "price" ? fMoney(text) : text}
                    onChange={this.onCellChange(record, item.dataIndex)}
                    />
                    ),
                })
            }
        });
        _.map(columnsList, item => {
            if (item.editable && !props.disabled) {
                this.columnsList.push({
                    title: item.title,
                    key: item.key,
                    dataIndex: item.dataIndex,
                    render: (text, record) => (
                    <EditableCell
                    value={item.type === "price" ? fMoney(text) : text}
                    onChange={this.onCellChangeList(record, item.dataIndex)}
                    />
                    ),
                })
            }
        })
    }

    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            debugger
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({dataSource});
            }
        };
    };

    onCellChangeList = (key, dataIndex) => {
        return (value) => {
            const dataList = [...this.state.dataList];
            const target = dataList.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({dataList});
            }
        };
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== {}) {
            const {datas} = nextProps.data;
            this.setState({
                dataSource: datas,
            })
        }
    }

    onDelete(key) {
        key = key + '';
        let dataSource = [];
        _.map(this.state.dataSource, item => {
            item.key = key && dataSource.pop(item)
        });
        this.setState({dataSource});
        this.props.setOutput(dataSource)
    }

    onDeleteList(key) {
        key = key + '';
        let dataList = [];
        _.map(this.state.dataList, item => {
            item.key = key && dataList.pop(item)
        });
        this.setState({dataList});
        this.props.setInvoice(dataList)
    }

    handleAdd = () => {
        const dataSource = this.state.dataSource || [];
        const newData = {
            ticket_name: "大类名称",
            countrygoodsname: '商品名称',
            amounts: '数量/单位',
            price: '0',
            rate: '税率',
            notax_amounts: '0',
            tax_amounts: '0',
        };
        this.setState({
            dataSource: [...dataSource, newData],
        }, () => {
            this.props.setOutput(this.state.dataSource)
        });
    }

    handleAddList = () => {
        const {dataList} = this.state;
        const newData = {
            invoice_code: "发票代码",
            invoice_number: '发票号码',
            make_invoicedate: '开票日期',
            rate: '税率',
            notax_amounts: '0',
            tax: '0',
            tax_amounts: '0',
            invoice_status: '0',
        };
        this.setState({
            dataList: [...dataList, newData],
        }, () => {
            this.props.setInvoice(this.state.dataList)
        });
    }

    handleDelete = () => {
        const {selectedRowKeys} = this.state;
        selectedRowKeys.sort().reverse().forEach(item => {
            console.log(item);
            this.onDelete(item);
        })
    }
    handleDeleteList = () => {
        const {selectedRowKeysList} = this.state;
        selectedRowKeysList.sort().reverse().forEach(item => {
            console.log(item);
            this.onDeleteList(item);
        })
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    onSelectChangeList = (selectedRowKeysList) => {
        console.log('selectedRowKeys changed: ', selectedRowKeysList);
        this.setState({selectedRowKeysList});
    }


    render() {
        const {props} = this;
        const columns = this.columns;
        const columnsList = this.columnsList;
        const {selectedRowKeys, selectedRowKeysList, dataSource, dataList} = this.state;
        const rowSelection = !props.disabled && {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const rowSelectionList = !props.disabled && {
            selectedRowKeysList,
            onChange: this.onSelectChangeList,
        };
        const hasSelected = selectedRowKeys.length > 0;
        console.log(dataSource, dataList);
        return (
        <div>
            <div className="m10">
                <p className="tab-title">产值明细</p>
                <div>
                    <Button disabled={props.disabled} onClick={this.handleAdd} type="primary"
                            style={{marginBottom: 16}}>
                        添加明细信息
                    </Button>
                    <Button disabled={!hasSelected || props.disabled} onClick={this.handleDelete}
                            style={{marginBottom: 16, marginLeft: 10}}>
                        删除
                    </Button>
                    <span style={{marginLeft: 8}} className="red">
                        {hasSelected ? `选择了 ${selectedRowKeys.length} 列` : ''}
                     </span>
                </div>
                <Table rowKey={record => record.ticket_name} dataSource={dataSource || []} pagination={false}
                       columns={columns}
                       rowSelection={rowSelection}/>
                {
                    <span className="r footer-text">
                    <span>明细金额汇总:</span>
                    <span className="red">{fMoney(props.data && props.data.counts || "0")}</span>
                </span>
                }
            </div>
            <Divider/>
            <div className="m10">
                <p className="tab-title">发票列表</p>
                <div>
                    <Button disabled={props.disabled} onClick={this.handleAddList} type="primary"
                            style={{marginBottom: 16}}>
                        添加发票
                    </Button>
                    <Button disabled={!hasSelected || props.disabled} onClick={this.handleDeleteList}
                            style={{marginBottom: 16, marginLeft: 10}}>
                        删除
                    </Button>
                    <span style={{marginLeft: 8}} className="red">
                        {hasSelected ? `选择了 ${selectedRowKeys.length} 列` : ''}
                    </span>
                    <span className="r headerText">发票类型：增值税专票</span>
                </div>
                <Table rowKey={record => record.invoice_code} dataSource={dataList} pagination={false}
                       columns={columnsList}
                       rowSelection={rowSelectionList}/>
                {
                    <span className="r footer-text">
                    <span>发票金额汇总:</span>
                    <span className="red">{fMoney(props.data && props.data.counts || "0")}</span>
                </span>
                }
            </div>
        </div>
        );
    }

}

export default Form.create()(TabPane3)