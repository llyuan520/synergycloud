// Created by liuliyuan on 2018/6/28
import React,{Component} from 'react';
import PropTypes from 'prop-types'
import { Affix, Row, Col, Form, Icon, Button, Card } from 'antd';
import moment from 'moment'
import { getFields } from  '../../utils'
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
                if(Array.isArray( values[key] ) && values[key].length === 2 && moment.isMoment(values[key][0])){
                    //当元素为数组&&长度为2&&是moment对象,那么可以断定其是一个rangePicker
                    values[`${key}Start`] = values[key][0].format('YYYY-MM-DD');
                    values[`${key}End`] = values[key][1].format('YYYY-MM-DD');
                    delete values[key]
                }

                /**
                 * 判断如果是时间控件 rangePicker 只是值为空的时候需要把双值设为undefined，因为下一次的filter
                 * 会与上一次的filter合并，这一次的rangePicker值为空的时候就会导致合并后留下上次选择过的值，导致条件出错
                 * */
                if(Array.isArray( values[key] ) && values[key].length === 0){
                    values[`${key}Start`] = undefined;
                    values[`${key}End`] = undefined;
                }

                if(moment.isMoment(values[key])){
                    //格式化一下时间 YYYY-MM类型
                    if(moment(values[key].format('YYYY-MM'),'YYYY-MM',true).isValid()){
                        values[key] = values[key].format('YYYY-MM');
                    }

                    /*if(moment(values[key].format('YYYY-MM-DD'),'YYYY-MM-DD',true).isValid()){
                     values[key] = values[key].format('YYYY-MM-DD');
                     }*/
                }
            }

            this.props.handleSearch && this.props.handleSearch(values)
        });

    };
    renderSimpleForm() {
        const { fieldsData, form, title } = this.props;
        const nData = fieldsData.slice(0,2);
        return (
            <div className='ISA-content ISA-simple'>
                <Form onSubmit={this.handleSearch} layout="inline">
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                        <Col span={4} className='submitTitle'>
                            <h2>{title}</h2>
                        </Col>

                        {
                            getFields(form, nData)
                        }

                        <Col span={4} className='submitCol'>
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
            </div>
        );
    }

    renderAdvancedForm() {
        const { fieldsData, form, title } = this.props;
        return (
            <div className="ISA-content-bg">
                <div className='ISA-content'>
                    <Form onSubmit={this.handleSearch} layout="inline">
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={8} sm={24} className='submitTitle'>
                                <h2>{title}</h2>
                            </Col>
                            {
                                getFields(form, fieldsData)
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
                </div>
            </div>
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
            <Affix offsetTop={64} style={{ zIndex: 1,marginTop:64 }}>
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