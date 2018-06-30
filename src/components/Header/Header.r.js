// Created by liuliyuan on 2018/6/22
import React,{Component} from 'react'
import { Layout,Menu,Avatar,Icon,Modal,Dropdown,Tooltip,Tag,message,Row,Col } from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import NoticeIcon from '../NoticeIcon';
//import { request } from 'utils'
import './styles.less'
//模拟数据
/*import mockAxios from '../../components/NoticeIcon/__mocks__/api.mock'
 mockAxios(request);*/

const { Header} = Layout;
const confirm = Modal.confirm;

class WimsHeader extends Component {

    state = {
        fetchingNotices:false,
        data:[],
    };

    handleMenuCollapse = ({ key })=>{
        if(key==='logout') {
            confirm({
                title: '系统提示',
                content: '确定要退出吗',
                onOk: () => this.props.logout(),
                onCancel() {

                },
            });
        }else if(key === 'admin') {
            this.props.history.push(`/${key}`)
        }else if(key === 'message'){
            return false
        }else{
            this.props.history.push(`/web/${key}`)
        }
    }

    getNoticeData() {
        const notices = this.state.data;
        if (notices.length === 0) {
            return {};
        }
        const newNotices = notices.map(notice => {
            const newNotice = { ...notice };
            if (newNotice.datetime) {
                newNotice.datetime = moment(notice.datetime).fromNow();
            }
            // transform id to item key
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if (newNotice.extra && newNotice.status) {
                const color = {
                    todo: '',
                    processing: 'blue',
                    urgent: 'red',
                    doing: 'gold',
                }[newNotice.status];
                newNotice.extra = (
                    <Tag color={color} style={{ marginRight: 0 }}>
                        {newNotice.extra}
                    </Tag>
                );
            }
            return newNotice;
        });
        return groupBy(newNotices, 'type');
    }
    handleNoticeClear = type => {
        message.success(`清空了${type}`);
        const data = this.state.data.filter(item=>item.type !== type)
        this.setState({
            data
        })
    };

    componentDidMount(){

    }

    componentWillMount(){
        this.setState({
            fetchingNotices: true
        })
        /*request.get('/notices').then(({data}) => {
            if(data.code===200){
                this.setState({
                    data:data.data,
                    fetchingNotices: false
                })
            }else{
                message.error(data.msg, 4);
                this.setState({
                    fetchingNotices: false
                })
            }
        })
            .catch(err => {
                this.setState({
                    fetchingNotices: false
                })
                message.error(err.message)
            });*/
    }


    render() {

        const menu = (
            <Menu className='menu' selectedKeys={[]} onClick={this.handleMenuCollapse}>
                <Menu.Item key='admin'>
                    <Icon type="user" />个人主页
                </Menu.Item>
                <Menu.Item key='company'>
                    <Icon type="user" />企业主页
                </Menu.Item>
                <Menu.Item key='contacts'>
                    <Icon type="user" />通讯录
                </Menu.Item>
                <Menu.Item key='site'>
                    <Icon type="user" />设置
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );

        const routerMenu = (
            <Menu className='menu' selectedKeys={[]} onClick={this.handleMenu}>
                {
                    this.props.menusData.map( item =>{
                        if (!item.name  || item.path === '/web/home' ) {
                            return null;
                        }
                        return (
                            <Menu.Item key={item.key || item.path}>
                                <Link to={item.path}>
                                    <Icon type={item.icon} />{item.name}
                                </Link>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        );
        const noticeData = this.getNoticeData();
        return (
            <Header className="header" style={{ position: 'fixed', zIndex: 2, width: '100%' }}>
                <div style={{width:'100%', maxWidth:1500,minWidth:1024,padding:'0 40px',marginLeft:'auto',marginRight:'auto'}}>
                    {/*

                     .col- 针对所有设备
                     .col-xs- 超小屏幕  <576px
                     .col-sm- 平板 - 屏幕宽度等于或大于 ≥576px  	        540px
                     .col-md- 桌面显示器 - 屏幕宽度等于或大于 ≥768px        720px
                     .col-lg- 大桌面显示器 - 屏幕宽度等于或大于 ≥992px      960px
                     .col-xl- 超大桌面显示器 - 屏幕宽度等于或大于 ≥1200px  	1140px

                     xs={6} sm={6} md={6} lg={6} xl={6}
                     xs={12} sm={12} md={12} lg={12} xl={12}
                     xs={6} sm={6} md={6} lg={6} xl={6}

                    */}
                    <Row>
                        <Col span={6}>
                            <div className='left'>
                                <Dropdown overlay={routerMenu} placement="bottomLeft" >
                                    <span className='action account'>
                                        <Icon
                                            className='trigger'
                                            type='bars'
                                        />
                                    </span>
                                </Dropdown>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className='center'>
                                <Link to="/web" className='logo'>
                                    <img className="login-logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo"/>
                                    <span className="login-title">合同协同</span>
                                </Link>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className='right'>

                                <Tooltip title="使用文档">
                                    <a
                                        target="_blank"
                                        href="/web/home"
                                        rel="noopener noreferrer"
                                        className='action'
                                    >
                                        <Icon type="question-circle-o" />
                                    </a>
                                </Tooltip>

                                <NoticeIcon
                                    className='action'
                                    count={12}
                                    onItemClick={(item, tabProps) => {
                                        //console.log(item, tabProps); // eslint-disable-line
                                    }}
                                    notices={this.state.data}
                                    onClear={this.handleNoticeClear}
                                    loading={this.state.fetchingNotices}
                                    popupAlign={{ offset: [20, -16] }}
                                >
                                    <NoticeIcon.Tab
                                        list={noticeData['通知']}
                                        title="通知"
                                        emptyText="你已查看所有通知"
                                        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                                    />
                                    <NoticeIcon.Tab
                                        list={noticeData['消息']}
                                        title="消息"
                                        emptyText="您已读完所有消息"
                                        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                                    />
                                    <NoticeIcon.Tab
                                        list={noticeData['待办']}
                                        title="待办"
                                        emptyText="你已完成所有待办"
                                        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                                    />
                                </NoticeIcon>

                                <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                                  <span className='action account'>
                                    <Avatar size="small" className='avatar' icon="user"  style={{ backgroundColor: '#87d068',color:'#fff'}} />
                                      {/*src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}*/}
                                      <span className='name'>admin</span>
                                  </span>
                                </Dropdown>

                                {/*{this.props.username ? (
                                 <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                                 <span className='action account'>
                                 <Avatar size="small" className='avatar' icon="user"  style={{ backgroundColor: '#87d068',color:'#fff'}} />
                                 <span className='name'>{ this.props.username }</span>
                                 </span>
                                 </Dropdown>
                                 ) : (
                                 <Spin size="small" style={{ marginLeft: 8 }} />
                                 )}*/}

                            </div>
                        </Col>
                    </Row>

                </div>
            </Header>
        )
    }
}

export default withRouter(connect(state=>{
    return {
        username:state.user.getIn(['personal','username'])
    }
})(WimsHeader))