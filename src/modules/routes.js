// Created by liuliyuan on 2018/6/22
import wrapPage from 'components/TitlePage';
import Home from './Home/index'
import Instruct from './Instruct'


const routes = [
    {
        path:'/web/home',
        component:wrapPage('合同履约协同平台 – 首页',Home),
        name:'首页',
        icon:'home',
        exact:true
    }, {
        path:'/web/instruct',
        component:wrapPage('合同履约协同平台 – 指令单',Instruct),
        name:'指令单',
        icon:'file',
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
        name:'项目管理',
        icon:'api',
        exact:true,
    }, {
        path:'/web',
        redirect:true,
        to:'/web/home'
    }
]

export default routes