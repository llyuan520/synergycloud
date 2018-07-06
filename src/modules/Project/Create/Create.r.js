// created by Lee in 2018/07/05

import React, {Component} from 'react';
import { Form, Row, Button,message   } from 'antd';
import { compose } from 'redux';
import {connect} from 'react-redux';
import { getFields,request } from  'utils'
import TableForm from '../TableForm/TableForm.r'
import './styles.less'



const tableData = [];

class CreateProject extends Component{


    constructor(props,context){
        super();
        this.state = {
            taxOptions: [
                {label:'计税方式1', key:'1'},
                {label:'计税方式2', key:'2'},
                {label:'计税方式3', key:'3'},
            ],
            statusOptions: [
                {label:'状态1',key:'1'},
                {label:'状态2',key:'2'},
                {label:'状态3',key:'3'},
                {label:'状态4',key:'4'},
            ]
        }
    }

    handleSubmit = (e)=>{
        e && e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (err) {
                return;
            }
            console.log(value)
            this.props.history.push('/web/project/org')

        })
    }

    componentWillMount(){
        console.log('-------------------')


        let url = '/biz/items/findEditData'
        request(url, {
            params:{
                company_id: this.props.company_id,
            }
        }).then((data) => {
            console.log('=================================')
                console.log(data);
            console.log('=================================')

            // if(data===200){
                    // this.toggleLoaded(true)
                    // const result = data.data.records || data.data;
                    // this.setState({
                    //     dataSource:this.props.transformData(result)
                    // })
                // }
            })
            .catch(err => {
                console.log(err)
                message.error(err.message)
            })

    }

    render(){
        const { form } = this.props;
        const { getFieldDecorator } = form;
        console.log(this.props.company_id)
        return (
            <div className="ISA-fragment ISA-bgColor create-project">
                <Form>
                    <h2 className="createProjectTitle">新建项目</h2>

                    <div className="createProjectContent">
                        <h4 className="createProjectChildTitle">项目基本信息</h4>
                        <Row className="mt35">
                            {
                                getFields(this.props.form, [
                                    {
                                        label: '名称',
                                        fieldName: 'project_name',
                                        type: 'input',
                                        span: 8
                                    },{
                                        label: '简称',
                                        fieldName: 'abbreviation',
                                        type: 'input',
                                        span: 8
                                    },{
                                        label: '编号',
                                        fieldName: 'item_number',
                                        type: 'input',
                                        span: 8,
                                        componentProps: {
                                            disabled: true
                                        },
                                    }
                                ])
                            }
                        </Row>
                        <Row >
                            {
                                getFields(this.props.form, [
                                    {
                                        label: '计税方式',
                                        fieldName: 'tax_type',
                                        type: 'select',
                                        span: 8,
                                        options: this.state.taxOptions,
                                    },{
                                        label: '状态',
                                        fieldName: 'item_status',
                                        type: 'select',
                                        span: 8,
                                        options: this.state.statusOptions,
                                    },{
                                        label: '经纬度',
                                        fieldName: 'longitudeAndLatitude',
                                        type: 'longitudeAndLatitude',
                                        span: 8,
                                    }
                                ])
                            }
                        </Row>
                        <Row className="mt35">
                            {getFieldDecorator('members', {
                                initialValue: tableData,
                            })(
                                <TableForm form={this.props.form} />
                            )}
                        </Row>
                    </div>
                    <div className="steps-action">
                        <Button type="primary" onClick={this.handleSubmit}> 下一步 </Button>
                    </div>
                </Form>
            </div>

        )
    }
}


const enhance = compose(
    connect(state=>({
        company_id:state.user.getIn(['personal','company_id'])
    })),
    Form.create()
)
export default enhance(CreateProject);

