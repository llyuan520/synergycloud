// Created by liuliyuan on 2018/6/30
import React, {PureComponent} from 'react';
import {Table} from 'antd';

const columns = [{
  title: '合同名称',
  dataIndex: 'name',
}, {
  title: '合同金额',
  dataIndex: 'age',
}, {
  title: '甲方乙方',
  dataIndex: 'address',
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}];

export default class TableForm extends PureComponent {
  render() {
    const rowSelection = {
      type: 'radio',
      onChange: this.onChange,
      onRowSelect: (selectedRowKeys, selectedRows) => {
        this.setState({
          id: selectedRowKeys[0],
          selectedNodes: selectedRows[0],
          onlyAdd: false,
        })
      },
      onSelect: (...e) => {
        this.props.next();
        console.log(e);
      },
      rowSelection: {
        type: 'radio',
      },
    };
    return (
    <React.Fragment>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
    </React.Fragment>
    );
  }
}
