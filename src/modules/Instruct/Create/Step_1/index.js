// Created by liuliyuan on 2018/6/30
import React,{Component} from 'react'
import { Row, Col, Form, Card, Upload, Icon, message } from 'antd';
import { getFields } from  'utils'
import { requestDict,setSelectFormat } from 'utils'
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
         statusData:[]
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
     getStatus=()=>{
         requestDict('com.moya.contract.enums.DirectiveStatusEnum',result=>{
             this.setState({
                 statusData:setSelectFormat(result)
             })
         })
     }

     componentDidMount() {
         this.getStatus()
     }

    render(){

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
                <div className="advancedForm">
                    <Form onSubmit={this.handleSearch} layout="vertical" hideRequiredMark>

                        <Card>
                            <p>指令单基本信息</p>

                            <Row gutter={24}>
                                {
                                    getFields(form, [
                                        {
                                            label:'选择企业',
                                            fieldName:'company',
                                            type:'companyName',
                                            span:8,
                                            formItemStyle:null,
                                            fieldDecoratorOptions:{
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择企业'
                                                    }
                                                ]
                                            },
                                        },{
                                            label:'选择项目',
                                            fieldName:'project',
                                            type:'asyncSelect',
                                            span:8,
                                            formItemStyle:null,
                                            componentProps:{
                                                fieldTextName:'itemName',
                                                fieldValueName:'id',
                                                doNotFetchDidMount:true,
                                                fetchAble:getFieldValue('company') || false,
                                                url:`/project/list/${getFieldValue('company')}`,
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
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择企业'
                                                    }
                                                ]
                                            },
                                        },{
                                            label:'变更类型',
                                            fieldName:'type',
                                            type:'select',
                                            span:8,
                                            options:[{label:'全部', key:''}].concat(this.state.statusData),
                                            fieldDecoratorOptions:{
                                                initialValue:{label:'全部', key:''},
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择变更类型'
                                                    }
                                                ]
                                            },
                                            componentProps: {
                                                labelInValue:true,
                                            },
                                        },{
                                            label:'专业',
                                            fieldName:'profession',
                                            type:'select',
                                            span:8,
                                            options:[{label:'全部', key:''}].concat(this.state.statusData),
                                            fieldDecoratorOptions:{
                                                initialValue:{label:'全部', key:''},
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择变更类型'
                                                    }
                                                ]
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
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择企业'
                                                    }
                                                ]
                                            },
                                        },{
                                            label:'变更详情',
                                            fieldName:'remark',
                                            type:'textArea',
                                            span:24,
                                            fieldDecoratorOptions:{
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'请选择变更类型'
                                                    }
                                                ]
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
                                                fieldName:'code',
                                                type:'input',
                                                span:24,
                                                formItemStyle:null,
                                                fieldDecoratorOptions:{
                                                    rules:[
                                                        {
                                                            required:true,
                                                            message:'请选择图纸编号'
                                                        }
                                                    ]
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
                                })(<TableForm />)}
                            </Row>
                        </Card>

                    </Form>
                </div>
            </React.Fragment>
        )
    }

}

export default Form.create()(Step1)