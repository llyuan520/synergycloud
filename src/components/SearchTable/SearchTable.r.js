// Created by liuliyuan on 2018/6/29
import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {Layout,Card,Form,Spin} from 'antd'
import TableSearchListForm from '../TableSearchListForm/index'
import AsyncTable from '../AsyncTable/index'
import './index.less'

class SearchTable extends Component{
    static propTypes = {
        searchOption:PropTypes.object,
        tableOption:PropTypes.object,
        spinning:PropTypes.bool,
        doNotFetchDidMount:PropTypes.bool,
        beforeSearch:PropTypes.func,
    }
    static defaultProps = {
        spinning:false,
        doNotFetchDidMount:false,
        searchOption:{},
        tableOption:{
            bodyStyle:{
                padding:24
            }
        }

    }
    constructor(props){
        super(props)
        this.state={
            /**
             * params条件，给table用的
             * */
            filters:{
            },

            /**
             * 控制table刷新，要让table刷新，只要给这个值设置成新值即可
             * */
            tableUpDateKey:props.tableOption.key || Date.now(),
            visible:false,
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.tableOption.key !== nextProps.tableOption.key){
            /*this.setState({
             tableUpDateKey:nextProps.tableOption.key,
             })*/
            this.handleSearch()
        }

        if(nextProps.searchOption){
            for(let key in nextProps.searchOption.filters){
                if(nextProps.searchOption.filters[key] !== this.props.searchOption.filters[key]){
                    this.setState({
                        filters:nextProps.searchOption.filters
                    })
                }
            }
        }
    }
    handleSearch = values => {
        this.setState(prevState=>({
            selectedRowKeys:null,
            filters:{
                //合并上次filters的原因是组件会接收外部的额外filter条件，如果不合并就会忽略到外部的条件
                ...prevState.filters,
                ...values
            }
        }),()=>{
            this.setState({
                tableUpDateKey:Date.now()
            })
        });

    }
    updateTable=()=>{
        this.handleSearch()
    }
    componentDidMount(){
        !this.props.doNotFetchDidMount && this.updateTable()
        this.props.searchOption && this.props.searchOption.filters && this.setState({
            filters:this.props.searchOption.filters
        })
    }
    render() {
        const {tableUpDateKey,filters} = this.state;
        const {searchOption,tableOption,children,form,spinning,style} = this.props;
        return(
            <Layout style={{background:'transparent',...style}} >
                <Spin spinning={spinning}>
                    {
                        searchOption && <TableSearchListForm
                                            form={ form }
                                            title={ searchOption.title && searchOption.title }
                                            fieldsData={ searchOption.fieldsData && searchOption.fieldsData }
                                            handleSearch={ values => this.handleSearch(values) }
                                        />
                    }
                    <Card
                        className="table-card"
                        bordered={false}
                        extra={tableOption.extra || null}
                        {...tableOption.cardProps}
                    >
                        <div className="ISA-content">
                            <AsyncTable url={tableOption.url}
                                    updateKey={tableUpDateKey}
                                    filters={filters}
                                    tableProps={{
                                        rowKey:record=>record[tableOption.rowKey] || record.id,
                                        pagination:typeof tableOption.pagination === 'undefined' ? true : tableOption.pagination,
                                        pageSize:tableOption.pageSize || 10,
                                        onRow:tableOption.onRow || undefined,
                                        rowSelection:tableOption.rowSelection || tableOption.onRowSelect || undefined,
                                        onRowSelect:tableOption.onRowSelect || undefined,
                                        columns:tableOption.columns,
                                        onSuccess:tableOption.onSuccess || undefined,
                                        scroll:tableOption.scroll || undefined,
                                        onDataChange:tableOption.onDataChange || undefined,
                                    }} />
                        </div>
                    </Card>
                </Spin>
                {
                    children ? children : null
                }
            </Layout>
        )
    }
}
export default Form.create({
    onValuesChange:(props,values)=>{
        //给外部一个获得搜索条件的回调
        props.searchOption.getFieldsValues && props.searchOption.getFieldsValues(values)
        props.searchOption.onFieldsChange && props.searchOption.onFieldsChange(values)
    }
})(SearchTable)