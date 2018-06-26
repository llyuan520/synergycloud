// Created by liuliyuan on 2018/6/23
import React, { Component, Fragment } from 'react';
import { Row, Radio, Col, Select, Tabs, List, Avatar, Card, Button, Divider, Dropdown, Icon,Menu } from 'antd';
import { yuan,Pie } from 'components/Charts';
import { EPie } from 'components/Echarts';

import './index.less';

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

const Tab = () =>{
    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
            <List.Item actions={[<Button type="primary" ghost>查看详情</Button>]}>
                <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
            </List.Item>
            )}
        />
    )
}

const getContent = (key,updateKey) => {
    const contentList = {
        tab1: <Tab updateKey={updateKey}/>,
        tab2: <Tab updateKey={updateKey}/>,
        tab3: <Tab updateKey={updateKey}/>,
    };
    return contentList[key]
}

const toolData = {
    0:[
        {
            src:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
            title:'团队管理'
        },{
            src:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
            title:'权限管理'
        },{
            src:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
            title:'审批模板'
        }
    ],
    1:[
        {
            src:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
            title:'报表管理'
        },{
            src:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
            title:'申请角色'
        },{
            src:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
            title:'我的日程'
        }
    ]
}



const salesTypeData = [
    {
        x: '家用电器',
        y: 4544,
    },
    {
        x: '食用酒水',
        y: 3321,
    },
    {
        x: '个护健康',
        y: 3113,
    },
    {
        x: '服饰箱包',
        y: 2341,
    },
    {
        x: '母婴产品',
        y: 1231,
    },
    {
        x: '其他',
        y: 1231,
    },
];

const salesTypeDataOnline = [
    {
        x: '家用电器',
        y: 244,
    },
    {
        x: '食用酒水',
        y: 321,
    },
    {
        x: '个护健康',
        y: 311,
    },
    {
        x: '服饰箱包',
        y: 41,
    },
    {
        x: '母婴产品',
        y: 121,
    },
    {
        x: '其他',
        y: 111,
    },
];

const salesTypeDataOffline = [
    {
        x: '家用电器',
        y: 99,
    },
    {
        x: '个护健康',
        y: 188,
    },
    {
        x: '服饰箱包',
        y: 344,
    },
    {
        x: '母婴产品',
        y: 255,
    },
    {
        x: '其他',
        y: 65,
    },
];

//饼图数据
const pieOption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
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
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};


export default class Home extends Component {

    state = {
        loading:false,
        key: 'tab1',
        updateKey:Date.now(),
        salesType: 'all',
    }

    componentDidMount() {

    }

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    }

    handleChangeSalesType = e => {
        this.setState({
            salesType: e.target.value,
        });
    };

    render(){

        const { salesType } = this.state;



        const salesPieData =
            salesType === 'all'
                ? salesTypeData
                : salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;

        const menu = (
            <Menu>
                <Menu.Item>操作一</Menu.Item>
                <Menu.Item>操作二</Menu.Item>
            </Menu>
        );

        const iconGroup = (
            <span className='iconGroup'>
                <Dropdown overlay={menu} placement="bottomRight">
                  <Icon type="ellipsis" />
                </Dropdown>
            </span>
        );

        return(
            <Fragment>
                {/*<Spin spinning={!loaded}>*/}

                <Row gutter={24}>
                    <Col span={16}>
                        <Card
                            //loading={loading}
                            className='salesCard'
                            bordered={false}
                            title="销售额类别占比"
                            bodyStyle={{ padding: 24 }}
                            extra={
                                <div className='salesCardExtra'>
                                    {iconGroup}
                                    <div className='salesTypeRadio'>
                                        <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                                            <Radio.Button value="all">全部渠道</Radio.Button>
                                            <Radio.Button value="online">线上</Radio.Button>
                                            <Radio.Button value="offline">门店</Radio.Button>
                                        </Radio.Group>
                                    </div>

                                    <div className="salesTypeSelect">
                                        <Select defaultValue="lucy" style={{ width: 220 }}>
                                            <Option value="jack">喜盈佳</Option>
                                            <Option value="lucy">票易通</Option>
                                            <Option value="Yiminghe">测试</Option>
                                        </Select>
                                    </div>
                                </div>
                            }
                            style={{ marginTop: 15, minHeight: 303 }}
                        >
                            <h4 style={{ marginTop: 8, marginBottom: 32 }}>销售额</h4>
                            <Pie
                                hasLegend
                                subTitle="销售额"
                                 total={() => (
                                 <span
                                 dangerouslySetInnerHTML={{
                                 __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
                                 }}
                                 />
                                 )}
                                data={salesPieData}
                                valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                                height={200}
                                lineWidth={4}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <div className="home-half-box">
                            <p>产值报表</p>
                            <EPie option={pieOption} />
                        </div>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={16}>
                        <Card
                            style={{ width: '100%',marginTop:15 }}
                            bordered={false}
                            bodyStyle={{
                                padding:20
                            }}
                        >
                            <Tabs tabPosition={this.state.tabPosition} size="small">
                                {
                                    tabList.map(ele=>(
                                        <TabPane tab={ele.tab} key={ele.key} forceRender={false} style={{marginRight:"0px"}}>
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
                        <div style={{ background: '#ffffff', padding: '20px',marginTop:15 }}>
                            <p>实用工具</p>
                            <Row gutter={16}>
                                {
                                    toolData[0].map((item,key)=>{
                                        return (
                                            <Col span={8} key={key}>
                                                <Card
                                                    bordered={false}
                                                    bodyStyle={{
                                                        padding:0,
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    <span className="ant-avatar ant-avatar-lg ant-avatar-square ant-avatar-image">
                                                        <img alt={item.title} src={item.src} />
                                                    </span>
                                                    <span style={{display:'block'}}>
                                                        {item.title}
                                                    </span>
                                                </Card>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                            <Divider />
                            <Row gutter={16}>
                                {
                                    toolData[1].map((item,key)=>{
                                        return (
                                            <Col span={8} key={key}>
                                                <Card
                                                    bordered={false}
                                                    bodyStyle={{
                                                        padding:0,
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    <span className="ant-avatar ant-avatar-lg ant-avatar-square ant-avatar-image">
                                                        <img alt={item.title} src={item.src} />
                                                    </span>
                                                    <span style={{display:'block'}}>
                                                        {item.title}
                                                    </span>
                                                </Card>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </Col>
                </Row>

                {/*</Spin>*/}
            </Fragment>
        )
    }
}