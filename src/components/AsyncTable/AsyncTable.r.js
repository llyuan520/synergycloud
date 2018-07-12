// Created by liuliyuan on 2018/6/29
import React,{Component} from 'react';
import {Table,message} from 'antd'
import PropTypes from 'prop-types'
import {request} from 'utils'

export default class AsyncTable extends Component{
    constructor(props){
        super(props);
        this.state={
            loaded:true,
            dataSource:[],
            pagination: {
                showSizeChanger:true,
                showQuickJumper:true,
                pageSize:props.tableProps.pageSize || 10,
                showTotal:total => `总共 ${total} 条`,
                pageSizeOptions:['10','20','30','40','50','60','70','80','90','100']
            },
            selectedRowKeys: []
        }
    }
    static propTypes={
        tableProps:PropTypes.shape({
            clearSelectedRowAfterFetch:PropTypes.bool
        }),
        updateKey:PropTypes.number,
        url:PropTypes.string.isRequired,
        filters:PropTypes.object
        //columns:PropTypes.array.isRequired
    }
    static defaultProps={
        tableProps:{
            clearSelectedRowAfterFetch:true
        },
        updateKey:Date.now(),
    }
    componentWillReceiveProps(nextProps){
        if(this.props.updateKey!==nextProps.updateKey){
            const currentPager = { ...this.state.pagination };
            currentPager.current = 1;
            this.mounted &&  this.setState({
                pagination: currentPager
            },()=>{
                this.fetch({},nextProps)
            });
        }
    }
    onSelectChange = (selectedRowKeys,selectedRowData) => {
        this.setState({ selectedRowKeys });
        this.props.tableProps.onRowSelect && this.props.tableProps.onRowSelect(selectedRowKeys,selectedRowData)
    }

    fetch = (params = {},nextProps) => {
        const props = nextProps || this.props;
        this.setState({ loaded: false });
        const composeParams = {
            limit: this.state.pagination.pageSize,
            ...params,
            ...props.filters
        };
        request(props.url,{
            params:composeParams
        }).then((res) => {
            if(res.state === 'ok'){
                const pagination = { ...this.state.pagination };
                pagination.total =  res.count;
                pagination.pageSize = res.limit;

                let dataSource = res.data;

                /** 给外部一个回调方法，可以得到每次变更后的data*/
                props.tableProps.onDataChange && props.tableProps.onDataChange(dataSource)


                this.mounted && this.setState({
                    loaded: true,
                    /**
                     * 有的列表接口返回的结构不一样
                     * */
                    dataSource,
                    selectedRowKeys:[],
                    pagination
                },()=>{
                    /**
                     * 成功之后回调，返回参数和数据
                     * */
                    this.props.tableProps.onSuccess && this.props.tableProps.onSuccess(composeParams,this.state.dataSource)
                });

                /**假如设置了单选或多选，重新异步请求数据的时候选中项也要清空，也要主动触发一下selectedRowKeys的onChange*/
                props.tableProps.clearSelectedRowAfterFetch && props.tableProps.onRowSelect && props.tableProps.onRowSelect([],[])
            }else{
                /** 给外部一个回调方法，可以得到每次变更后的data*/
                props.tableProps.onDataChange && props.tableProps.onDataChange([])
                this.mounted && this.setState({
                    loaded: true,
                    dataSource:[],
                });
                return Promise.reject(res.message);
            }

        }).catch(err=>{
            message.error(`${err}`);
            this.mounted && this.setState({
                loaded: true
            });
        });
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        //设置去掉排序默认设置的值
        let sor = sorter.order ? sorter.order.replace('end', '') : undefined;
        this.fetch({
            limit: pagination.pageSize,
            page: pagination.current,
            orderField: sorter.field,
            orderType: sor,
            ...filters,
            //...this.props.filters.values,
        });
    }
    mounted=true
    componentWillUnmount(){
        this.mounted=null
    }
    render(){
        const {loaded,dataSource,pagination,selectedRowKeys}  = this.state;
        const {props} = this;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            fixed:true,
            ...props.tableProps.rowSelection
        };
        return(
            <div className='asyncTable'>
                <Table
                    {...props.tableProps}
                    dataSource={typeof props.tableProps.dataSource === 'undefined' ? dataSource : props.tableProps.dataSource}
                    rowSelection={ ( props.tableProps.onRowSelect || props.tableProps.rowSelection ) ? rowSelection : null}
                    pagination={props.tableProps.pagination ? pagination : false}
                    onChange={this.handleTableChange}
                    loading={!loaded}
                />
            </div>
        )
    }
}
