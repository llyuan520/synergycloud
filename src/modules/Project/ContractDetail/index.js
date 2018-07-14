// Created by Lee on 2018/7/5

import React, { Component } from 'react';
import { Row, message } from 'antd';
import { request, getQueryString} from 'utils'
import PropTypes from 'prop-types'
import CustomizeStaticTabs from 'components/CustomizeStaticTabs'
import TabPane1 from './tab1'
import TabPane2 from './tab2'

class TableFormStepTwo extends Component{

    constructor(){
        super();
        this.state = {
            tableOption:PropTypes.object,
            updateKey: Date.now(),
            tabsOneData:{},
            tabsTwoData:{},
            /**
             * params条件，给table用的
             * */
            filters:{
            },

            /**
             * 控制table刷新，要让table刷新，只要给这个值设置成新值即可
             * */
            tableUpDateKey: Date.now(),
        }
    }

    componentWillMount(){
        let id = getQueryString('id')
        console.log(id)
        request('/con/contract/findEditData',{
            params:{
                id:id,
            }
        }).then((data)=>{
            console.log(data);
            if(data.state === 'ok'){
                let dataSource = {

                }

                this.setState({
                    tabsOneData: dataSource
                })
            }
        }).catch(err => {
            console.log(err)
            message.error(err.message)
        })
    }



    render(){
        return (
        <React.Fragment>
            <div className="ISA-fragment ISA-bgColor">
                <h1 style={{ fontSize: 24, fontWeight:600 }}>11111</h1>
            </div>
            <Row>


                <CustomizeStaticTabs
                    title=""
                    defaultActiveKey='1'
                    tabPaneOptions={
                        [
                            {
                                title:'单据列表',
                                component:
                                <TabPane1/>

                            }, {
                                title:'合同基本信息',
                                component:<TabPane2 data = {this.state.tabsTwoData}/>
                            }
                        ]
                    }
                />
            </Row>
        </React.Fragment>

        )
    }
}

export default TableFormStepTwo