import SiteApprovalFlow from "./Create/Step_3";
import AssignSupplier from "./Create/Step_2";
import writeDirect from "./Create/Step_1";
import {wrapPage} from "../../components";

/**
 *
 * Created by fanzhe on 2018/7/5
 */

const routes = [
    {
        path: '/web/accept/create/write',
        component: wrapPage('合同履约协同平台 – 选择合同', writeDirect),
        name: '选择合同',
        exact: true,
    }, {
        path: '/web/accept/create/assign',
        component: wrapPage('合同履约协同平台 – 填写金额', AssignSupplier),
        name: '填写结算金额',
        exact: true,
    }, {
        path: '/web/accept/create/site',
        component: wrapPage('合同履约协同平台 – 设置审批流', SiteApprovalFlow),
        name: '设置审批流',
        exact: true,
    }, {
        path: '/web/accept/create',
        redirect: true,
        to: '/web/accept/create/write'
    }
];
export default routes