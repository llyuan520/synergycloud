// Created by liuliyuan on 2018/6/23
import React, {Component} from 'react';
import {Row, Col, Select, Tabs, List, Avatar, Card, Button, Divider} from 'antd';
import {PieReact} from 'components/ECharts';

import './styles.less';
import {withRouter} from "react-router-dom";

const Option = Select.Option;
const TabPane = Tabs.TabPane;

const tabList = [{
    key: 'tab1',
    tab: '变更管理'
}, {
    key: 'tab2',
    tab: '产值管理',
}, {
    key: 'tab3',
    tab: '合同结算',
}];

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

const Tab = () => {
    return (
    <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
    <List.Item actions={[<Button type="primary" ghost>查看详情</Button>]}>
        <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
        title={<a href="https://ant.design">{item.title}</a>}
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
    </List.Item>
    )}
    />
    )
}

const getContent = (key, updateKey) => {
    const contentList = {
        tab1: <Tab updateKey={updateKey}/>,
        tab2: <Tab updateKey={updateKey}/>,
        tab3: <Tab updateKey={updateKey}/>,
    };
    return contentList[key]
}


//饼图数据
const pieOption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
};

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
        loading: false,
        key: 'tab1',
        updateKey: Date.now(),
    }

    render() {


        return (
        <React.Fragment>
            <div className="ISA-fragment">
                {/*<Spin spinning={!loaded}>*/}

                <Row gutter={24}>
                    <Col span={16}>
                        <Card
                        //loading={loading}
                        className='salesCard'
                        bordered={false}
                        title="销售额类别占比"
                        bodyStyle={{padding: 24}}
                        extra={
                            <div className="salesTypeSelect">
                                <Select defaultValue="lucy" style={{width: 220}}>
                                    <Option value="jack">喜盈佳</Option>
                                    <Option value="lucy">票易通</Option>
                                    <Option value="Yiminghe">测试</Option>
                                </Select>
                            </div>
                        }
                        >
                            <h4 style={{marginTop: 8, marginBottom: 32}}>销售额</h4>
                            <PieReact option={pieOption}/>
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
                            <Tabs tabPosition={this.state.tabPosition} size="small">
                                {
                                    tabList.map(ele => (
                                    <TabPane tab={ele.tab} key={ele.key} forceRender={false}
                                             style={{marginRight: "0px"}}>
                                        {
                                            getContent(ele.key, this.state.updateKey)
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

                {/*</Spin>*/}

            </div>
        </React.Fragment>
        )
    }
}

export default (withRouter(Home))