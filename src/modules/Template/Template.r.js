/**
 *
 * Created by fanzhe on 2018/7/9
 */

import React from "react";
import {Button, Table} from "antd";
import TemModal from "./PopModal";
import request from "../../utils/request";
import './styles.less'

const columns = [{
    title: "审批模板"
}, {
    title: "对应项目"
}, {
    title: "单据类型"
}, {
    title: "权限类型"
}, {
    title: "生效时间"
}, {
    title: "操作"
}]

export default class Template extends React.Component {

    state = {
        data: [],
        visible: false,
        modalConfig: {}
    };

    toggleModalVisible = visible => {
        this.setState({
            visible
        })
    };

    detlete() {
        request("/adt/template/delete")
    }

    updateTem() {
        request("/adt/template/update")
    }

    save() {
        request("/adt/template/save")
    }

    render() {
        const {data, visible, modalConfig} = this.state;
        return (
        <div className="ISA-content" style={{marginTop:"100px"}}>
            <h2>审批模板</h2>
            <div>
                <Button type="primary" onClick={() => this.toggleModalVisible(true)}>新建审批模板</Button>
                <Button className="ml10">删除</Button>
            </div>
            <Table className="mt35" columns={columns}/>
            <TemModal
            visible={visible}
            data={data}
            modalConfig={modalConfig}
            toggleModalVisible={this.toggleModalVisible}
            />
        </div>
        )
    }
}