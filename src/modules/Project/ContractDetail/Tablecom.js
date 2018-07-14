// created by Lee in 2018/07/13
import React, { Component } from 'react';
import AsyncTable from 'components/AsyncTable'
import getColumns from './getColumns'

class ButtonList extends Component{
    constructor(props){
        super(props);
        this.state={
            /**
             * params条件，给table用的
             * */
            filters:{
            },

            /**
             * 控制table刷新，要让table刷新，只要给这个值设置成新值即可
             * */
            tableUpDateKey: props.updateKey,
            ButtonBoxIndex: props.ButtonBoxIndex,
            url: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('ButtonBoxIndex' in nextProps) {
            let  url = '';
            if(nextProps.ButtonBoxIndex === 0){
                url = '/con/mdydirective/findMdyList'
            }else if(nextProps.ButtonBoxIndex === 1){
                url = '/con/output/findListData'
            }else if(nextProps.ButtonBoxIndex === 2){
                url = ''
            }
            console.log(url)

            let time = Date.now()
            this.setState({
                ButtonBoxIndex: nextProps.ButtonBoxIndex,
                url: url,
                tableUpDateKey:time

            });
        }
    }


    render(){
        const {ButtonBoxIndex,tableUpDateKey,filters,url} = this.state;
        console.log('进来了')
        console.log(ButtonBoxIndex)
        console.log(url)
        console.log('----------------------------------------')
        return (
            <AsyncTable
                url={url}
                updateKey={tableUpDateKey}
                filters={filters}
                tableProps={{
                    rowKey: record=>record[this.state.tableUpDateKey] || record.id,
                    pagination: true,
                    pageSize: 10,
                    onRow:undefined,
                    rowSelection:undefined,
                    onRowSelect:undefined,
                    columns:getColumns(ButtonBoxIndex,this),
                    onSuccess: undefined,
                    scroll:undefined,
                    onDataChange:undefined,
                }} />
        )

    }


}

export default ButtonList