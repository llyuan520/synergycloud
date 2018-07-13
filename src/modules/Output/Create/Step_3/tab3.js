/**
 *
 * Created by fanzhe on 2018/7/5
 * 前期开发过程中是把form表单写成了一个单独的组件，然后在该页面中有两个表单进行显示。
 * 由于数据过多，数据流较为复杂，所以就将这部分进行拆分组件层次，减少了一层组件套用。
 * 导致的问题是，该js文件中有大量代码冗余。很多地方可以进行对状态判断而封装不同功能的函数，
 * 目前赶进度，后期需要将该js进行重构。
 * 要注意的一点：要将所有的tab组件数据改变成从路由获取参数，自get接口数据。父组件传回调传值回流。
 */
import React from 'react'
import {DatePicker, Divider, Form} from 'antd';
import {fMoney, getRouter, strToObjRouter} from "../../../../utils";
import {Table, Input, Icon, Button} from 'antd';
import './style.less';
import moment from 'moment';
import _ from 'lodash'
import request from "../../../../utils/request";
import {withRouter} from "react-router-dom";

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
    // editable: true,
    type: "date"
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
        this.setState({editable: false}, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });

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
                    {(this.props.type === 'price' && fMoney(value)) || value}
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
            dataSourceCount: 0,
            dataList: [],
            dataListCount: 0,
            count: 0,
            countList: 0
        };
        _.map(columnsDetails, (item) => {
            if (item.editable) {
                this.columns.push({
                    title: item.title,
                    dataIndex: item.dataIndex,
                    render: (text, record) => (
                    (props.disabled || strToObjRouter(this.props.location.search).is_submission === "0")
                    ? <span>{text}</span>
                    : <EditableCell
                    type={item.type}
                    value={item.type === "price" ? fMoney(text) : text}
                    onChange={this.onCellChange(record.key, item.dataIndex)}
                    />
                    ),
                })
            } else {
                this.columns.push({
                    title: item.title,
                    dataIndex: item.dataIndex,
                })
            }
        });
        _.map(columnsList, item => {
            if (item.editable) {
                this.columnsList.push({
                    title: item.title,
                    dataIndex: item.dataIndex,
                    render: (text, record) => (
                    props.disabled
                    ? <span>{text}</span>
                    : <EditableCell
                    type={item.type}
                    value={item.type === "price" ? fMoney(text) : text}
                    onChange={this.onCellChangeList(record.key, item.dataIndex)}
                    />
                    ),
                })
            } else if (item.type === "date") {
                this.columnsList.push({
                    title: item.title,
                    dataIndex: item.dataIndex,
                    render: (e) => {
                        const onChange = (e) => {
                            console.log(e && e.format('YYYY-MM-DD '));
                            e && this.props.setOutput(_.extend(this.state.dataList, {make_invoicedate: e.format('YYYY-MM-DD ')}))
                        };
                        return <DatePicker
                        onChange={onChange}
                        defaultValue={moment(e, 'YYYY-MM-DD')}
                        disabled={props.disabled}/>
                    }
                })
            } else {
                this.columnsList.push({
                    title: item.title,
                    dataIndex: item.dataIndex,
                })
            }
        })
    }


    // 自获取数据
    getList() {
        console.log(1);
        // is_submission字段判断是否为收货记录，0代表收货记录，1代表非收货记录。
        const _router = strToObjRouter(this.props.location.search);
        const API = _router.is_submission === "1" ? "/con/output/contractToOutput" : "/con/output/acceptLogsToOutput";
        console.log(API);
        request(API, {params: {contract_id: _router.id}})
        .then((res => {
            console.log(res);
            let data = res.data;
            data && data.datas.map((item, index) => {
                return item.key = index;
            });
            data.key = 1;
            console.log(data);
            this.setState({
                dataSource: data.datas,
                dataSourceCount: data.counts
            });
            this.props.setOutput && this.props.setOutput(data.datas, data.counts)
        }))
    }


    getOutputInvoice() {
        request("/con/output/getOutputInvoice", {
            params: {output_id: strToObjRouter(this.props.location.search).outputId}
        }).then(res => {
            console.log(res);
            let dataListCount = 0;
            _.map(res.data.datas, item => {
                dataListCount = dataListCount + item.tax_amounts
            });
            console.log(dataListCount);
            this.setState({
                dataList: res.data.datas,
                dataListCount
            })
            this.props.setInvoice && this.props.setInvoice(res.data.datas, dataListCount)
        })
    }

    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                let dataSourceCount = 0;
                dataSource.forEach(item => {
                    dataSourceCount = dataSourceCount + item.tax_amounts * 1
                });
                this.setState({dataSource, dataSourceCount});
                this.props.setOutput && this.props.setOutput(dataSource, dataSourceCount)
            }
        };
    };

    onCellChangeList = (key, dataIndex) => {
        return (value) => {
            const dataList = [...this.state.dataList];
            const target = dataList.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                let dataListCount = 0;
                dataList.forEach(item => {
                    dataListCount = dataListCount + item.tax_amounts * 1
                });
                this.setState({dataList, dataListCount});
                this.props.setInvoice(dataList, dataListCount)
            }
        };
    };

    componentDidMount() {
        this.getList();
        this.getOutputInvoice();
        if (this.props.setInvoice && this.props.setOutput) {
            const {dataList, dataListCount, dataSource, dataSourceCount} = this.state;
            this.props.setInvoice(dataList, dataListCount);
            this.props.setOutput(dataSource, dataSourceCount)
        }
    }

    onDelete(key) {
        key = key + '';
        let dataSource = [];
        _.map(this.state.dataSource, item => {
            item.key = key && dataSource.pop(item)
        });
        let dataSourceCount = 0;
        dataSource.forEach(item => {
            dataSourceCount = dataSourceCount + item.tax_amounts * 1
        });
        this.setState({dataSource, dataSourceCount});
        this.props.setOutput && this.props.setOutput(dataSource, dataSourceCount)
    }

    onDeleteList(key) {
        key = key + '';
        let dataList = [];
        _.map(this.state.dataList, item => {
            item.key = key && dataList.pop(item)
        });
        let dataListCount = 0;
        dataList.forEach(item => {
            dataListCount = dataListCount + item.tax_amounts * 1
        });
        this.setState({dataList, dataListCount});
        this.props.setInvoice && this.props.setInvoice(dataList, dataListCount)
    }

    handleAdd = () => {
        const {count} = this.state;
        const dataSource = this.state.dataSource || [];
        const newData = {
            ticket_name: "大类名称" + count,
            countrygoodsname: '商品名称',
            amounts: '数量/单位',
            price: '0',
            rate: '0.1',
            notax_amounts: '0',
            tax_amounts: '0',
        };
        let dataSourceCount = 0;
        dataSource.forEach(item => {
            dataSourceCount = dataSourceCount + item.tax_amounts * 1
        });
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
            dataSourceCount
        }, () => {
            console.log(this.state.dataSource);
            this.props.setOutput && this.props.setOutput(dataSource, dataSourceCount)
        });
    }

    handleAddList = () => {
        const {dataList, countList} = this.state;
        const newData = {
            invoice_code: "发票代码" + countList,
            invoice_number: '发票号码' + countList,
            make_invoicedate: '2018-07-10',
            rate: '0.1',
            notax_amounts: '0',
            tax: '0',
            tax_amounts: '0',
            invoice_status: '0',
        };
        let dataListCount = 0;
        dataList.forEach(item => {
            dataListCount = dataListCount + item.tax_amounts * 1
        });
        this.setState({
            dataList: [...dataList, newData],
            countList: countList + 1
        }, () => {
            this.props.setInvoice && this.props.setInvoice(dataList, countList)
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
            this.onDeleteList(item);
        })
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    }

    onSelectChangeList = (selectedRowKeysList) => {
        console.log(selectedRowKeysList);
        this.setState({selectedRowKeysList});
    }


    render() {
        const {props} = this;
        const columns = this.columns;
        const columnsList = this.columnsList;
        const {
            selectedRowKeys, selectedRowKeysList,
            dataSource, dataList, dataSourceCount, dataListCount
        } = this.state;
        const rowSelection =
        (props.disabled !== undefined || strToObjRouter(this.props.location.search).is_submission !== "0")
        && {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const rowSelectionList = !props.disabled && {
            selectedRowKeysList,
            onChange: this.onSelectChangeList,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const hasSelectedList = selectedRowKeysList.length > 0;
        console.log(dataSource, dataList);
        return (
        <div>
            <div className="m10">
                <p className="tab-title">产值明细</p>
                <div>
                    {
                        strToObjRouter(this.props.location.search).is_submission !== "0" &&
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
                    }
                </div>
                <Table rowKey={record => record.ticket_name} dataSource={dataSource} pagination={false}
                       columns={columns}
                       rowSelection={rowSelection}/>
                {
                    <span className="r footer-text">
                    <span>含税汇总:</span>
                    <span className="red">{fMoney((dataSourceCount) || "0")}</span>
                </span>
                }
            </div>
            <Divider/>
            {
                getRouter(this).is_synergy !== "1" &&
                <div className="m10">
                    <p className="tab-title">发票列表</p>
                    <div>
                        <Button disabled={props.disabled} onClick={this.handleAddList} type="primary"
                                style={{marginBottom: 16}}>
                            添加发票
                        </Button>
                        <Button disabled={!hasSelectedList || props.disabled} onClick={this.handleDeleteList}
                                style={{marginBottom: 16, marginLeft: 10}}>
                            删除
                        </Button>
                        <span style={{marginLeft: 8}} className="red">
                        {hasSelectedList ? `选择了 ${selectedRowKeysList.length} 列` : ''}
                    </span>
                        <span className="r headerText">发票类型：增值税专票</span>
                    </div>
                    <Table rowKey={record => record.invoice_code} dataSource={dataList} pagination={false}
                           columns={columnsList}
                           rowSelection={rowSelectionList}/>
                    {
                        <span className="r footer-text">
                    <span>含税汇总:</span>
                    <span className="red">{fMoney((dataListCount) || "0")}</span>
                </span>
                    }
                </div>
            }
        </div>
        );
    }

}

export default Form.create()(withRouter(TabPane3))