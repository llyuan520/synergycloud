// Created by liuliyuan on 2018/7/2
import React,{ Component } from 'react';
import { Modal,Row, Col,Alert, Form,Button,Spin,message } from 'antd';
import { request,getFields } from 'utils'
import TableForm from './TableForm.r'
import './styles.less'

class PopModal extends Component{
    static defaultProps={
        type:'edit',
        visible:true
    }

    state = {
        data: [],
        loading: true,
        selectedRowKeys:[],
        supplierData:[],
        contract_id:'',
    };

    getRowByKey(seq, newData) {
        return newData.filter(item => item.seq === seq)[0];
    }

    setSelectedRowKeys = selectedRowKeys =>{
        this.mounted && this.setState({
            selectedRowKeys
        })
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log(values, this.state.selectedRowKeys)
                let newData = this.state.selectedRowKeys.map(req=>{
                    return this.getRowByKey(req, values.itemList)
                })

                const item = {
                    supplier_id:values.supplier_id,
                    contract_id:this.state.contract_id,
                    newData:newData
                }
                //console.log(item);
                this.props.setDataList && this.props.setDataList(item);
                this.props.toggleModalVisible(false);
            }
        });
    }
    toggleLoading = (loading) => {
        this.setState({
            loading
        });
    }
    getFindCompanyByItemId=(itemsId)=>{
        this.toggleLoading(true);
        request(`/con/supplieritem/findCompanyByItemId`,{
            params:{
                items_id : '58696124807512064',
                //items_id:itemsId
            }
        })
            .then(res => {
                this.toggleLoading(false);
                if(res.state === 'ok'){
                    const result = res.data;
                    const newData = [];
                    result.forEach((r) => {
                        newData.push({
                            ...r,
                            key: `${r.items_id}`,
                            label: r.contractName,
                        });
                    });
                    this.setState({
                        supplierData:newData
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                this.toggleLoading(false);
                message.error(`${err.message}`)
            })
    }

    componentWillReceiveProps(nextProps){

        if(!nextProps.visible){
            /**
             * 关闭的时候清空表单
             * */
            nextProps.form.resetFields();
            this.setState({
                record:{}
            })
        }
        if(this.props.visible !== nextProps.visible && !this.props.visible){
            /**
             * 弹出的时候如果类型不为新增，则异步请求数据
             * */
            console.log(nextProps)
            this.setState({
                data:nextProps.data
            },()=>{
                if(nextProps && nextProps.itemsId !== ''){
                    this.getFindCompanyByItemId(nextProps.itemsId)
                }
            })

        }
    }
    mounted=true
    componentWillUnmount(){
        this.mounted=null
    }
    render(){
        const { data,loading,supplierData } = this.state;
        const props = this.props;
        let title='';
        const type = props.modalConfig.type;
        switch (type){
            case 'add':
                title = '添加';
                break;
            case 'edit':
                title = '编辑';
                break;
            default :
            //no default
        }

        const { form } = this.props;
        const { getFieldDecorator, getFieldError } = form;
        const itemListError = getFieldError('itemList');

        return(
            <Modal
                maskClosable={false}
                destroyOnClose={true}
                onCancel={()=>props.toggleModalVisible(false)}
                width={980}
                visible={props.visible}
                footer={
                     <Row>
                        <Col span={12}></Col>
                        <Col span={12}>
                            <Button onClick={()=>props.toggleModalVisible(false)}>取消</Button>
                            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                        </Col>
                    </Row>
                }
                title={`${title} - 指定供应商，让其负责对应的变更项`}>
                <Spin spinning={loading}>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            {
                                getFields(props.form, [
                                    {
                                        label: '指定的供应商',
                                        fieldName: 'supplier_id',
                                        type: 'select',
                                        span: 12,
                                        options: supplierData,
                                        fieldDecoratorOptions: {
                                            //initialValue: {label: '全部', key: ''},
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择合同及供应商'
                                                }
                                            ]
                                        },
                                        componentProps: {
                                            //labelInValue: true,
                                            onChange:(value)=>{
                                                const data = supplierData.filter(item => item.key === value)[0];
                                                console.log(data);
                                                this.setState({
                                                    contract_id:data.contract_id
                                                })
                                            }

                                        },
                                    }

                                ])
                            }
                        </Row>
                        <Row gutter={24} style={{margin:'14px 12px 0'}}>
                            {getFieldDecorator('itemList', {
                                initialValue: data,
                                rules:[
                                    {
                                        required:true,
                                        message:'请选择供应商'
                                    }
                                ]
                            })(<TableForm form={this.props.form} setSelectedRowKeys={this.setSelectedRowKeys.bind(this)} />)}
                            {
                                itemListError ? <Alert key='errorMsg' message={itemListError.join(',')} type="error" /> : null
                            }

                        </Row>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}

export default Form.create()(PopModal)