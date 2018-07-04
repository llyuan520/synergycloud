// Created by liuliyuan on 2018/7/2
import React,{ Component } from 'react';
import { Button,Modal,Form,Row,Col,Collapse  } from 'antd';
import { getFields } from 'utils'
import './styles.less'
const Panel = Collapse.Panel;

class PopModal extends Component{
    static defaultProps={
        type:'edit',
        visible:true
    }
    state={
        initData:{},
    }

    callback=(key,name)=>{
        const {setFieldsValue} = this.props.form;
        setFieldsValue({
            [name]:key.length>0 && true
        })
        console.log(key, name);
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.setData(values)
                this.props.toggleModalVisible(false);
                /*
                const type = this.props.modalConfig.type;
                switch (type){
                    case 'add':
                        this.addDate(this.props.initData, values);
                        break;
                    case 'edit':
                        this.updateDate(this.props.selectedRowKeys[0], values);
                        break;
                    default :
                    //no default
                }

                this.setState({
                    initData:{}
                })
                */

            }
        });
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.visible){
            /**
             * 关闭的时候清空表单
             * */
            nextProps.form.resetFields();
            this.setState({
                defaultData:{}
            })
        }
        if(this.props.visible !== nextProps.visible && !this.props.visible && nextProps.modalConfig.type !== 'add'){
            /**
             * 弹出的时候如果类型不为新增，则异步请求数据
             * */


        }
    }
    mounted=true
    componentWillUnmount(){
        this.mounted=null
    }
    render(){
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
                <Form onSubmit={this.handleSubmit} className="popModal-from">
                    <Row>
                        {
                            getFields(props.form, [
                                {
                                    label: '指定的供应商',
                                    fieldName: 'type',
                                    type: 'select',
                                    span: 12,
                                    options: [{label: '全部', key: ''}],
                                    fieldDecoratorOptions: {
                                        initialValue: {label: '全部', key: ''},
                                        /*rules: [
                                            {
                                                required: true,
                                                message: '请选择合同及供应商'
                                            }
                                        ]*/
                                    },
                                    componentProps: {
                                        labelInValue: true,
                                    },
                                }

                            ])
                        }
                    </Row>

                    <Collapse className='popModal-panel' onChange={(key)=>this.callback(key,'incomeTaxAuth')}>
                        <Panel
                            showArrow={false}
                            header={
                                <React.Fragment>
                                    <Row gutter={24} className='popModal-row-item'>
                                        <Col span={4}>
                                            {
                                                getFields(props.form, [
                                                    {
                                                        label: <span style={{ fontWeight: 'bold' }}>变更项1</span>,
                                                        fieldName: 'incomeTaxAuth',
                                                        type: 'checkbox',
                                                        showLayout:'inline',
                                                        span: 24,
                                                        fieldDecoratorOptions: {
                                                            //initialValue: parseInt(record.incomeTaxAuth,0) === 1,
                                                            valuePropName: 'checked',
                                                        },

                                                    },

                                                ])
                                            }
                                        </Col>
                                        <Col span={20}>
                                            <span style={{ color: 'rgba(0, 0, 0, 0.647058823529412)' }}>，三房一厅的方案修改布线</span>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            }
                        >
                            <Row gutter={14} >
                                <Col span={4}>
                                    {
                                        getFields(props.form, [
                                            {
                                                label: '隐蔽工程',
                                                fieldName: 'hiddenProject',
                                                type: 'checkbox',
                                                showLayout:'inline',
                                                span: 24,
                                                fieldDecoratorOptions: {
                                                    //initialValue: parseInt(record.incomeTaxAuth,0) === 1,
                                                    valuePropName: 'checked',
                                                },
                                            }

                                        ])
                                    }
                                </Col>
                                <Col span={10}>

                                    {
                                        getFields(props.form, [
                                            {
                                                label: '隐蔽工程描述',
                                                fieldName: 'hiddenProject',
                                                type: 'input',
                                                hideLabel:true,
                                                span: 24,
                                            }

                                        ])
                                    }

                                </Col>
                                <Col span={10}>
                                    {
                                        getFields(props.form, [
                                            {
                                                label:'附件',
                                                fieldName:'files1',
                                                type:'fileUpload',
                                                span:24,
                                                formItemStyle:{
                                                    labelCol:{
                                                        span:6
                                                    },
                                                    wrapperCol:{
                                                        span:17
                                                    }
                                                },
                                                componentProps:{
                                                    //buttonText:'点击上传',
                                                    accept:'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                    //explain:'文件格式为.XLS,并且不超过5M',
                                                    //size:2
                                                },
                                                fieldDecoratorOptions:{
                                                    /*rules:[
                                                        {
                                                            required:true,
                                                            message:'请上传文件'
                                                        }
                                                    ]*/
                                                },
                                            }
                                        ])
                                    }
                                </Col>
                            </Row>
                            <Row gutter={14}>
                                <Col span={4}>
                                    {
                                        getFields(props.form, [
                                            {
                                                label: '返工',
                                                fieldName: 'rework',
                                                type: 'checkbox',
                                                showLayout:'inline',
                                                span: 24,
                                                fieldDecoratorOptions: {
                                                    //initialValue: parseInt(record.incomeTaxAuth,0) === 1,
                                                    valuePropName: 'checked',
                                                },
                                            }

                                        ])
                                    }
                                </Col>
                                <Col span={10}>

                                    {
                                        getFields(props.form, [
                                            {
                                                label: '返工描述',
                                                fieldName: 'reworkDescription',
                                                type: 'input',
                                                hideLabel:true,
                                                span: 24,
                                            }

                                        ])
                                    }

                                </Col>
                                <Col span={10}>
                                    {
                                        getFields(props.form, [
                                            {
                                                label:'附件',
                                                fieldName:'files2',
                                                type:'fileUpload',
                                                span:24,
                                                formItemStyle:{
                                                    labelCol:{
                                                        span:6
                                                    },
                                                    wrapperCol:{
                                                        span:17
                                                    }
                                                },
                                                componentProps:{
                                                    //buttonText:'点击上传',
                                                    accept:'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                    //explain:'文件格式为.XLS,并且不超过5M',
                                                    //size:2
                                                },
                                                fieldDecoratorOptions:{
                                                    /*rules:[
                                                        {
                                                            required:true,
                                                            message:'请上传文件'
                                                        }
                                                    ]*/
                                                },
                                            }
                                        ])
                                    }
                                </Col>
                            </Row>
                            <Row gutter={14}>
                                <Col span={4}>
                                    {
                                        getFields(props.form, [
                                            {
                                                label: '担责',
                                                fieldName: 'rework',
                                                type: 'checkbox',
                                                showLayout:'inline',
                                                span: 24,
                                                fieldDecoratorOptions: {
                                                    //initialValue: parseInt(record.incomeTaxAuth,0) === 1,
                                                    valuePropName: 'checked',
                                                },
                                            }

                                        ])
                                    }
                                </Col>
                                <Col span={8}>

                                </Col>
                                <Col span={12}>

                                    {
                                        getFields(props.form, [
                                            {
                                                label: '预计工作时间',
                                                fieldName: 'subordinatePeriod',
                                                type: 'rangePicker',
                                                span: 24,
                                                formItemStyle:{
                                                    labelCol:{
                                                        span:10
                                                    },
                                                    wrapperCol:{
                                                        span:14
                                                    }
                                                },
                                                fieldDecoratorOptions: {
                                                    //initialValue: (initData && [moment(initData.subordinatePeriodStart, 'YYYY-MM-DD'), moment(initData.subordinatePeriodEnd, 'YYYY-MM-DD')]),
                                                    /*rules: [
                                                        {
                                                            required: true,
                                                            message: '请选择预计工作时间'
                                                        }
                                                    ]*/
                                                }
                                            }

                                        ])
                                    }

                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>

                    <Collapse className='popModal-panel'  onChange={(key)=>this.callback(key,'incomeTaxAuth2')}>
                        <Panel
                            showArrow={false}
                            header={
                                <React.Fragment>
                                    <Row gutter={24} className='popModal-row-item'>
                                        <Col span={4}>
                                            {
                                                getFields(props.form, [
                                                    {
                                                        label: <span style={{ fontWeight: 'bold' }}>变更项1</span>,
                                                        fieldName: 'incomeTaxAuth2',
                                                        type: 'checkbox',
                                                        hideLabel:true,
                                                        showLayout:'inline',
                                                        span: 24,
                                                        fieldDecoratorOptions: {
                                                            //initialValue: parseInt(record.incomeTaxAuth,0) === 1,
                                                            valuePropName: 'checked',
                                                        },

                                                    },

                                                ])
                                            }
                                        </Col>
                                        <Col span={20}>
                                            <span style={{ color: 'rgba(0, 0, 0, 0.647058823529412)' }}>，三房一厅的方案修改布线</span>
                                        </Col>
                                    </Row>


                                </React.Fragment>
                            }
                        >
                            <Row gutter={14} >
                                <Col span={4}>
                                    {
                                        getFields(props.form, [
                                            {
                                                label: '隐蔽工程',
                                                fieldName: 'hiddenProject2',
                                                type: 'checkbox',
                                                showLayout:'inline',
                                                span: 24,
                                                fieldDecoratorOptions: {
                                                    //initialValue: parseInt(record.incomeTaxAuth,0) === 1,
                                                    valuePropName: 'checked',
                                                },
                                            }

                                        ])
                                    }
                                </Col>
                                <Col span={10}>

                                    {
                                        getFields(props.form, [
                                            {
                                                label: '隐蔽工程描述',
                                                fieldName: 'hiddenProject2',
                                                type: 'input',
                                                hideLabel:true,
                                                span: 24,
                                            }

                                        ])
                                    }

                                </Col>
                                <Col span={10}>
                                    {
                                        getFields(props.form, [
                                            {
                                                label:'附件',
                                                fieldName:'files3',
                                                type:'fileUpload',
                                                span:24,
                                                formItemStyle:{
                                                    labelCol:{
                                                        span:6
                                                    },
                                                    wrapperCol:{
                                                        span:17
                                                    }
                                                },
                                                componentProps:{
                                                    //buttonText:'点击上传',
                                                    accept:'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                    //explain:'文件格式为.XLS,并且不超过5M',
                                                    //size:2
                                                },
                                                fieldDecoratorOptions:{
                                                    /*rules:[
                                                        {
                                                            required:true,
                                                            message:'请上传文件'
                                                        }
                                                    ]*/
                                                },
                                            }
                                        ])
                                    }
                                </Col>
                            </Row>
                            <Row gutter={14}>
                                <Col span={4}>
                                    {
                                        getFields(props.form, [
                                            {
                                                label: '返工',
                                                fieldName: 'rework2',
                                                type: 'checkbox',
                                                showLayout:'inline',
                                                span: 24,
                                                fieldDecoratorOptions: {
                                                    //initialValue: parseInt(record.incomeTaxAuth,0) === 1,
                                                    valuePropName: 'checked',
                                                },
                                            }

                                        ])
                                    }
                                </Col>
                                <Col span={10}>

                                    {
                                        getFields(props.form, [
                                            {
                                                label: '返工描述',
                                                fieldName: 'reworkDescription2',
                                                type: 'input',
                                                hideLabel:true,
                                                span: 24,
                                            }

                                        ])
                                    }

                                </Col>
                                <Col span={10}>
                                    {
                                        getFields(props.form, [
                                            {
                                                label:'附件',
                                                fieldName:'files4',
                                                type:'fileUpload',
                                                span:24,
                                                formItemStyle:{
                                                    labelCol:{
                                                        span:6
                                                    },
                                                    wrapperCol:{
                                                        span:17
                                                    }
                                                },
                                                componentProps:{
                                                    //buttonText:'点击上传',
                                                    accept:'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                    //explain:'文件格式为.XLS,并且不超过5M',
                                                    //size:2
                                                },
                                                fieldDecoratorOptions:{
                                                    /*rules:[
                                                        {
                                                            required:true,
                                                            message:'请上传文件'
                                                        }
                                                    ]*/
                                                },
                                            }
                                        ])
                                    }
                                </Col>
                            </Row>
                            <Row gutter={14}>
                                <Col span={4}>
                                    {
                                        getFields(props.form, [
                                            {
                                                label: '担责',
                                                fieldName: 'rework2',
                                                type: 'checkbox',
                                                showLayout:'inline',
                                                span: 24,
                                                fieldDecoratorOptions: {
                                                    //initialValue: parseInt(record.incomeTaxAuth,0) === 1,
                                                    valuePropName: 'checked',
                                                },
                                            }

                                        ])
                                    }
                                </Col>
                                <Col span={8}>

                                </Col>
                                <Col span={12}>

                                    {
                                        getFields(props.form, [
                                            {
                                                label: '预计工作时间',
                                                fieldName: 'subordinatePeriod2',
                                                type: 'rangePicker',
                                                span: 24,
                                                formItemStyle:{
                                                    labelCol:{
                                                        span:10
                                                    },
                                                    wrapperCol:{
                                                        span:14
                                                    }
                                                },
                                                fieldDecoratorOptions: {
                                                    //initialValue: (initData && [moment(initData.subordinatePeriodStart, 'YYYY-MM-DD'), moment(initData.subordinatePeriodEnd, 'YYYY-MM-DD')]),
                                                    /*rules: [
                                                        {
                                                            required: true,
                                                            message: '请选择预计工作时间'
                                                        }
                                                    ]*/
                                                }
                                            }

                                        ])
                                    }

                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>

                </Form>
            </Modal>
        )
    }
}

export default Form.create()(PopModal)