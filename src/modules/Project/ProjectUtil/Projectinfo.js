// created by Lee in 2018/07/11
import React,{Component} from 'react';
import { Form, Row, message } from 'antd';
import { compose } from 'redux';
import {connect} from 'react-redux';
import { getFields,request } from  'utils'
import TableForm from '../TableForm/TableForm.r'
import {withRouter} from 'react-router-dom';
import TableFormEdit from '../ProjectDetail/TableFormEdit'
class Projectinfo extends Component{

    constructor(){
        super();
        this.state = {
            taxOptions:[],
            statusOptions:[],
            item_number:'',
            defaultTax: '',
            defaultStatus: '',
            tableData: [],
            edit: false,
        }

    }


    componentWillMount(){
        let url = '/biz/items/findEditData'
        request(url, {
            params:{
                company_id: this.props.company_id,
            }
        }).then((data) => {
            // taxOptions
            // statusOptions
            if(data.state === 'ok'){
                let propsData = this.props.data;
                let tax_type = data.data.tax_type;
                let item_status = data.data.item_status;
                let taxOptions = [];
                let statusOptions = [];
                let defaultTax = '';
                let defaultStatus = '';
                //将后台返回的数据转成前端下拉列表的数据格式
                for(let i = 0;i< tax_type.length;i++){
                    taxOptions.push({
                        label: tax_type[i].name,
                        key: tax_type[i].value
                    })
                    //如果是编辑状态的话要将原数据的值设为默认值
                    if(propsData !== undefined && propsData.tax_type === tax_type[i].name){
                        defaultTax = tax_type[i].value;
                    }
                }
                for(let i = 0;i< item_status.length;i++){
                    statusOptions.push({
                        label: item_status[i].name,
                        key: item_status[i].value
                    })
                    if(propsData !== undefined && propsData.status === item_status[i].name){
                        defaultStatus = item_status[i].value;
                    }
                }

                //编辑状态下
                let tableData = [];
                if(propsData !== undefined){
                    tableData = propsData.stages_options;
                    this.setState({
                        item_number: propsData.project_id
                    })
                }else{
                    this.setState({
                        item_number: data.data.item_number,
                    })
                }


                this.setState({
                    taxOptions : taxOptions,
                    statusOptions: statusOptions,
                    defaultTax: defaultTax,
                    defaultStatus:defaultStatus,
                    tableData: tableData
                })


            }
        })
            .catch(err => {
                console.log(err)
                message.error(err.message)
            })

    }


    componentDidMount(){
        if(this.props.edit !== undefined){
            this.setState({
                edit: this.props.edit
            })
        }
    }

    render(){
        const { form,data } = this.props;
        const { getFieldDecorator } = form;
        return(
            <React.Fragment>
                <Row className="mt35">
                    {
                        getFields(this.props.form, [
                            {
                                label: '项目名称',
                                fieldName: 'model.name',
                                fieldDecoratorOptions:{
                                    initialValue: data !== undefined ? data.project_name : ''
                                },
                                type: 'input',
                                span: 8
                            },{
                                label: '项目简称',
                                fieldName: 'model.simple_name',
                                fieldDecoratorOptions:{
                                    initialValue: data !== undefined ? data.project_simplename : ''
                                },
                                type: 'input',
                                span: 8
                            },{
                                label: '企业项目编码',
                                fieldName: 'model.number',
                                type: 'input',
                                fieldDecoratorOptions:{
                                    initialValue: this.state.item_number
                                },
                                span: 8,
                                // componentProps: {
                                //     disabled: true
                                // },
                            }
                        ])
                    }
                </Row>
                <Row >
                    {
                        getFields(this.props.form, [
                            {
                                label: '计税方式',
                                fieldName: 'model.tax_type',
                                type: 'select',
                                span: 8,
                                fieldDecoratorOptions: {
                                    initialValue: this.state.defaultTax || null
                                },
                                options: this.state.taxOptions,
                            },{
                                label: '状态',
                                fieldName: 'model.status',
                                type: 'select',
                                span: 8,
                                fieldDecoratorOptions: {
                                    initialValue: this.state.defaultStatus || null
                                },
                                options: this.state.statusOptions,
                            },{
                                label: '经纬度',
                                fieldName: 'model.longitudeAndLatitude',
                                fieldDecoratorOptions:{
                                    initialValue: data !== undefined ? `${data.longitudeAndLatitude}` : ''
                                },
                                type: 'longitudeAndLatitude',
                                span: 8,
                            }
                        ])
                    }
                </Row>
                <Row className="mt35">
                    {getFieldDecorator('members', {
                        initialValue: this.state.tableData,
                    })(

                        this.state.edit === false ?
                            <TableForm taxOptions = {this.state.taxOptions} form={this.props.form}/>
                            :
                            <TableFormEdit  taxOptions = {this.state.taxOptions} form={this.props.form}/>


                    )}
                </Row>

            </React.Fragment>


        )

    }
}



const enhance = compose(
    connect(state=>({
        company_id:state.user.getIn(['personal','company_id'])
    })),
    Form.create()
)
export default withRouter(enhance(Projectinfo));


