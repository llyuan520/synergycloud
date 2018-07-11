// Created by liuliyuan on 2018/7/4
import React,{Component} from 'react';
import {  Form, Row, Col, Card, Button, Collapse, message  } from 'antd';
import { getFields,request,getQueryString } from  'utils'
import './styles.less'

const Panel = Collapse.Panel;
const formItemStyle = {
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:16
    }
}
class Cost extends Component {
    state={
        updateKey:Date.now(),
        loaded: false,
        isVisible:false,
        initData:[],
    }

    componentDidMount() {
        const directId = getQueryString('directId');
        if(directId){
            let pLoader = Promise.all([this.getInitData(directId)]);
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

    mounted=true
    componentWillUnmount(){
        this.mounted=null
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values)
                this.setState({
                    isVisible:!this.state.isVisible
                })
            }
        });
    }

    //初始化数据
    getInitData=(directId)=>{
        request(`/con/directivemeasure/initData`,{
            params:{
                directId:directId
            }
        })
            .then(res => {
                if(res.state === 'ok'){
                    const result = res.data;
                    this.mounted && this.setState({
                        initData:result.supplierItem,
                    })
                } else {
                    return Promise.reject(res.message);
                }
            })
            .catch(err => {
                message.error(`${err.message}`)
            })
    }

    editAndView = (display,form) =>{
        return display ? (
            <React.Fragment>
                <Row gutter={24} style={{ marginTop:10 }}>
                        {
                            getFields(form, [
                                {
                                    label: '成本测算金额',
                                    fieldName: 'costMeasurementAmount',
                                    type: 'input',
                                    span: 12,
                                    formItemStyle,
                                    fieldDecoratorOptions: {
                                        //initialValue:'',
                                        /*rules: [
                                         {
                                         required: true,
                                         message: '请选择合同及供应商'
                                         }
                                         ]*/
                                    },
                                },{
                                    label: '责任扣款金额',
                                    fieldName: 'responsibilityDeductionAmount',
                                    type: 'input',
                                    span: 12,
                                    formItemStyle,
                                    fieldDecoratorOptions: {
                                        //initialValue:'',
                                        /*rules: [
                                         {
                                         required: true,
                                         message: '请选择合同及供应商'
                                         }
                                         ]*/
                                    },
                                }

                            ])
                        }
                </Row>
                <Row gutter={24}>
                    {
                        getFields(form, [
                            {
                                label: '成本测算说明',
                                fieldName: 'costCalculation',
                                type: 'input',
                                span: 24,
                                formItemStyle:{
                                    labelCol:{
                                        span:2
                                    },
                                    wrapperCol:{
                                        span:22
                                    }
                                },
                                fieldDecoratorOptions: {
                                    //initialValue:'',
                                    /*rules: [
                                     {
                                     required: true,
                                     message: '请选择合同及供应商'
                                     }
                                     ]*/
                                },
                            }

                        ])
                    }
                </Row>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <Row gutter={24} style={{ marginTop:10 }}>
                    <Col span={12}>
                        <p>
                            <label>成本测算金额：</label>
                            <span style={{color: 'rgba(255, 0, 0, 0.647058823529412)'}}>228,888.00</span>
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <label>责任扣款金额：</label>
                            <span>10,000.00</span>
                        </p>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <label>成本测算说明：</label>
                        <span>是，xxxxxxxxxxxxxxxxxxxxxxxxxxxx  xxxxxxxxxxxxxxxxxxxxxxxxxxxx  xxxxxxxxxxxxxxxxxxxxxxxxxxxx  xxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }

    getCollapseDetail = () =>{
        return (
            <React.Fragment>
                <Row gutter={24}>
                    <Col span={12}>
                        <p>
                            <label>隐蔽工程及附件：</label>
                            <span>有，xxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <label>返工及附件：</label>
                            <span>变更编号变更编号变更编号变更编号变更编号变更编号变更编号</span>
                        </p>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <label>担责及说明：</label>
                        <span>是，xxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                    </Col>
                    <Col span={12}>
                        <label>预计工作时间：</label>
                        <span>2015-10-02    ～    2015-10-10</span>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }

    render(){

        const { loaded,isVisible,initData } = this.state;

        return(
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} className="ISA-collapse">
                    <Card
                        loading={!loaded}
                        bordered={false}
                        bodyStyle={{
                            paddingTop:0
                        }}
                    >

                        {
                            initData.map((item,i)=>{
                                return (
                                    <Card
                                        key={i}
                                        style={{ border:'none',marginTop:'24px' }}
                                        bodyStyle={{
                                            padding:0
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: 14,
                                                color: 'rgba(0, 0, 0, 0.85)',
                                                marginBottom: 16,
                                                fontWeight: 500,
                                            }}
                                        >
                                            <span style={{ display: 'inline-block',color: '#47ADBF',fontSize:18  }}>{item.supplierName}</span>
                                            <span style={{ float:'right',color: 'rgba(153, 153, 153, 0.847058823529412)' }}>合同名称：{item.contract_name}</span>
                                        </p>
                                        <Card
                                            type="inner"
                                            title={
                                                <React.Fragment>
                                                    <b>{item.item}</b>
                                                    <span style={{ color: 'rgba(0, 0, 0, 0.647058823529412)' }}>，{item.item}</span>
                                                </React.Fragment>
                                            }
                                        >
                                            <Collapse bordered={false}>
                                                <Panel header={ <span style={{ color:'#47ADBF' }}>查看变更项详情</span> } >
                                                    {
                                                        this.getCollapseDetail()
                                                    }
                                                </Panel>
                                            </Collapse>

                                            {
                                                this.editAndView(isVisible,this.props.form)
                                            }

                                            <p
                                                style={{ marginTop: 22 }}
                                            >
                                                {
                                                    isVisible ? <Button type="primary" ghost onClick={this.handleSubmit}>保存</Button> : <Button type="primary" ghost onClick={this.handleSubmit}>修改</Button>
                                                }

                                            </p>
                                        </Card>
                                    </Card>
                                )
                            })
                        }

                    </Card>
                </Form>
            </React.Fragment>
        )
    }
}

export default Form.create()(Cost)