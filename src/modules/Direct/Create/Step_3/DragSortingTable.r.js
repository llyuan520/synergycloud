// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import { Table,Popconfirm, Button } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { SelectCell } from 'components/EditableCell'
import './styles.less'

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
    dataIndex: 'key',
    key: 'key',
    width:60,
}, {
    title: '审批节点名称',
    dataIndex: 'name',
    key: 'name',
    width:200,
}, {
    title: '项目角色',
    dataIndex: 'age',
    key: 'age',
    width:200,
    render: (text, record) => {
        return (
            <SelectCell
                fieldName={`list[${record.key}].age`}
                options={[
                    {
                        label:'否',
                        key:'0',
                    },{
                        label:'是',
                        key:'1',
                    }
                ]}
                getFieldDecorator={getFieldDecorator}
            />
        )
    }
}, {
    title: '审批人',
    dataIndex: 'address',
    key: 'address',
    width:300,
    render: (text, record) => {
        return (
            <SelectCell
                fieldName={`list[${record.key}].address`}
                options={[]}
                //initialValue={record.address.toString()}
                getFieldDecorator={getFieldDecorator}
                componentProps={{
                    mode:'tags',
                    //onChange:(value)=>context.handleConfirmChange(value,record)
                }}
            />
        )
    }
}, {
    title: '操作',
    key: 'action',
    width:60,
    render: (text, record) => {
        return (
            <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a style={{ color: '#f5222d' }}>删除</a>
            </Popconfirm>
        )
    }
}];

class DragSortingTable extends Component {

    state = {
        updateKey:Date.now(),
        data: [{
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
        }],
    }

    components = {
        body: {
            row: DragableBodyRow,
        },
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
            key: `${newData.length+1}`,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        });
        this.index += 1;
        this.setState({ data: newData });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <React.Fragment>
                <Table
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
                    添加
                </Button>
            </React.Fragment>



        )
    }
}
const DragSortTable = DragDropContext(HTML5Backend)(DragSortingTable);
export default DragSortTable