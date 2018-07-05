/**
 *
 * Created by fanzhe on 2018/7/5
 */
import React from 'react'
import {Row, Card, Form, Table, Divider} from 'antd';
import {getFields} from 'utils'
import TableForm from "./TableForm.r";

const columnsDetails = [{
  title: '大类名称',
  dataIndex: 'name',
  key: 'name',
  editable: true,
}, {
  title: '商品名称',
  dataIndex: 'age',
  key: 'age',
  editable: true,
}, {
  title: '数量/单位',
  editable: true,
}, {
  title: '单价',
  editable: true,
}, {
  title: '税率',
  editable: true,
}, {
  title: '不含税金额',
  editable: true,
}, {
  title: '含税金额',
  editable: true,
},];

const columnsList = [{
  title: '发票代码',
  editable: true,
}, {
  title: '发票号码',
  editable: true,
}, {
  title: '开票日期',
  editable: true,
}, {
  title: '税率',
  editable: true,
}, {
  title: '含税金额',
  editable: true,
}, {
  title: '发票状态',
}];

class TabPane3 extends React.Component {


  render() {
    return (
    <React.Fragment>
      <TableForm disabled={this.props.disabled} title="产值明细" button="添加明细信息" columns={columnsDetails}/>
      <Divider/>
      <TableForm  disabled={this.props.disabled} title="发票列表" button="添加发票" columns={columnsList} headerText="发票类型：增值税专票"/>
    </React.Fragment>
    )
  }
}

export default Form.create()(TabPane3)