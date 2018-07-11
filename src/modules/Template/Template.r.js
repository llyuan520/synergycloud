/**
 *
 * Created by fanzhe on 2018/7/9
 */

import React from "react";
import {Button, Popconfirm, Table} from "antd";
import TemModal from "./PopModal";
import request from "../../utils/request";
import './styles.less'

const columns = (_this) => [{
    title: "审批模板",
    dataIndex: "name",
    key: "name",
    render: (text) => {
        return <span><a onClick={() => {
            _this.setState({
                visible: true,
                disabled: true
            })
        }}>{text}</a></span>
    }
}, {
    title: "对应项目"
}, {
    title: "单据类型"
}, {
    title: "权限类型"
}, {
    title: "生效时间"
}, {
    title: "操作",
    render: (text, record) => {
        return (
        <span>
            <span><a>编辑</a></span>
            <Popconfirm className="ml10" title="是否要删除此行？" onConfirm={() => _this.remove(record.seq)}>
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
        modalConfig: {},
        disabled: false
    };

    toggleModalVisible = visible => {
        this.setState({
            disabled: false,
            visible
        })
    };

    detlete() {
        request("/adt/template/delete")
    }

    updateTem() {
        request("/adt/template/update")
    }

    getList() {
        request("/adt/template/findAllByCompanyId")
        .then(res => {
            console.log(res);
            this.setState({
                data: res.data
            })
        })
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        const {data, visible, disabled} = this.state;
        return (
        <div className="ISA-content" style={{marginTop: "100px"}}>
            <h2>审批模板</h2>
            <div>
                <Button type="primary" onClick={() => this.toggleModalVisible(true)}>新建审批模板</Button>
                <Button className="ml10">删除</Button>
            </div>
            <Table className="mt35" columns={columns(this)} dataSource={data}/>
            <TemModal
            visible={visible}
            disabled={disabled}
            data={data}
            toggleModalVisible={this.toggleModalVisible}
            />
        </div>
        )
    }
}