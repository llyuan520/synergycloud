/**
 *
 * @fanz
 */
import React from 'react'
import {Row, Card, Form, Table, Divider} from 'antd';
import {getFields} from 'utils'
import TableForm from "./TableForm.r";

const buttonDetails = ['添加明细信息', '删除'];
const buttonList = ['添加发票', '删除'];
const columnsDetails = [{
  title: '大类名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '商品名称',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '数量/单位',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '单价',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '税率',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '不含税金额',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '含税金额',
  dataIndex: 'address',
  key: 'address',
},];

const columnsList = [{
  title: '发票代码',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '发票号码',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '开票日期',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '税率',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '含税金额',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '发票状态',
  dataIndex: 'address',
  key: 'address',
}];

class TabPane3 extends React.Component {


  render() {
    return (
    <React.Fragment>
      <TableForm title="产值明细" button={buttonDetails} columns={columnsDetails}/>
      <Divider/>
      <TableForm title="发票列表" button={buttonList} columns={columnsList} headerText="发票类型：增值税专票"/>
    </React.Fragment>
    )
  }
}

export default Form.create()(TabPane3)