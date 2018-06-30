// Created by liuliyuan on 2018/6/22
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {RouteWithSubRoutes, Footer, Header} from 'components'
import {Switch,Route } from 'react-router-dom';
import {logout} from 'ducks/user'
import { Layout } from 'antd';
import { composeMenus } from 'utils'
import routes from './routes'
import './styles.less'


const { Content } = Layout;
const menusData = composeMenus(routes);

class Web extends Component{
    static propTypes = {
        history:PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            result:[],
        };
    }

    checkLoggedIn= props =>{
        const {loggedIn,history} = props;
        if(!loggedIn){
            history.replace('/login');
        }
    }

    mounted=true
    componentWillUnmount(){
        this.mounted=null;
    }
    componentWillMount(){
        this.checkLoggedIn(this.props)
    }
    componentWillReceiveProps(nextProps){
        this.checkLoggedIn(nextProps)
    }
    render(){

        return(
            <Layout style={{backgroundColor:'#fff'}}>
                <Layout style={{ msFlex:'1 1 auto', msOverflowY: 'hidden',minHeight:'100vh'}}>
                    <Header
                        menusData={menusData}
                        logout={()=>this.props.logout()}
                    />
                    <Content>
                        <Layout style={{flex:1}}>

                            <Switch>
                                {routes.map((route, i) => (
                                    <RouteWithSubRoutes key={i} {...route}/>
                                ))}
                                <Route path="*" component={()=><div>no match</div>} />
                            </Switch>

                            {/*<Switch>
                                {
                                    composeMenus(routes).map((route, i) => {
                                        return (
                                            <RouteWithSubRoutes key={i} {...route}/>
                                        )
                                    })
                                }
                                <Route path="*" component={()=><div>no match</div>} />
                            </Switch>*/}

                        </Layout>
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        )
    }
}

export default connect(state=>({
    loggedIn:state.user.get('loggedIn')
}),dispatch=>({
    logout:logout(dispatch)
}))(Web)