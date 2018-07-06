/**
 *
 * Created by fanzhe on 2018/7/5
 */
import {Table, Input, InputNumber, Popconfirm, Form, Button} from 'antd';
import React from "react";
import PopModal from './PopModal'
import './styles.less'

const data = [];
for (let i = 0; i < 2; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
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

export default class TableForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: '',
      data: props.value || data,
      loading: false,
      visible: false,
      modalConfig: {
        type: ''
      },
      count: 2
    };
    console.log(props.disabled);
    this.columns = [
      {
        title: '序号',
      },
      {
        title: '栋号',
        editable: true,
      },
      {
        title: '本期形象进度',
        editable: true,
      },
      {
        title: '累计形象进度',
        editable: true,
      },
      {
        title: '附件',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
          !props.disabled && <div>
            {editable ? (
            <span>
                  <EditableContext.Consumer>
                    {form => (
                    <a
                    href="javascript:;"
                    onClick={() => this.save(form, record.key)}
                    style={{marginRight: 8}}
                    >
                      保存
                    </a>
                    )}
                  </EditableContext.Consumer>
                    <a onClick={() => this.cancel(record.key)}>取消</a>
                </span>
            ) : (
            <span>
              <a onClick={() => this.edit(record.key)}>编辑</a>
               <Popconfirm
               title="确定要取消吗？"
               onConfirm={() => this.onDelete(record.key)}
               >
                <a className="ml10">删除</a>
                 </Popconfirm>
            </span>
            )}
          </div>
          );
        },
      },
    ];
  }


  onDelete = (key) => {
    console.log(key);
    const dataSource = [...this.state.data];
    this.setState({data: dataSource.filter(item => item.key !== key)});
  }

  handleAdd = () => {
    const {count, data} = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      data: [...data, newData],
      count: count + 1,
    });
  }

  showModal = type => {
    this.toggleModalVisible(true)
    this.setState({
      modalConfig: {
        type,
        id: this.state.selectedRowKeys
      }
    })
  };

  toggleModalVisible = visible => {
    this.setState({
      visible
    })
  };

  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({editingKey: key});
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({data: newData, editingKey: ''});
      } else {
        newData.push(data);
        this.setState({data: newData, editingKey: ''});
      }
    });
  }

  cancel = () => {
    this.setState({editingKey: ''});
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    const {disabled} = this.props;
    const {visible, modalConfig, data} = this.state;
    return (
    <div>
      <div className="table-operations">
        <Button className="ml10" disabled={disabled} onClick={() => this.showModal('add')}>邀请填写</Button>
        <Button className="ml10" disabled={disabled} icon="plus" onClick={() => this.handleAdd()}>添加</Button>
      </div>
      <Table
      components={components}
      dataSource={data}
      columns={columns}
      rowClassName="editable-row"
      />
      <PopModal
      visible={visible}
      modalConfig={modalConfig}
      toggleModalVisible={this.toggleModalVisible}
      setData={this.props.setData}
      />
    </div>
    );
  }
}
