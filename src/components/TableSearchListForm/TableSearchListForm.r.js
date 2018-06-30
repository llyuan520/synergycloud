// Created by liuliyuan on 2018/6/28
import React,{Component} from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Form, Icon, Button, Card } from 'antd';
import moment from 'moment'
import { getFields } from  '../../utils'
import './styles.less'

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

    renderAdvancedForm() {
        const { fieldsData, form } = this.props;
        const nData = fieldsData.slice(2,fieldsData.length);
        return getFields(form, nData)
    }


    renderSimpleForm() {
        const { fieldsData, form, title } = this.props;
        const nData = fieldsData.slice(0,2);
        return (
            <Form onSubmit={this.handleSearch} >
                <div className='ISA-content ISA-simple'>
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                        <Col span={6} className='submitTitle'>
                            <h2>{title}</h2>
                        </Col>

                        {
                            getFields(form, nData)
                        }

                        <Col span={6} className='submitCol'>
                            <span className='submitButtons'>
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                                    重置
                                </Button>
                                 <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                                    <Icon type="filter" />高级查询
                                </a>
                            </span>
                        </Col>
                    </Row>
                </div>

                {
                    this.props.fieldsData.length > 2 && (
                    this.state.expandForm && <div className="ISA-content-bg">
                                                <div className='ISA-content'>
                                                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                                        {
                                                            this.renderAdvancedForm()
                                                        }
                                                    </Row>
                                                    <div style={{ overflow: 'hidden' }}>
                                                      <span style={{ float: 'right', marginBottom: 24 }}>
                                                          <Button onClick={this.toggleForm}>
                                                            取消
                                                          </Button>
                                                          <Button  style={{ marginLeft: 8 }} type="primary" htmlType="submit">
                                                              查询
                                                          </Button>
                                                      </span>
                                                    </div>
                                                </div>
                                            </div>
                    )
                }

            </Form>
        );
    }

    render(){
        //<Affix offsetTop={64} style={{ zIndex: 1,marginTop:64 }}></Affix>
        return(

            <Card bordered={false} className="tableSearchListForm">
                <div className="tableListForm">
                    {
                        this.renderSimpleForm()
                    }
                </div>
            </Card>

        )
    }
}