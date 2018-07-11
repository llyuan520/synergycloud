// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import { Card,Row,Alert,Button,message } from 'antd';
import TableForm from './TableForm.r'
import PopModal from './PopModal'
import { request,getQueryString } from  'utils'

class TabPane2 extends Component {
    state={
        updateKey:Date.now(),
        visible:false,
        loaded: false,
        directId:getQueryString('directId'),
        modalConfig:{
            type:''
        },

        //弹出框的初始数据
        itemsId:'',
        itemList:[],

        //给列表的初始数据
        initData:{
            supplier_id:'',
            contract_id:'',
            dataList:[],
        },

    }

    componentDidMount() {
        const directId = this.state.directId;
        if(directId){
            let pLoader = Promise.all([this.getFindDirectiveData(directId), this.getFindDirectiveInitData(directId)]);
                pLoader.then(() => {
                    this.setState({
                        loaded: true
                    });
                }).catch( err => {
                    console.log(err);
                    message.error(`${err.message}`)
                });
        }
    }

    setDataList = dataList =>{
        this.props.setData && this.props.setData(dataList);
        this.mounted && this.setState({
            initData:{
                supplier_id:dataList.supplier_id,
                contract_id:dataList.contract_id,
                dataList:dataList.newData,
            }
        })
    }
    toggleModalVisible=visible=>{
        this.setState({
            visible
        })
    }

    showModal=type=>{
        this.toggleModalVisible(true)
        this.setState({
            modalConfig:{
                type,
                id:this.state.selectedRowKeys,
            }
        })
    }
    //给弹出框用的
    getFindDirectiveData=(directId)=>{
        request(`/con/mdydirective/findDirectiveData`,{
            params:{
                directId:directId
            }
        })
            .then(res => {
                if(res.state === 'ok'){
                    const result = res.data;
                    this.mounted && this.setState({
                        itemsId:result.model.items_id,
                        itemList:result.itemList,
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                message.error(`${err.message}`)
            })
    }

    //指定供应商的初始数据
    getFindDirectiveInitData=(directId)=>{
        request(`/con/supplieritem/initData`,{
            params:{
                directId:directId
            }
        })
            .then(res => {
                if(res.state === 'ok'){
                    this.mounted && this.setState({
                        initData:{
                            supplier_id:res.data.supplier_id,
                            contract_id:res.data.contract_id,
                            dataList:res.data.dataList,
                        }
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                message.error(`${err.message}`)
            })
    }
    mounted=true
    componentWillUnmount(){
        this.mounted=null
    }
    render(){
        const { updateKey,visible,loaded,modalConfig,itemsId,itemList,initData } = this.state;
        const { form,display } = this.props;
        const { getFieldDecorator, getFieldError } = form;
        const dataListError = getFieldError('dataList');
        return(
            <React.Fragment>

                    <Card
                        key={updateKey}
                        loading={!loaded}
                        bordered={false}
                        bodyStyle={{
                            paddingTop:0
                        }}
                    >

                        <Row gutter={24} style={{margin:'14px 12px 0'}}>
                            {getFieldDecorator('dataList', {
                                initialValue: initData.dataList,
                                rules:[
                                    {
                                        required:true,
                                        message:'请选择供应商'
                                    }
                                ]
                            })(<TableForm form={form} display={display} />)}
                            {
                                dataListError ? <Alert key='errorMsg' message={dataListError.join(',')} type="error" /> : null
                            }

                        </Row>


                        {
                            !display && <Button
                                style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                                type="dashed"
                                onClick={()=>this.showModal('add')}
                                icon="plus"
                            >
                                指定供应商
                            </Button>
                        }

                    </Card>

                <PopModal
                    visible={visible}
                    modalConfig={modalConfig}
                    toggleModalVisible={this.toggleModalVisible}
                    itemsId={itemsId}
                    data={itemList}
                    setDataList={this.setDataList.bind(this)}
                />
            </React.Fragment>
        )
    }

}

export default TabPane2