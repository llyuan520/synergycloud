// Created by liuliyuan on 2018/7/2
import * as React from 'react'
import { Table,Popconfirm, Button,Select,message } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { request,getQueryString,setSelectFormat } from  'utils'
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
    title: '项目角色',
    dataIndex: 'roleName',
    key: 'roleName',
    width:200,
    render: (text, record) => {
        if (record.isNew) {
            return (
                <Select
                    placeholder="请选择项目角色"
                    style={{width: '100%'}}
                    onChange={e => context.handleRoleNameChange(e, 'roleName','userId','users', record.seq)}
                >
                    {
                        context.state.roleNameOption && context.state.roleNameOption.map((option,i)=>{
                            return (
                                <Option key={i} value={option.key}>{option.label}</Option>
                            )
                        })
                    }
                </Select>
            )
        }
        return text;
    }
}, {
    title: '审批人',
    dataIndex: 'userId',
    key: 'userId',
    width:300,
    render: (text, record) => {
        return (
            <Select
                mode="multiple"
                style={{width: '100%'}}
                placeholder="请输入审批人"
                value={text}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} //本地搜索
                onChange={e => context.handleUserIdChange(e, 'userId', record.seq)}
            >
                {
                    record.users.map(ele=>{
                        return (
                            <Option key={ele.userId}>{ele.userName}</Option>
                        )
                    })
                }
            </Select>
        )
    }
}, {
    title: '操作',
    key: 'action',
    width:60,
    render: (text, record) => {
        if (record.isDelNode === '1' || record.isNew) {
            return (
                <Popconfirm title="是否要删除此行？" onConfirm={() => context.remove(record.seq)}>
                    <a style={{color: '#f5222d'}}>删除</a>
                </Popconfirm>
            )
        }
    }
}];

class DragSortingTable extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            updateKey:Date.now(),
            data:props.value,
            itemsId:getQueryString('items_id'),
            roleNameOption:[]
        }
    }

    components = {
        body: {
            row: DragableBodyRow,
        },
    }
    componentDidMount() {
        this.getFindRoleByItem()
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                data: nextProps.value,
            });
        }
    }

    mounted=true
    componentWillUnmount(){
        this.mounted=null
    }

    //根据项目和角色id查询审批人
    getFindUserByItem=(roleId,cb)=>{
        request(`/biz/itemsroles/findUserByItem`,{
            params:{
                itemsId:this.state.itemsId,
                roleId:roleId,
            }
        })
            .then(res => {
                if(res.state === 'ok'){
                    cb && cb(res.data)
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                message.error(`${err.message}`)
            })
    }

    //根据项目查角色
    getFindRoleByItem=()=>{
        request(`/biz/itemsroles/findRoleByItem`,{
            params:{
                itemsId:this.state.itemsId
            }
        })
            .then(res => {
                if(res.state === 'ok'){
                    this.mounted && this.setState({
                        roleNameOption:setSelectFormat(res.data, 'roleId', 'roleName'),
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                message.error(`${err.message}`)
            })
    }


    getRowByKey(seq, newData) {
        return (newData || this.state.data).filter(item => item.seq === seq)[0];
    }

    handleRoleNameChange(e, fieldName,userId, fieldName2, seq){
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(seq, newData);
        if (target) {
            target[fieldName] = e;
            this.getFindUserByItem(e,(data)=>{
                target[userId] = [];
                target[fieldName2] = data;
                this.setState({
                    data: newData
                },()=>{
                    console.log(this.state.data, newData)
                });
                this.props.onChange(newData);
            })
        }
    }
    handleUserIdChange(e, fieldName, seq){
        const newData = this.state.data.map(item => ({...item}));
        const target = this.getRowByKey(seq, newData);
        if (target) {
            target[fieldName] = e;
            this.setState({data: newData});
            this.props.onChange(newData);
        }
    }

    remove(seq) {
        const newData = this.state.data.filter(item => item.seq !== seq);
        this.setState({data: newData});
        this.props.onChange(newData);
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
        this.props.onChange(this.state.data);


    }
    newMember = () => {
        const newData = this.state.data.map(item => ({ ...item }));
        newData.push({
            seq: `new_${newData.length+1}`,
            roleName: '',
            userId: [],
            isAddNode: '1',
            users:[],
            isNew: true,
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