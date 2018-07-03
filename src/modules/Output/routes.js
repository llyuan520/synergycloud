// Created by liuliyuan on 2018/7/2
import wrapPage from 'components/TitlePage';
import writeInstruct from '../Instruct/Create/Step_1'
import AssignSupplier from '../Instruct/Create/Step_2'
import SiteApprovalFlow from '../Instruct/Create/Step_3'

const routes = [
    {
        path:'/web/instruct/create/write',
        component:wrapPage('合同履约协同平台 – 新建指令单',writeInstruct),
        name:'新建指令单',
        exact:true,
    }, {
        path:'/web/instruct/create/assign',
        component:wrapPage('合同履约协同平台 – 指定供应商',AssignSupplier),
        name:'指定供应商',
        exact:true,
    }, {
        path:'/web/instruct/create/site',
        component:wrapPage('合同履约协同平台 – 设置审批流',SiteApprovalFlow),
        name:'设置审批流',
        exact:true,
    }, {
        path:'/web/instruct/create',
        redirect:true,
        to:'/web/instruct/create/write'
    }
]

export default routes