// Created by liuliyuan on 2018/7/4
import React,{Component} from 'react';
import {  Form, Card,  message  } from 'antd';
import { request,getQueryString } from  'utils'
import ItemsCard from './ItemsCard.r'
import './styles.less'

class Cost extends Component {
    state={
        updateKey:Date.now(),
        loaded: false,
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

    render(){

        const { loaded,initData } = this.state;

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
                            initData.map((item,key)=>{
                                return (
                                    <Card
                                        key={key}
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

                                        {
                                            item.sList.map((ele,index)=>{
                                                return (
                                                    <ItemsCard
                                                        form={this.props.form}
                                                        key={index}
                                                        data={ele}
                                                        dataIndex={`initData[${key}].sList[${index}]`}
                                                    />
                                                )
                                            })
                                        }

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