// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Row,  Form, message, Button } from 'antd';
import { request,requestDict,setSelectFormat } from  'utils'
import TableForm from './TableForm.r'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}



const tableData = [
    {
        periodization_code: '111211',
        periodization_name: 'wwwwwkkkkk',
        tax_methods: 'aaaaaa',
        key: '1',
    },
    {
        periodization_code: '111211',
        periodization_name: 'wwwwwkkkkk',
        tax_methods: 'aaaaaa',
        key: '2',
    },
    {
        periodization_code: '111211',
        periodization_name: 'wwwwwkkkkk',
        tax_methods: 'aaaaaa',
         key: '3',
    },
];

 class Step1 extends Component {
     state={
         updateKey:Date.now(),
         loading: false,
         changeTypeData:[],
         specialtyData:[],
     }

     handleSubmit = (e) => {
         e && e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err) return;
            console.log(values)
             this.props.history.push('/web/direct/create/assign')
         });
     }

     handleChange = (info) => {
         if (info.file.status === 'uploading') {
             this.setState({ loading: true });
             return;
         }
         if (info.file.status === 'done') {
             // Get this url from response in real world.
             getBase64(info.file.originFileObj, imageUrl => this.setState({
                 imageUrl,
                 loading: false,
             }));
         }
     }

     //去数据字典里面的状态
     getChangeType=()=>{
         requestDict(`['com.moya.contract.enums.MdyDirectiveTypeEnum']`,result=>{
             this.setState({
                 changeTypeData:setSelectFormat(result.MdyDirectiveTypeEnum)
             })
         })
     }
     getSpecialty=()=>{
         request('/con/mdydirective/initData')
             .then((res) => {
                 if(res.state === 'ok'){
                     this.setState({
                         specialtyData:setSelectFormat(res.data)
                     })
                 } else {
                     return Promise.reject(res.message);
                 }
             })
             .catch(err => {
                 message.error(err.message)
             })
     }

     componentDidMount() {
         this.getChangeType();
         this.getSpecialty()
     }

    render(){

        const { form } = this.props;
        const { getFieldDecorator } = form;
        return(
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
                    <div className="advancedForm">

                            <Row gutter={24}>
                                {getFieldDecorator('members', {
                                    initialValue: tableData,
                                })(<TableForm form={this.props.form} />)}
                            </Row>
                    </div>
                    <div className="steps-action">
                        <Button type="primary" onClick={this.handleSubmit}> 下一步 </Button>
                    </div>
                </Form>
            </React.Fragment>
        )
    }

}

export default Form.create()(withRouter(Step1))