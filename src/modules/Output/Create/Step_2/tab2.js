/**
 *
 * Created by fanzhe on 2018/7/5
 */
import {Table, Input, Popconfirm, Form, Button,} from 'antd';
import React from "react";
import PopModal from './PopModal'
import './styles.less'
import FormItems from "../../../../components/FormItems";

const {FileUpload} = FormItems;

const data = [];
const FormItem = Form.Item;
const EditableContext = React.createContext();
const {TextArea} = Input;

const EditableRow = ({form, index, ...props}) => (
<EditableContext.Provider value={form}>
    <tr {...props} />
</EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'file') {
            return <FileUpload/>;
        }
        return <TextArea autosize={{minRows: 2, maxRows: 6}}/>;
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
                                required: dataIndex !== "file" && true,
                                message: `请输入 ${title}!`,
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

export default class TabPane2 extends React.Component {
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
            count: 1
        };
        this.columns = [
            {
                title: '序号',
                key: "key",
                dataIndex: "key"
            },
            {
                title: '栋号',
                key: "build_number",
                dataIndex: "build_number",
                editable: true,
            },
            {
                title: '本期形象进度',
                key: "thisimage_progress",
                dataIndex: "thisimage_progress",
                editable: true,
            },
            {
                title: '累计形象进度',
                key: "totalimage_progress",
                dataIndex: "totalimage_progress",
                editable: true,
            },
            {
                title: '附件',
                dataIndex: "file",
                editable: true,
            },
            {
                title: '操作',
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
            build_number: `栋号${count}`,
            thisimage_progress: "请输入本期形象进度",
            totalimage_progress: "累计形象进度",
        };
        this.setState({
            data: [...data, newData],
            count: count + 1,
        }, () => {
            this.props.setData(this.state.data);
        });
    };

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
                this.setState({data: newData, editingKey: ''}, () => {
                    console.log(this.state.data);
                });
            }
            this.props.setData(newData);
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
                    inputType: col.dataIndex === 'file' ? 'file' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        const {disabled} = this.props;
        const {visible, modalConfig, data} = this.state;
        console.log(this.props.data);
        return (
        <div>
            <div className="table-operations">
                <Button className="ml10" type="primary" disabled={disabled}
                        onClick={() => this.showModal('add')}>邀请填写</Button>
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
            data={this.props.data}
            modalConfig={modalConfig}
            toggleModalVisible={this.toggleModalVisible}
            setData={this.props.setData}
            />
        </div>
        );
    }
}
