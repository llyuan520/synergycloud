import {Table, Input, Icon, Button, Popconfirm} from 'antd';
import React from "react";
import './style.less';
import _ from 'lodash'

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
          {value || ' '}
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

export default class TableForm extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [];
    _.map(props.columns, item => {
      if (item.editable && !props.disabled) {
        this.columns.push({
          title: item.title,
          dataIndex: 'name',
          render: (text, record) => (
          <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'name')}
          />
          ),
        })
      } else {
        this.columns.push({
          title: item.title,
          dataIndex: 'name',
        })
      }
    })

    this.state = {
      selectedRowKeys: [],
      dataSource: [{
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      }, {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      }],
      count: 2,
    };
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({dataSource});
      }
    };
  }

  onDelete(key) {
    key = key + '';
    let dataSource = [];
    _.map(this.state.dataSource, item => {
      item.key = key && dataSource.pop(item)
    });
    this.setState({dataSource});
  }

  handleAdd = () => {
    const {count, dataSource} = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  handleDelete = () => {
    const {selectedRowKeys} = this.state;
    selectedRowKeys.sort().reverse().map(item => {
      console.log(item);
      this.onDelete(item)
    })
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});
  }

  render() {
    const {props} = this;
    const columns = this.columns;
    const {selectedRowKeys, dataSource} = this.state;
    const rowSelection = !props.disabled && {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
    <div className="m10">
      <div>
        <Button disabled={props.disabled} onClick={this.handleAdd} type="primary" style={{marginBottom: 16}}>
          {props.button}
        </Button>
        <Button disabled={!hasSelected || props.disabled} onClick={this.handleDelete}
                style={{marginBottom: 16, marginLeft: 10}}>
          删除
        </Button>
        <span style={{marginLeft: 8}} className="red">
            {hasSelected ? `选择了 ${selectedRowKeys.length} 列` : ''}
          </span>
        {
          props.headerText && <span className="r headerText">{props.headerText}</span>
        }
      </div>
      <Table dataSource={dataSource} pagination={false} columns={columns} rowSelection={rowSelection}/>
    </div>
    );
  }
}