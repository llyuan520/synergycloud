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
// import CreateInstruct from './Instruct/Create'
import Project from './Project'
import CreateProject from './Project/Create'

const routes = [
    {
        path:'/web/home',
        component:wrapPage('合同履约协同平台 – 首页',Home),
        name:'首页',
        icon:'home',
        exact:true
    }, {
        path:'/web/direct',
        component:wrapPage('合同履约协同平台 – 指令单', Direct),
        name:'指令单',
        icon:'file',
        exact:true,
    }, {
        path:'/web/direct/create',
        component:wrapPage('合同履约协同平台 – 新建指令单',Create),
        name:'新建指令单',
    }, {
        path:'/web/direct/cost',
        component:wrapPage('合同履约协同平台 – 成本测算',CostMeasure),
        name:'成本测算',
        exact:true,
    }, {
        path:'/web/direct/send',
        component:wrapPage('合同履约协同平台 – 下发指令',SendDirect),
        name:'下发指令',
        exact:true,
    }, {
        path:'/web/direct/sign',
        component:wrapPage('合同履约协同平台 – 签收指令',SignDirect),
        name:'签收指令',
        exact:true,
    }, {
        path:'/web/direct/complete',
        component:wrapPage('合同履约协同平台 – 完工确认',CompleteConfirm),
        name:'完工确认',
        exact:true,
    }, {
        path:'/web/direct/change',
        component:wrapPage('合同履约协同平台 – 变更结算',ChangeSettleAccounts),
        name:'变更结算',
        exact:true,
    }, {
        path:'/web/output',
        name:'产值单',
        icon:'setting',
        exact:true,
    }, {
        path:'/web/accept',
        name:'竣工验收单',
        icon:'team',
        exact:true,
    }, {
        path:'/web/contract',
        name:'合同结算单',
        icon:'api',
        exact:true,
    }, {
        path:'/web/project',
        component:wrapPage('合同履约协同平台 – 项目管理', Project),
        name:'项目管理',
        icon:'api',
        exact:true,
    }, {
        path:'/web/project/create',
        component:wrapPage('合同履约协同平台 – 新建项目', CreateProject),
        name:'新建项目',
        exact:true,
    }, {
        path:'/403',
        component:wrapPage('403',() => import('./Exception/403')),
        name:'403',
        exact:true,
    }, {
        path:'/404',
        component:wrapPage('404',() => import('./Exception/404')),
        name:'404',
        exact:true,
    }, {
        path:'/500',
        component:wrapPage('500',() => import('./Exception/500')),
        name:'500',
        exact:true,
    },{
        path:'/web',
        redirect:true,
        to:'/web/home'
    }
]

export default routes