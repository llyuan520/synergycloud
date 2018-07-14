// Created by liuliyuan on 2018/6/23
import React, {Component} from 'react';
import {Row, Col, Tabs, List, Avatar, Card, Button, Divider, message, Badge, Spin } from 'antd';
import {Link} from 'react-router-dom'
import {PieReact} from 'components/ECharts';
import { request } from  'utils'

import './styles.less';
import {withRouter} from "react-router-dom";

const TabPane = Tabs.TabPane;

const tabList = [{
    key: 'tab1',
    tab: '变更管理',
}, {
    key: 'tab2',
    tab: '产值管理',
}, {
    key: 'tab3',
    tab: '合同结算',
}];

const Tab = (props) => {
    return (
        <List
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={item => (
            <List.Item actions={[<Button type="primary" ghost>查看详情</Button>]}>
                <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                title={
                    <React.Fragment>
                        <Link to="#/">{item.name}</Link>
                        <Badge count={item.count || 11} style={{ backgroundColor: '#52c41a',marginLeft:20 }} />
                    </React.Fragment>
                }
                description={item.description}
                />
            </List.Item>
        )}
        />
    )
}

const getContent = (key, data, updateKey) => {
    const contentList = {
        tab1: <Tab data={data} updateKey={updateKey}/>,
        tab2: <Tab data={data} updateKey={updateKey}/>,
        tab3: <Tab data={data} updateKey={updateKey}/>,
    };
    return contentList[key]
}

const toolData = (context) => {
    return {
        0: [
            {
                src: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                title: '团队管理'
            }, {
                src: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                title: '权限管理'
            }, {
                src: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                title: '审批模板',
                onClick: () => {
                    context.props.history.push("/web/template")
                }
            }
        ],
        1: [
            {
                src: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                title: '报表管理'
            }, {
                src: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                title: '申请角色'
            }, {
                src: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                title: '我的日程'
            }
        ]
    }

}

class Home extends Component {

    state = {
        loaded: false,
        activeKey: 'tab1',
        updateKey: Date.now(),
        pieUpdateKey: Date.now(),
        data:[],

        //饼图数据
        pieData:{},
    }

    componentDidMount() {
        let pLoader = Promise.all([this.getStayApprovalCount(), this.getFindDirectiveNumber()]);
            pLoader.then(() => {
                this.setState({
                    loaded:true,
                    pieUpdateKey: Date.now(),
                })
            }).catch(err => {
                // message.error(`${err.message}`)
            });
    }
    onChange = (activeKey) => {
        this.setState({
            activeKey
        },()=>{
            this.getFindDirectiveNumber()
        });
    }
    //查询待我审核
    getStayApprovalCount=()=>{
        request(`/adt/instance/stayApprovalCount`)
            .then(res => {
                if(res.state === 'ok'){
                    let result = res.data;
                    let legendData = result.map(item=>item.billName);
                    let seriesData = result.map(item=>({value: item.count, name: item.billName}));
                    this.setState({
                        pieData:{
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                x: 'left',
                                data: legendData
                            },
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: ['100%', '70%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '30',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: seriesData
                                }
                            ]
                            }
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                // message.error(`${err.message}`)
            })
    }
    //变更管理的初始数据
    getFindDirectiveNumber=()=>{
        request(`/con/mdydirective/findDirectiveNumber`)
            .then(res => {
                if(res.state === 'ok'){
                    this.setState({
                        data:res.data,
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                // message.error(`${err.message}`)
            })
    }

    render() {
        const { loaded, pieData, activeKey, data, updateKey } = this.state
        return (
        <React.Fragment>
            <div className="ISA-fragment">
                <Spin spinning={!loaded}>
                    <Row gutter={24}>
                        <Col span={16}>
                            <Card
                                //loading={loading}
                                className='salesCard'
                                bordered={false}
                                title="待我审核"
                                bodyStyle={{padding: 24}}
                            >
                                {/*<h4 style={{marginTop: 8, marginBottom: 32}}>待我审核</h4>*/}
                                <PieReact option={pieData}/>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                            style={{width: '100%'}}
                            bordered={false}
                            title="产值报表"
                            bodyStyle={{
                                padding: 20
                            }}
                            >

                            </Card>

                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={16}>
                            <Card
                            style={{width: '100%', marginTop: 15}}
                            bordered={false}
                            //title="产值报表"
                            bodyStyle={{
                                padding: 20
                            }}
                            >
                                <Tabs activeKey={activeKey} size="small" onChange={this.onChange}>
                                    {
                                        tabList.map(ele => (
                                            <TabPane tab={ele.tab} key={ele.key} forceRender={false}
                                                     style={{marginRight: "0px"}}>
                                                {
                                                    getContent(ele.key, data, updateKey)
                                                }
                                            </TabPane>
                                        ))
                                    }
                                </Tabs>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                            style={{width: '100%', marginTop: 15}}
                            bordered={false}
                            title="实用工具"
                            bodyStyle={{
                                padding: 20
                            }}
                            >
                                <Row gutter={16}>
                                    {
                                        toolData(this)[0].map((item, key) => {
                                            return (
                                            <Col span={8} key={key}>
                                                <Card
                                                bordered={false}
                                                bodyStyle={{
                                                    padding: 0,
                                                    textAlign: 'center',
                                                    cursor: "pointer"
                                                }}
                                                onClick={item.onClick}
                                                >
                                                        <span
                                                        className="ant-avatar ant-avatar-lg ant-avatar-square ant-avatar-image">
                                                            <img alt={item.title} src={item.src}/>
                                                        </span>
                                                    <span style={{display: 'block'}}>
                                                            {item.title}
                                                        </span>
                                                </Card>
                                            </Col>
                                            )
                                        })
                                    }
                                </Row>
                                <Divider/>
                                <Row gutter={16}>
                                    {
                                        toolData(this)[1].map((item, key) => {
                                            return (
                                            <Col span={8} key={key}>
                                                <Card
                                                bordered={false}
                                                bodyStyle={{
                                                    padding: 0,
                                                    textAlign: 'center',
                                                    cursor: "pointer"
                                                }}
                                                >
                                                        <span
                                                        className="ant-avatar ant-avatar-lg ant-avatar-square ant-avatar-image">
                                                            <img alt={item.title} src={item.src}/>
                                                        </span>
                                                    <span style={{display: 'block'}}>
                                                            {item.title}
                                                        </span>
                                                </Card>
                                            </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Spin>
            </div>
        </React.Fragment>
        )
    }
}

export default (withRouter(Home))