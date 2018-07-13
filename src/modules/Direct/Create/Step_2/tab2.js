// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import {  Row, Col, Card, Button,message,Popconfirm } from 'antd';
import PopModal from './PopModal'
import { request,getQueryString } from  'utils'

export default class TabPane2 extends Component {
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
        initData:[],

        //编辑选中的初始数据
        record:{},
        selectedRowKeys:[],

    }

    componentDidMount() {
        const directId = this.state.directId;
        if(directId){
            //, this.getFindDirectiveInitData(directId)
            let pLoader = Promise.all([this.getFindDirectiveData(directId)]);
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
            initData: dataList
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
                record:type==='edit' ? this.state.record : {},
                selectedRowKeys:type==='edit' ? this.state.selectedRowKeys : [],
            }
        })
    }
    getSelectedRowKeys = selectedRowKeys =>{
        this.mounted && this.setState({
            selectedRowKeys
        })
    }
    toggleEditable = (e, key) => {
        e.preventDefault();
        let record = this.state.initData.filter(item => item.supplier_id.key === key)[0];
        this.setState({
                record
        },()=>{
            this.showModal('edit')
        })
    };

    remove(key) {
        let newData = this.state.initData.filter(item => item.supplier_id.key !== key);
        this.setState({
            initData: newData
        });
        this.props.setData && this.props.setData(newData);
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
    /*getFindDirectiveInitData=(directId)=>{
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
    }*/
    mounted=true
    componentWillUnmount(){
        this.mounted=null
    }
    render(){
        const { updateKey,visible,loaded,modalConfig,itemsId,itemList,initData } = this.state;
        const { display } = this.props;
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
                        <span>

                            {
                                initData.map((item,i)=>{
                                    return (
                                        <MapCard
                                            key={i}
                                            context={this}
                                            supplierId={item.supplier_id}
                                            contractId={item.contract_id}
                                            items={ item.newData }

                                        />
                                    )
                                })
                            }

                        </span>

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
                    toggleModalVisible={this.toggleModalVisible.bind(this)}
                    getSelectedRowKeys={this.getSelectedRowKeys.bind(this)}
                    itemsId={itemsId}
                    data={itemList}
                    initData={initData}
                    setDataList={this.setDataList.bind(this)}
                />
            </React.Fragment>
        )
    }

}


const MapCard =props=>(
        <Card
            style={{ border:'none',marginTop:'24px' }}
            bodyStyle={{
                padding:0
            }}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <p>
                        <a style={{ display: 'inline-block'  }}>{props.supplierId.label}</a>
                    </p>
                </Col>
                <Col span={8}>
                    <p>
                        <span style={{ float:'right',color: 'rgba(153, 153, 153, 0.847058823529412)' }}>合同名称：{props.contractId}</span>
                    </p>
                </Col>
                <Col span={8}>
                    <p style={{ textAlign:'right' }}>
                        <React.Fragment>
                            <a onClick={e => props.context.toggleEditable(e, props.supplierId.key)} style={{ marginRight:10 }}>编辑</a>
                            <Popconfirm title="是否要删除此行？" onConfirm={() => props.context.remove(props.supplierId.key)}>
                                <a  style={{ color: '#F07060' }}>删除</a>
                            </Popconfirm>
                        </React.Fragment>
                    </p>
                </Col>
            </Row>

            {
                props.items.map((item,i)=>(
                    <Card
                        key={i}
                        style={{ marginTop: 16 }}
                        type="inner"
                        title={
                            <React.Fragment>
                                <b style={{ fontWeight: 'bold' }}>变更项{i+1}</b>
                                <span style={{ color: 'rgba(0, 0, 0, 0.647058823529412)' }}>，{item.item}</span>
                            </React.Fragment>
                        }
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <p>
                                    <label>隐蔽工程及附件：</label>
                                    <span>{item.is_hide==='1' ? '有' : '无'}，{item.hide_des}</span>
                                </p>
                            </Col>
                            <Col span={12}>
                                <p>
                                    <label>返工及附件：</label>
                                    <span>{item.is_rework==='1' ? '有' : '无'}，{item.rework_des}</span>
                                </p>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <label>担责及说明：</label>
                                <span>{item.is_accountability==='1' ? '是' : '否'}，{item.accountability_reason}</span>
                            </Col>
                            <Col span={12}>
                                <label>预计工作时间：</label>
                                <span>{item.planDateStart}  ～  {item.planDateEnd}</span>
                            </Col>
                        </Row>
                    </Card>
                ))
            }

        </Card>
)