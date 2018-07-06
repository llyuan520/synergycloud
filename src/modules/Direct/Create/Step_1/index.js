// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Row, Col, Form, Card, Upload, Icon, message, Button } from 'antd';
import { getFields,request,requestDict,setSelectFormat } from  'utils'
import TableForm from './TableForm.r'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

const tableData = [
    {
        key: '1',
        name: 'John Brown',
    },
    {
        key: '2',
        name: 'Jim Green',
    },
    {
        key: '3',
        name: 'Joe Black',
    },
];

 class Step1 extends Component {
     state={
         updateKey:Date.now(),
         loading: false,
         tableData:tableData,
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
        const { tableData } = this.state;
        const { form } = this.props;
        const { getFieldDecorator, getFieldValue } = form;

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;

        return(
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
                    <div className="advancedForm">
                        <Card>
                            <p>指令单基本信息</p>

                            <Row gutter={24}>
                                {
                                    getFields(form, [
                                        {
                                            label:'选择企业',
                                            fieldName:'supplier',
                                            type:'companyName',
                                            span:8,
                                            formItemStyle:null,
                                            /*fieldDecoratorOptions:{
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择企业'
                                                    }
                                                ]
                                            },*/
                                        },{
                                            label:'选择项目',
                                            fieldName:'project',
                                            type:'asyncSelect',
                                            span:8,
                                            formItemStyle:null,
                                            componentProps:{
                                                fieldTextName:'name',
                                                fieldValueName:'id',
                                                doNotFetchDidMount:true,
                                                fetchAble:getFieldValue('supplier') || false,
                                                url:`/con/mdydirective/findItemByCompanyId?company_id=${getFieldValue('supplier')}`,

                                            }
                                        },

                                    ],'vertical')
                                }
                            </Row>

                            <Row gutter={24}>
                                {
                                    getFields(form, [
                                        {
                                            label:'变更编号',
                                            fieldName:'number',
                                            type:'input',
                                            span:8,
                                            formItemStyle:null,
                                            fieldDecoratorOptions:{
                                                /*rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择企业'
                                                    }
                                                ]*/
                                            },
                                        },{
                                            label:'变更类型',
                                            fieldName:'type',
                                            type:'select',
                                            span:8,
                                            options:this.state.changeTypeData,
                                            fieldDecoratorOptions:{
                                                //initialValue:{label:'全部', key:''},
                                                /*rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择变更类型'
                                                    }
                                                ]*/
                                            },
                                            componentProps: {
                                                labelInValue:true,
                                            },
                                        },{
                                            label:'专业',
                                            fieldName:'profession',
                                            type:'select',
                                            span:8,
                                            options:this.state.specialtyData,
                                            fieldDecoratorOptions:{
                                                //initialValue:{label:'全部', key:''},
                                                /*rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择变更类型'
                                                    }
                                                ]*/
                                            },
                                            componentProps: {
                                                labelInValue:true,
                                            },
                                        },

                                    ],'vertical')
                                }
                            </Row>

                            <Row gutter={24}>
                                {
                                    getFields(form, [
                                        {
                                            label:'变更主题',
                                            fieldName:'theme',
                                            type:'input',
                                            span:24,
                                            formItemStyle:null,
                                            fieldDecoratorOptions:{
                                                /*rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择企业'
                                                    }
                                                ]*/
                                            },
                                        },{
                                            label:'变更详情',
                                            fieldName:'remark',
                                            type:'textArea',
                                            span:24,
                                            fieldDecoratorOptions:{
                                                /*rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择变更类型'
                                                    }
                                                ]*/
                                            },
                                        },

                                    ],'vertical')
                                }
                            </Row>
                            <Row gutter={24}>
                                <Col span={3}>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                                    </Upload>
                                </Col>
                                <Col span={8}>
                                    {
                                        getFields(form, [
                                            {
                                                label:'图纸编号',
                                                fieldName:'drawingNumbers',
                                                type:'input',
                                                span:24,
                                                formItemStyle:null,
                                                fieldDecoratorOptions:{
                                                    /*rules:[
                                                        {
                                                            required:true,
                                                            message:'请选择图纸编号'
                                                        }
                                                    ]*/
                                                },
                                            },

                                        ],'vertical')
                                    }
                                    <span className="upload-tip">请上传5m内的png或jpg格式的图纸图片</span>
                                </Col>
                            </Row>
                        </Card>

                        <Card>
                            <p>指令单变更项</p>
                            <Row gutter={24}>
                                {getFieldDecorator('members', {
                                    initialValue: tableData,
                                })(<TableForm form={this.props.form} onChange={this.onChange} />)}
                            </Row>
                        </Card>
                    </div>
                    <div className="steps-action">
                        <Button type="primary" onClick={this.handleSubmit}> 下一步，指定供应商 </Button>
                    </div>
                </Form>
            </React.Fragment>
        )
    }

}

export default Form.create()(withRouter(Step1))