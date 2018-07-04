// Created by liuliyuan on 2018/7/2
import wrapPage from 'components/TitlePage';
import writeDirect from '../Direct/Create/Step_1'
import AssignSupplier from '../Direct/Create/Step_2'
import SiteApprovalFlow from '../Direct/Create/Step_3'

const routes = [
    {
        path:'/web/direct/create/write',
        component:wrapPage('合同履约协同平台 – 新建指令单',writeDirect),
        name:'新建指令单',
        exact:true,
    }, {
        path:'/web/direct/create/assign',
        component:wrapPage('合同履约协同平台 – 指定供应商',AssignSupplier),
        name:'指定供应商',
        exact:true,
    }, {
        path:'/web/direct/create/site',
        component:wrapPage('合同履约协同平台 – 设置审批流',SiteApprovalFlow),
        name:'设置审批流',
        exact:true,
    }, {
        path:'/web/direct/create',
        redirect:true,
        to:'/web/direct/create/write'
    }
]

export default routes