// Created by liuliyuan on 2018/6/22
import wrapPage from 'components/TitlePage';
import Home from './Home/index'
import Direct from './Direct'
import Create from './Direct/Create'
import CostMeasure from './Direct/Cost'
import SendDirect from './Direct/Send'
import SignDirect from './Direct/Sign'
import CompleteConfirm from './Direct/Complete'
import ChangeSettleAccounts from './Direct/Change'

import Output from './Output';
import OutputCreate from './Output/Create'
import Accept from "./Accept";
import Contract from "./Contract";

const routes = [
    {
        path: '/web/home',
        component: wrapPage('合同履约协同平台 – 首页', Home),
        name: '首页',
        icon: 'home',
        exact: true
    }, {
        path: '/web/direct',
        component: wrapPage('合同履约协同平台 – 指令单', Direct),
        name: '指令单',
        icon: 'file',
        exact: true,
    }, {
        path: '/web/direct/create',
        component: wrapPage('合同履约协同平台 – 新建指令单', Create),
        name: '新建指令单',
    }, {
        path: '/web/direct/cost',
        component: wrapPage('合同履约协同平台 – 成本测算', CostMeasure),
        name: '成本测算',
    }, {
        path: '/web/direct/send',
        component: wrapPage('合同履约协同平台 – 下发指令', SendDirect),
        name: '下发指令',
    }, {
        path: '/web/direct/sign',
        component: wrapPage('合同履约协同平台 – 签收指令', SignDirect),
        name: '签收指令',
    }, {
        path: '/web/direct/complete',
        component: wrapPage('合同履约协同平台 – 完工确认', CompleteConfirm),
        name: '完工确认',
    }, {
        path: '/web/direct/change',
        component: wrapPage('合同履约协同平台 – 变更结算', ChangeSettleAccounts),
        name: '变更结算',
    }, {
        path: '/web/output',
        name: '产值单',
        component: wrapPage('合同履约协同平台 – 产值单', Output),
        icon: 'setting',
        exact: true,
    }, {
        path: '/web/output/create',
        name: '新建产值单',
        component: wrapPage('合同履约协同平台 – 新建产值单', OutputCreate),
    }, {
        path: '/web/accept',
        name: '竣工验收单',
        icon: 'team',
        component: wrapPage('合同履约协同平台 – 竣工验收单', Accept),
        exact: true,
    }, {
        path: '/web/contract',
        name: '合同结算单',
        icon: 'api',
        component: wrapPage('合同履约协同平台 – 合同结算单', Contract),
        exact: true,
    }, {
        path: '/web/project',
        name: '项目管理',
        icon: 'api',
        exact: true,
    }, {
        path: '/403',
        component: wrapPage('403', () => import('./Exception/403')),
        name: '403',
        exact: true,
    }, {
        path: '/404',
        component: wrapPage('404', () => import('./Exception/404')),
        name: '404',
        exact: true,
    }, {
        path: '/500',
        component: wrapPage('500', () => import('./Exception/500')),
        name: '500',
        exact: true,
    }, {
        path: '/web',
        redirect: true,
        to: '/web/home'
    }
]

export default routes