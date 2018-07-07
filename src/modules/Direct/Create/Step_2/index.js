// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Form,Button,message} from 'antd';
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
        directId:getQueryString('directId')
    }

    setData = data =>{
        this.mounted && this.setState({
            data
        })
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values)
            }
        });
        //this.props.history.push(`/web/direct/create/site?directId=${this.state.directId}`)
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
        const directId = this.state.directId;
        directId && this.getFindDirectiveData(directId)
    }

    mounted = true;
    componentWillUnmount(){
        this.mounted = null;
    }

    render(){
        const { tabPane1Loading, model, itemList, directId } = this.state;
        return(
            <Form>
                <CustomizeTabs
                    defaultActiveKey='1'
                    tabPaneOptions={
                        [
                            {
                                title:'指令单信息',
                                component:<TabPane1 data={model} loading={tabPane1Loading} />
                            }, {
                                title:'指定供应商',
                                component:<TabPane2 form={this.props.form} setData={this.setData.bind(this)} data={itemList} directId={directId} />
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
            </Form>
        )
    }
}

export default Form.create()(withRouter(Step2))