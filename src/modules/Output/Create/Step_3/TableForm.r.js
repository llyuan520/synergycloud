// Created by liuliyuan on 2018/6/30
import React, {PureComponent} from 'react';
import {Table, Button, Input, InputNumber, Popconfirm, Form} from 'antd';
import './style.less'
import _ from 'lodash'

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
<EditableContext.Provider value={form}>
  <tr {...props} />
</EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber/>;
    }
    return <Input/>;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
    <EditableContext.Consumer>
      {(form) => {
        const {getFieldDecorator} = form;
        return (
        <td {...restProps}>
          {editing ? (
          <FormItem style={{margin: 0}}>
            {getFieldDecorator(dataIndex, {
              rules: [{
                required: true,
                message: `Please Input ${title}!`,
              }],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </FormItem>
          ) : restProps.children}
        </td>
        );
      }}
    </EditableContext.Consumer>
    );
  }
}

export default class TableForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
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
      }]
    }
  }

  addLine() {
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

  deleteLine() {
    const {selectedRowKeys, dataSource} = this.state;
    const data = _.cloneDeep(dataSource);
    console.log(selectedRowKeys);
    selectedRowKeys.map(item => {
      data.splice(item, 1)
    });
    console.log(data, dataSource);
    this.setState({
      dataSource: data
    })
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});
  }

  render() {
    const {count, dataSource} = this.state;
    const {button, title, columns, headerText} = this.props;
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
    <div>
      <div className="tab-title">{title}</div>
      <div>
        <Button type="primary" style={{marginLeft: 8, marginBottom: 10}}
                onClick={() => this.addLine()}>{button[0]}</Button>
        <Button style={{marginLeft: 8, marginBottom: 10}} disabled={!hasSelected}
                onClick={() => this.deleteLine()}>{button[1]}</Button>
        <span style={{marginLeft: 8}}>
            {hasSelected ? `选择了 ${selectedRowKeys.length} 项` : ''}
          </span>
        {
          headerText && <span className="r headerText">{headerText}</span>
        }
      </div>
      <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} rowClassName="editable-row"
             pagination={false}/>
    </div>
    )
  }
}
