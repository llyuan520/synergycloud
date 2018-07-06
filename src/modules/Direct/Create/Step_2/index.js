// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Button,message} from 'antd';
import CustomizeTabs from '../../../../components/Tabs/index'
import TabPane1 from '../Step_1/tab1'
import TabPane2 from './tab2'
import { request,getQueryString } from  'utils'

class Step2 extends Component {
    state={
        updateKey:Date.now(),
        data:{},

        //初始值
        tabPane1Loading:true,
        model:{},
        itemList:[],
    }

    setData = data =>{
        this.mounted && this.setState({
            data
        })
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        console.log(this.state.data)
        this.props.history.push(`/web/direct/create/site?directId=${getQueryString('directId')}`)
    }

    toggleTabPane1Loading = (tabPane1Loading) => {
        this.setState({
            tabPane1Loading
        });
    }
    getFindDirectiveData=(directId)=>{
        this.toggleTabPane1Loading(true);
        request(`/con/mdydirective/findDirectiveData`,{
            params:{
                directId:directId
            }
        })
            .then(res => {
                console.log(res.data.model);
                this.toggleTabPane1Loading(false);
                if(res.state === 'ok'){
                    this.setState({
                        model:res.data.model,
                        itemList:res.data.itemList,
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                this.toggleTabPane1Loading(false);
                message.error(`${err.message}`)
            })
    }

    componentDidMount() {
        //判断是修改还是新增
        const directId = getQueryString('directId');
        directId && this.getFindDirectiveData(getQueryString('directId'))
    }

    mounted = true;
    componentWillUnmount(){
        this.mounted = null;
    }

    render(){
        const { tabPane1Loading, model, itemList } = this.state;
        console.log(model);
        const initModelData = [
            {
                label:'项目名称',
                field:model.itemname
            },{
                label:'变更编号',
                field:model.number
            },{
                label:'变更类型',
                field:model.modify_type
            },{
                label:'专业',
                field:model.profession_id
            },{
                label:'变更主题',
                field:model.modify_title,
                colSpan:24,
            },{
                label:'变更详情',
                field:model.modify_reason_details,
                colSpan:24,
            },{
                label:<img src='www.baidu.com' alt="avatar" />,
                colSpan:3,
            },{
                label:'图纸编号',
                field:model.drawing_no,
                colSpan:8,
            }
        ]

        return(
            <CustomizeTabs
                defaultActiveKey='1'
                tabPaneOptions={
                    [
                        {
                            title:'指令单信息',
                            component:<TabPane1 data={initModelData} loading={tabPane1Loading} />
                        }, {
                            title:'指定供应商',
                            component:<TabPane2 setData={this.setData.bind(this)} data={itemList} />
                        }
                    ]
                }
                stepsAction={
                    <div className="steps-action">
                        <Button type="primary" onClick={this.handleSubmit} > 下一步，设置审批流 </Button>
                        <Button style={{ marginLeft: 8 }} href={`/web/direct/create/write?directId=${getQueryString('directId')}`}> 上一步 </Button>
                    </div>
                }
            />
        )
    }
}

export default withRouter(Step2)