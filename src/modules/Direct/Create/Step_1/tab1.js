// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import {  Card, Row, Col,message } from 'antd';
import { request,getQueryString } from  'utils'

export default class TabPane1 extends Component{

    state={
        updateKey:Date.now(),
        loading: false,
        directId:getQueryString('directId'),
        data:{},
    }

    getFindDirectiveData=(directId)=>{
        this.toggleLoading(true);
        request(`/con/mdydirective/findDirectiveData`,{
            params:{
                directId:directId
            }
        })
            .then(res => {
                this.toggleLoading(false);
                if(res.state === 'ok'){
                    this.setState({
                        data:res.data.model,
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
    toggleLoading = (loading) => {
        this.setState({
            loading
        });
    }
    componentDidMount() {
        //判断是修改还是新增
        const directId = this.state.directId;
        directId && this.getFindDirectiveData(directId)
    }

    render () {

        const { updateKey,data,loading } = this.state;
        const { style } = this.props;

        return (
            <Card key={updateKey} loading={loading} style={{ padding: 0, border: 0 , ...style }}>
                <Row gutter={24}>
                    <Col span={8}>
                        <p>项目名称</p>
                        <p className="cGray">{data.itemname}</p>
                    </Col>
                    <Col span={8}>
                        <p>变更编号</p>
                        <p className="cGray">{data.number}</p>
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop:24 }}>
                    <Col span={8}>
                        <p>变更类型</p>
                        <p className="cGray">{data.modify_type}</p>
                    </Col>
                    <Col span={8}>
                        <p>专业</p>
                        <p className="cGray">{data.profession_id}</p>
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop:24 }}>
                    <Col span={24}>
                        <p>变更主题</p>
                        <p className="cGray">{data.modify_title}</p>
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop:24 }}>
                    <Col span={24}>
                        <p>变更原因详情</p>
                        <p className="cGray">{data.modify_reason_details}</p>
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop:24 }}>
                    <Col span={3}>
                        <img src='www.baidu.com' alt="avatar" />
                    </Col>
                    <Col span={8}>
                        <p>图纸编号</p>
                        <p className="cGray">{data.drawing_no}</p>
                    </Col>
                </Row>
            </Card>
        );
    }
}