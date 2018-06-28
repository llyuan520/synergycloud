// Created by liuliyuan on 2018/6/28
import React,{Component} from 'react';
import PropTypes from 'prop-types'
import { Affix, Row, Col, Form, Icon, Button, Card } from 'antd';
import { getFields, wrapRows } from  '../../utils'
import './index.less'

export default class TableSearchListForm extends Component {

    static propTypes={
        form:PropTypes.object.isRequired,
        //fieldsData:PropTypes.array.isRequired,
        handleSearch:PropTypes.func.isRequired,
    }

    static defaultProps={
        fieldsData:[],
    }

    constructor(props) {
        super(props);
        this.state= {
            loading:false,
            expandForm: false,
            formValues: {},
            fieldsData: props.fieldsData || []
        }
    }

    handleFormReset = () => {
        const { form } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
    };

    toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    };

    handleSearch = e => {
        e && e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            for(let key in values){
                if(Array.isArray(values[key]) && values[key].length===2){
                    values[key] = values[key].map(item=>{
                        return item.format('YYYY-MM-DD')
                    })
                    values[`begin${key}`] =values[key][0]
                    values[`end${key}`] =values[key][1]
                    delete values[key]
                }
            }

            this.props.handleSearch && this.props.handleSearch(values)
        });

    };
    renderSimpleForm() {
        const { fieldsData, form } = this.props;
        const nData = fieldsData.slice(0,2);
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>

                    {
                        getFields(form,3,nData)
                    }

                    <Col md={8} sm={24} className='submitCol'>
                        <span className='submitButtons'>
                          <Button type="primary" htmlType="submit">
                            查询
                          </Button>
                          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                            重置
                          </Button>
                            {
                                fieldsData.length > 2 && <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                                                            展开 <Icon type="down" />
                                                        </a>
                            }

                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    renderAdvancedForm() {
        const { fieldsData, form } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    {
                        wrapRows(getFields(form,3,fieldsData), 3)
                    }
                </Row>
                <div style={{ overflow: 'hidden' }}>
                  <span style={{ float: 'right', marginBottom: 24 }}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                      重置
                    </Button>
                    <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                      收起 <Icon type="up" />
                    </a>
                  </span>
                </div>
            </Form>
        );
    }

    renderForm() {
        if( this.props.fieldsData.length > 2 ){
            return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
        } else {
            return  this.renderSimpleForm() ;
        }
    }

    render(){

        return(
            <Affix offsetTop={0}>
                <Card bordered={false} className="tableSearchListForm">
                    <div className="tableListForm">
                        {
                            this.renderForm()
                        }
                    </div>
                </Card>
            </Affix>
        )
    }
}