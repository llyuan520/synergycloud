// Created by liuliyuan on 2018/6/22
import {wrapPage} from 'utils'
import Home from './Home/index'

const routes = [
    {
        path:'/web/home',
        component:wrapPage('合同履约协同平台 – 首页',Home),
        name:'首页',
        icon:'home',
        exact:true
    }, {
        path:'/web/createInstruct',
        name:'新建指令',
        icon:'file',
        exact:true,
        /*children: [
            {
                path:'/web/createInstruct/one',
                component:wrapPage('新建指令一', One),
                name:'新建指令一',
                exact:true,

            },{
                path:'/web/createInstruct/two',
                component:wrapPage('新建指令二', Two),
                name:'新建指令二',
                exact:true,
            },{
                path:'/web/createInstruct',
                redirect:true,
                to:'/web/createInstruct/one'
            }
        ]*/
    }, {
        path:'/web/dispenseInstruct',
        name:'分发指令',
        icon:'setting',
        exact:true,
    }, {
        path:'/web/confirmCompletion',
        name:'完工确认',
        icon:'team',
        exact:true,
    }, {
        path:'/web/changeSettle',
        name:'变更结算',
        icon:'api',
        exact:true,
    }, {
        path:'/web/productionReport',
        name:'产值提报',
        icon:'api',
        exact:true,
    }, {
        path:'/web/completionAccept',
        name:'竣工验收',
        icon:'api',
        exact:true,
    }, {
        path:'/web/contractSettle',
        name:'合同结算',
        icon:'api',
        exact:true,
    }, {
        path:'/web',
        redirect:true,
        to:'/web/home'
    }
]

export default routes