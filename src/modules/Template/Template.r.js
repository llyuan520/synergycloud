/**
 *
 * Created by fanzhe on 2018/7/9
 */

import React from "react";
import {Button, Popconfirm, Table, message} from "antd";
import TemModal from "./PopModal";
import request from "../../utils/request";
import './styles.less'

const columns = (_this) => [{
    title: "审批模板",
    dataIndex: "name",
    key: "name",
    render: (text, record) => {
        return <span><a onClick={() => {
            _this.queryItem(record)
            _this.setState({
                visible: true,
                disabled: true
            })
        }}>{text}</a></span>
    }
}, {
    title: "对应项目",
    dataIndex: "itemsName",
    key: "itemsName",
}, {
    title: "单据类型",
    dataIndex: "billName",
    key: "billName",
}, {
    title: "是否允许增加节点",
    align: "center",
    key: "isAddNode",
    dataIndex: "isAddNode",
    render:(e)=><span>{e*1===1?"是":"否"}</span>
}, {
    title: "生效时间",
    dataIndex: "effectiveDate",
    key: "effectiveDate",
}, {
    title: "操作",
    render: (text, record) => {
        return (
        <span>
            <span><a onClick={() => _this.edit(record)}>编辑</a></span>
            <Popconfirm className="ml10" title="是否要删除此行？" onConfirm={() => _this.remove(record)}>
                            <a style={{color: '#f5222d'}}>删除</a>
                         </Popconfirm>
        </span>
        )
    }
}]

export default class Template extends React.Component {

    state = {
        data: [],
        visible: false,
        selectedRowKeys: [],
        disabled: false,
        modalData: []
    };

    toggleModalVisible = visible => {
        this.setState({
            disabled: false,
            modalData: [],
            visible
        })
    };

    deleteItem(id) {
        const {data, selectedRowKeys} = this.state;
        let params = selectedRowKeys.map(item => {
            return data[item].id
        });
        console.log({idArray: (id && [id]) || params});
        request("/adt/template/batchDelete", {body: {idArray: (id && [id]) || params}, method: "POST"})
        .then(res => {
            console.log(res);
            if (res.state === "ok") {
                message.success("删除成功！");
                this.setState({
                    selectedRowKeys: ""
                });
                this.getList();
            } else {
                message.error(res.message);
            }
        })
    }

    remove(record) {
        this.deleteItem(record.id);
    }


    getList() {
        request("/adt/template/findByCompanyId")
        .then(res => {
            console.log(res);
            this.setState({
                data: res.data
            })
        })
    }

    edit(record) {
        this.setState({
            visible: true
        });
        this.queryItem(record)
    }

    queryItem(record) {
        request("/adt/template/findAllByTempId", {params: {templateId: record.id}})
        .then(res => {
            console.log(res);
            res.data.nodeList.forEach((item, index) => {
                item.key = index + 1
            });
            this.setState({
                modalData: res.data
            })
        });
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };

    componentDidMount() {
        this.getList();
    }

    render() {
        const {data, visible, disabled, selectedRowKeys, modalData} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
        <div className="ISA-content" style={{marginTop: "100px"}}>
            <h2>审批模板</h2>
            <div>
                <Button type="primary" onClick={() => this.toggleModalVisible(true)}>新建审批模板</Button>
                <Button className="ml10" disabled={!hasSelected} onClick={() => this.deleteItem()}>删除</Button>
                <span style={{marginLeft: 8}}>
                    {hasSelected ? `选择了 ${selectedRowKeys.length} 个` : ''}
                </span>
            </div>
            <Table className="mt35" rowSelection={rowSelection} columns={columns(this)} dataSource={data}/>
            <TemModal
            visible={visible}
            disabled={disabled}
            data={modalData}
            getList={() => this.getList()}
            toggleModalVisible={this.toggleModalVisible}
            />
        </div>
        )
    }
}