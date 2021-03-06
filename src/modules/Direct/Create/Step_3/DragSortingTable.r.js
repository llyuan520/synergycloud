// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import { Table,Popconfirm, Button,Select,Input } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import './styles.less'


const Option = Select.Option;


function dragDirection(
    dragIndex,
    hoverIndex,
    initialClientOffset,
    clientOffset,
    sourceClientOffset,
) {
    const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
    const hoverClientY = clientOffset.y - sourceClientOffset.y;
    if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
        return 'downward';
    }
    if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return 'upward';
    }
}

class BodyRow extends React.Component {
    render() {
        const {
            isOver,
            connectDragSource,
            connectDropTarget,
            moveRow,
            dragRow,
            clientOffset,
            sourceClientOffset,
            initialClientOffset,
            ...restProps
        } = this.props;
        const style = { ...restProps.style, cursor: 'move' };

        let className = restProps.className;
        if (isOver && initialClientOffset) {
            const direction = dragDirection(
                dragRow.index,
                restProps.index,
                initialClientOffset,
                clientOffset,
                sourceClientOffset
            );
            if (direction === 'downward') {
                className += ' drop-over-downward';
            }
            if (direction === 'upward') {
                className += ' drop-over-upward';
            }
        }

        return connectDragSource(
            connectDropTarget(
                <tr
                    {...restProps}
                    className={className}
                    style={style}
                />
            )
        );
    }
}

const rowSource = {
    beginDrag(props) {
        return {
            index: props.index,
        };
    },
};

const rowTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Time to actually perform the action
        props.moveRow(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    sourceClientOffset: monitor.getSourceClientOffset(),
}))(
    DragSource('row', rowSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        dragRow: monitor.getItem(),
        clientOffset: monitor.getClientOffset(),
        initialClientOffset: monitor.getInitialClientOffset(),
    }))(BodyRow)
);

const columns = (context,getFieldDecorator) => [{
    title: '序号',
    dataIndex: 'seq',
    key: 'seq',
    width:60,
}, {
    title: '审批节点名称',
    dataIndex: 'nodeName',
    key: 'nodeName',
    width:200,
    render: (text, record) => {
        if (record.editable) {
            return (
                <Input
                    value={text}
                    autoFocus
                    onChange={e => context.handleNodeNameChange(e, 'nodeName', record.seq)}
                    //onKeyPress={e => context.handleKeyPress(e, record.seq)}
                    placeholder="但责单位描述"
                />
            )
        }
        return text;
    }
}, {
    title: '项目角色',
    dataIndex: 'roleName',
    key: 'roleName',
    width:200,
    render: (text, record) => {
        if (record.editable) {
            return (
                <Select
                    placeholder="请选择项目角色"
                    defaultValue="0"
                    style={{ width: '100%' }}
                    //onChange={e => this.handleRoleNameChange(e, 'roleName', record.seq)}
                >
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                </Select>
            );
        }
        return text;
    }
}, {
    title: '审批人',
    dataIndex: 'userId',
    key: 'userId',
    width:300,
    render: (text, record) => {
        if (record.editable) {
            return (
                <Select
                    mode="tags"
                    style={{width: '100%'}}
                    placeholder="请输入审批人"
                    //onChange={e => this.handleUserIdChange(e, 'roleName', record.seq)}
                >
                </Select>
            )
        }
        return text;
    }
}, {
    title: '操作',
    key: 'action',
    width:60,
    render: (text, record) => {
        return (
            <Popconfirm title="是否要删除此行？" onConfirm={() => context.remove(record.seq)}>
                <a style={{ color: '#f5222d' }}>删除</a>
            </Popconfirm>
        )
    }
}];

class DragSortingTable extends Component {

    constructor(props){
        super(props)
        this.state = {
            updateKey:Date.now(),
            data:props.dataSource,
        }
    }

    components = {
        body: {
            row: DragableBodyRow,
        },
    }

    componentWillReceiveProps(nextProps) {
        if ('dataSource' in nextProps) {
            this.setState({
                data: nextProps.dataSource,
            });
        }
    }

    getRowByKey(seq, newData) {
        return (newData || this.state.data).filter(item => item.seq === seq)[0];
    }

    handleNodeNameChange(e, fieldName, seq) {
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(seq, newData);
        if (target) {
            target[fieldName] = e.target.value;
            this.setState({data: newData});
        }
    }
    remove(seq) {
        const newData = this.state.data.filter(item => item.seq !== seq);
        this.setState({data: newData});
    }

    moveRow = (dragIndex, hoverIndex) => {
        const { data } = this.state;
        const dragRow = data[dragIndex];

        this.setState(
            update(this.state, {
                data: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );
    }
    newMember = () => {
        const newData = this.state.data.map(item => ({ ...item }));
        newData.push({
            seq: `new_${newData.length+1}`,
            nodeName: '',
            roleName: '',
            userId: '',
            editable: true,
        });
        this.index += 1;
        this.setState({ data: newData });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <React.Fragment>
                <Table
                    rowKey={record => record.seq}
                    columns={columns(this,getFieldDecorator)}
                    dataSource={this.state.data}
                    pagination={false}
                    components={this.components}
                    onRow={(record, index) => ({
                        index,
                        moveRow: this.moveRow,
                    })}
                />
                <Button
                    style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                    type="dashed"
                    onClick={this.newMember}
                    icon="plus"
                >
                    新增审批节点
                </Button>
            </React.Fragment>



        )
    }
}
const DragSortTable = DragDropContext(HTML5Backend)(DragSortingTable);
export default DragSortTable