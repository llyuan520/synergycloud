// Created by liuliyuan on 2018/6/22
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from './components';
import Login from './modules/Login';
import Register from './modules/Register'
import ForgetPassword from './modules/ForgetPassword'
import PersonInfo from './modules/PersonInfo'
import { Layout } from 'antd';
import Web from './modules/Web.r';
import { wrapPage } from 'utils';
const routes = [
    {
        path: '/web',
        component: Web,
        name: '主页'
    },
    {
        path: '/login',
        component: wrapPage('合同履约协同 - 登录', Login),
        name: '登录'
    },
    {
        path: '/register',
        component: wrapPage('合同履约协同 - 注册', Register),
        name: '注册'
    },
    {
        path: '/forgetPassword',
        component: wrapPage('合同履约协同 - 忘记密码', ForgetPassword),
        name: '忘记密码'
    },
    {
        path: '/personInfo',
        component: wrapPage('合同履约协同 - 完善资料', PersonInfo),
        name: '完善资料'
    },
    {
        path: '*',
        redirect: true,
        to: '/web'
    },

];
const mainRoute = (
    <Route
        render={({location}) => {

            const homeRoute = () => (
                <Redirect to="/login"/>
            );
            return(
                <Layout>
                    <Route exact={true} strict={true} path="/" render={homeRoute} />
                    <Switch>
                        {routes.map((route, index) => (
                            <RouteWithSubRoutes key={index} {...route}/>
                        ))}
                    </Switch>

                </Layout>
            );
        }}
    />
);

export default mainRoute;