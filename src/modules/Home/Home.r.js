// Created by liuliyuan on 2018/6/23
import React, { Component, Fragment } from 'react';
import { Row, Radio, Col, Select, Tabs, List, Avatar, Card, Button, Divider, Dropdown, Icon,Menu } from 'antd';
import { Link } from 'react-router-dom';
import { changeChartArr } from 'utils';
import { Chart, Geom, Axis,Coord, Legend, Tooltip} from 'bizcharts';
import { yuan,Pie } from 'components/Charts';
import debounce from 'lodash/debounce'
import DotBadge from './DotBadge.r';

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

export default class Home extends Component {
    constructor(props){
        super(props);
        this.resize = debounce(this.resize,500).bind(this)
    }

    state = {
        statisticsData: {
            changeNumber: 10,
            outputNumber: 20,
            completionNumber: 30,
            contractNumber: 40,
        },
        loading:false,
        key: 'tab1',
        updateKey:Date.now(),
        salesType: 'all',
    }

    componentDidMount() {
        //this.resize = debounce(this.resize,300)
        this.resize();
        window.addEventListener('resize', this.resize);

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
        this.resize.cancel();
    }
    resize() {
        window.removeEventListener('resize', this.resize);
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

        const { statisticsData,salesType } = this.state;

        let datas = [
            {
                item: `变更：${statisticsData.changeNumber}`,
                percent: statisticsData.changeNumber
            },
            {
                item: `产值：${statisticsData.outputNumber}`,
                percent: statisticsData.outputNumber
            },
            {
                item: `竣工验收：${statisticsData.completionNumber}`,
                percent: statisticsData.completionNumber
            },
            {
                item: `合同结算：${statisticsData.contractNumber}`,
                percent: statisticsData.contractNumber
            },
        ];
        datas = changeChartArr(datas);

        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
            style: { marginBottom: 24 },
        };


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
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
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
                                </div>
                            }
                            style={{ marginTop: 24, minHeight: 509 }}
                        >
                            <h4 style={{ marginTop: 8, marginBottom: 32 }}>销售额</h4>
                            <Pie
                                hasLegend
                                /*subTitle="销售额"
                                total={() => (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
                                        }}
                                    />
                                )}*/
                                data={salesPieData}
                                valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                                height={248}
                                lineWidth={4}
                            />
                        </Card>
                    </Col>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <div className="home-half-box">
                            <p>产值报表</p>
                        </div>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={16}>
                        <div className="home-half-box">
                            <Row>
                                <Col span={16}>
                                    <Select defaultValue="lucy" style={{ width: 220 }}>
                                        <Option value="jack">喜盈佳</Option>
                                        <Option value="lucy">票易通</Option>
                                        <Option value="Yiminghe">测试</Option>
                                    </Select>
                                </Col>
                                <Col span={8} style={{textAlign: 'right'}}>
                                    <Link className="home-half-tip-link" to={`/web/applicationForm?currentState=`}>详情</Link>
                                </Col>
                            </Row>


                            <Chart height={300} data={datas} >
                                 <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                 <Axis name="percent" />
                                 <Legend position="right" offsetY={-window.innerHeight / 2 + 250} offsetX={-100} />
                                <Tooltip
                                    showTitle={false}
                                    itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                                />
                                <Geom
                                    type="intervalStack"
                                    position="percent"
                                    //color='item'
                                    color={['item', ['#1890FF', '#7ED321', '#F5A623', '#47ADBF']]}
                                    style={{lineWidth: 1,stroke: '#fff',marginTop:10}}
                                >
                                </Geom>
                            </Chart>

                            {/*<Row className="home-half-abs">
                                {
                                    [
                                        {
                                            text: `变更：${statisticsData.changeNumber}`,
                                            dotColor: '#1890FF'
                                        },
                                        {
                                            text: `待审批：${statisticsData.changeNumber}`
                                        },
                                        {
                                            text: `产值：${statisticsData.outputNumber}`,
                                            dotColor: '#7ED321'
                                        },
                                        {
                                            text: `待审批：${statisticsData.outputNumber}`
                                        },
                                        {
                                            text: `竣工验收：${statisticsData.completionNumber}`,
                                            dotColor: '#F5A623'
                                        },
                                        {
                                            text: `待审批：${statisticsData.completionNumber}`
                                        },
                                        {
                                            text: `合同结算：${statisticsData.contractNumber}`,
                                            dotColor: '#47ADBF'
                                        },
                                        {
                                            text: `待审批：${statisticsData.contractNumber}`
                                        }
                                    ].map( (item, i) => (
                                        <Col key={i} span={12} style={{marginTop: 5}}>
                                            <DotBadge
                                                dotStyle={{backgroundColor: item.dotColor}}
                                                text={item.text}
                                            />
                                        </Col>
                                    ))
                                }
                            </Row>*/}
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="home-half-box">
                            <p>产值报表</p>
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