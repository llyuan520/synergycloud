// created by Lee in 2018/07/11

import React,{Component} from 'react'
import {  Form,Button, Row, Col, Card } from 'antd';
import TabShow from './tab1Show'
import TabEdit from './tab1Edit'

class TabPane1 extends Component{

    constructor(){
        super();
        this.state={
            editstatus: false,
        }
    }

    toggleTheEditStatus = ()=>{
        this.setState({
            editstatus: !this.state.editstatus
        })
    }


    handleSubmit = (e)=>{
        e && e.preventDefault();
        this.props.form.validateFields((err, value) => {
            //console.log(value);
        })
    }

    render(){
        const data = this.props.data;
        const { editstatus } =  this.state;
        return (

            <Card bordered={false}>
                <Row gutter={24} style={{marginBottom:15}}>
                    <Col span={21}>

                    </Col>
                    <Col span={3}>
                        <Button size='small' onClick={ this.toggleTheEditStatus }>
                            {
                                editstatus === false ? '编辑' : '取消'
                            }
                        </Button>
                    </Col>
                </Row>
                {
                    editstatus === false ?
                    <TabShow data = { data }/>
                    :
                    <Form>
                        <TabEdit form = {this.props.form}  data = { data }/>
                        <div className="steps-action">
                            <Button type="primary" onClick={this.handleSubmit}> 完成 </Button>
                        </div>
                    </Form>

                }
            </Card>
        )
    }

}

export default Form.create()(TabPane1)