import writeDirect from "./Create/Step_1";
import SiteApprovalFlow from "./Create/Step_3";
import AssignSupplier from "./Create/Step_2";
import {wrapPage} from "../../components";

/**
 *
 * Created by fanzhe on 2018/7/5
 */


const routes = [
    {
        path: '/web/contract/create/write',
        component: wrapPage('合同履约协同平台 – 新建指令单', writeDirect),
        name: '选择合同',
        exact: true,
    }, {
        path: '/web/contract/create/assign',
        component: wrapPage('合同履约协同平台 – 指定供应商', AssignSupplier),
        name: '填写结算金额',
        exact: true,
    }, {
        path: '/web/contract/create/site',
        component: wrapPage('合同履约协同平台 – 设置审批流', SiteApprovalFlow),
        name: '设置审批流',
        exact: true,
    }, {
        path: '/web/contract/create',
        redirect: true,
        to: '/web/contract/create/write'
    }
];
export default routes
