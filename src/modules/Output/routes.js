/**
 *
 * Created by fanzhe on 2018/7/5
 */
import wrapPage from 'components/TitlePage';
import ChooseContract from '../Output/Create/Step_1'
import FillProgress from '../Output/Create/Step_2'
import Presentation from '../Output/Create/Step_3'
import SiteApprovalFlow from '../Output/Create/Step_4'

const routes = [
  {
    path: '/web/output/create/write',
    component: wrapPage('合同履约协同平台 – 新建指令单', ChooseContract),
    name: '新建产值单',
    exact: true,
  }, {
    path: '/web/output/create/fill',
    component: wrapPage('合同履约协同平台 – 填写形象进度', FillProgress),
    name: '填写形象进度',
    exact: true,
  }, {
    path: '/web/output/create/present',
    component: wrapPage('合同履约协同平台 – 提报产值明细和发票', Presentation),
    name: '提报产值明细和发票',
    exact: true,
  }, {
    path: '/web/output/create/site',
    component: wrapPage('合同履约协同平台 – 设置审批流', SiteApprovalFlow),
    name: '设置审批流',
    exact: true,
  }, {
    path: '/web/output/create',
    redirect: true,
    to: '/web/output/create/write'
  }
]

export default routes